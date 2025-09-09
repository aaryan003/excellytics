import { PrismaClient } from "@prisma/client";
import { ChartGenerator } from '../utils/chartGenerator.js';

const prisma = new PrismaClient();

// Get available chart types for a sheet
export async function getAvailableCharts(req, res) {
  try {
    const { fileId, sheetId } = req.params;
    const userId = req.user.userId;
    
    const sheet = await prisma.sheetData.findFirst({
      where: {
        id: sheetId,
        excelFile: {
          id: fileId,
          userId: userId
        }
      },
      select: {
        name: true,
        headers: true,
        columnTypes: true,
        rowCount: true,
        columnCount: true
      }
    });
    
    if (!sheet) {
      return res.status(404).json({ message: 'Sheet not found' });
    }
    
    const availableCharts = ChartGenerator.getAvailableChartTypes(sheet.columnTypes);
    
    // Organize columns by type for easy selection
    const columnsByType = {
      numerical: [],
      categorical: [],
      temporal: []
    };
    
    sheet.headers.forEach((header, index) => {
      const type = sheet.columnTypes[index];
      const columnInfo = { name: header, index, type };
      
      if (type === 'number') {
        columnsByType.numerical.push(columnInfo);
      } else if (type === 'date') {
        columnsByType.temporal.push(columnInfo);
      } else {
        columnsByType.categorical.push(columnInfo);
      }
    });
    
    res.json({
      message: 'Available chart types retrieved successfully',
      sheet: {
        name: sheet.name,
        rowCount: sheet.rowCount,
        columnCount: sheet.columnCount
      },
      availableCharts,
      columns: columnsByType,
      recommendations: this.generateChartRecommendations(columnsByType)
    });
    
  } catch (error) {
    console.error('Error getting available charts:', error);
    res.status(500).json({ message: 'Failed to retrieve chart options' });
  }
}

// Generate chart data
export async function generateChart(req, res) {
  try {
    const { fileId, sheetId } = req.params;
    const { chartType, xAxis, yAxis, groupBy, sizeColumn, title } = req.body;
    const userId = req.user.userId;
    
    // Validation
    if (!chartType || !xAxis || !yAxis) {
      return res.status(400).json({ 
        message: 'Chart type, X-axis, and Y-axis are required' 
      });
    }
    
    const sheet = await prisma.sheetData.findFirst({
      where: {
        id: sheetId,
        excelFile: {
          id: fileId,
          userId: userId
        }
      }
    });
    
    if (!sheet) {
      return res.status(404).json({ message: 'Sheet not found' });
    }
    
    // Transform data for the chart
    const chartConfig = { chartType, xAxis, yAxis, groupBy, sizeColumn };
    const chartData = ChartGenerator.transformDataForChart(
      sheet.jsonData,
      sheet.headers,
      chartConfig
    );
    
    // Calculate statistics for numerical columns
    const stats = {};
    if (sheet.columnTypes[sheet.headers.indexOf(yAxis)] === 'number') {
      stats[yAxis] = ChartGenerator.calculateStatistics(
        sheet.jsonData,
        sheet.headers,
        yAxis
      );
    }
    
    // Save chart configuration (optional - for history)
    const savedChart = await prisma.chart.create({
      data: {
        title: title || `${chartType} chart of ${yAxis} by ${xAxis}`,
        chartType,
        configuration: {
          xAxis,
          yAxis,
          groupBy,
          sizeColumn,
          ...chartConfig
        },
        sheetId: sheetId,
        userId: userId
      }
    });
    
    res.json({
      message: 'Chart generated successfully',
      chart: {
        id: savedChart.id,
        title: savedChart.title,
        type: chartType,
        data: chartData,
        statistics: stats,
        configuration: chartConfig,
        metadata: {
          dataPoints: sheet.jsonData.length,
          generatedAt: new Date().toISOString()
        }
      }
    });
    
  } catch (error) {
    console.error('Error generating chart:', error);
    res.status(500).json({ 
      message: 'Failed to generate chart',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Get user's chart history
export async function getChartHistory(req, res) {
  try {
    const userId = req.user.userId;
    
    const charts = await prisma.chart.findMany({
      where: { userId },
      include: {
        sheet: {
          include: {
            excelFile: {
              select: {
                originalName: true,
                uploadedAt: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50 // Limit to recent 50 charts
    });
    
    const formattedCharts = charts.map(chart => ({
      id: chart.id,
      title: chart.title,
      chartType: chart.chartType,
      createdAt: chart.createdAt,
      fileName: chart.sheet.excelFile.originalName,
      sheetName: chart.sheet.name,
      configuration: chart.configuration
    }));
    
    res.json({
      message: 'Chart history retrieved successfully',
      charts: formattedCharts,
      total: formattedCharts.length
    });
    
  } catch (error) {
    console.error('Error getting chart history:', error);
    res.status(500).json({ message: 'Failed to retrieve chart history' });
  }
}

// Get specific chart by ID
export async function getChart(req, res) {
  try {
    const { chartId } = req.params;
    const userId = req.user.userId;
    
    const chart = await prisma.chart.findFirst({
      where: { 
        id: chartId,
        userId: userId 
      },
      include: {
        sheet: {
          include: {
            excelFile: {
              select: {
                originalName: true,
                uploadedAt: true
              }
            }
          }
        }
      }
    });
    
    if (!chart) {
      return res.status(404).json({ message: 'Chart not found' });
    }
    
    // Regenerate chart data with current sheet data
    const chartData = ChartGenerator.transformDataForChart(
      chart.sheet.jsonData,
      chart.sheet.headers,
      chart.configuration
    );
    
    res.json({
      message: 'Chart retrieved successfully',
      chart: {
        id: chart.id,
        title: chart.title,
        type: chart.chartType,
        data: chartData,
        configuration: chart.configuration,
        createdAt: chart.createdAt,
        fileName: chart.sheet.excelFile.originalName,
        sheetName: chart.sheet.name
      }
    });
    
  } catch (error) {
    console.error('Error getting chart:', error);
    res.status(500).json({ message: 'Failed to retrieve chart' });
  }
}

// Delete chart
export async function deleteChart(req, res) {
  try {
    const { chartId } = req.params;
    const userId = req.user.userId;
    
    const chart = await prisma.chart.findFirst({
      where: { 
        id: chartId,
        userId: userId 
      }
    });
    
    if (!chart) {
      return res.status(404).json({ message: 'Chart not found' });
    }
    
    await prisma.chart.delete({
      where: { id: chartId }
    });
    
    res.json({ message: 'Chart deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting chart:', error);
    res.status(500).json({ message: 'Failed to delete chart' });
  }
}

// Helper function to generate chart recommendations
function generateChartRecommendations(columnsByType) {
  const recommendations = [];
  
  if (columnsByType.numerical.length > 0 && columnsByType.categorical.length > 0) {
    recommendations.push({
      type: 'bar',
      title: 'Bar Chart Recommendation',
      description: `Compare ${columnsByType.numerical[0].name} across different ${columnsByType.categorical[0].name}`,
      config: {
        chartType: 'bar',
        xAxis: columnsByType.categorical[0].name,
        yAxis: columnsByType.numerical[0].name
      }
    });
  }
  
  if (columnsByType.numerical.length > 0 && columnsByType.temporal.length > 0) {
    recommendations.push({
      type: 'line',
      title: 'Time Series Recommendation',
      description: `Show ${columnsByType.numerical[0].name} trends over ${columnsByType.temporal[0].name}`,
      config: {
        chartType: 'line',
        xAxis: columnsByType.temporal[0].name,
        yAxis: columnsByType.numerical[0].name
      }
    });
  }
  
  if (columnsByType.numerical.length >= 2) {
    recommendations.push({
      type: 'scatter',
      title: 'Correlation Analysis',
      description: `Explore relationship between ${columnsByType.numerical[0].name} and ${columnsByType.numerical[1].name}`,
      config: {
        chartType: 'scatter',
        xAxis: columnsByType.numerical[0].name,
        yAxis: columnsByType.numerical[1].name
      }
    });
  }
  
  return recommendations;
}

export default {
  getAvailableCharts,
  generateChart,
  getChartHistory,
  getChart,
  deleteChart
};