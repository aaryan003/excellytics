// ===== 1. CREATE utils/chartGenerator.js =====
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ChartGenerator {
  
  // Get available chart types based on column types
  static getAvailableChartTypes(columnTypes) {
    const hasNumbers = columnTypes.includes('number');
    const hasDates = columnTypes.includes('date');
    const hasStrings = columnTypes.includes('string');
    
    const availableCharts = [];
    
    if (hasNumbers && hasStrings) {
      availableCharts.push(
        { type: 'bar', name: 'Bar Chart', description: 'Compare values across categories' },
        { type: 'pie', name: 'Pie Chart', description: 'Show proportions of a whole' },
        { type: 'doughnut', name: 'Doughnut Chart', description: 'Modern pie chart with center hole' }
      );
    }
    
    if (hasNumbers && hasDates) {
      availableCharts.push(
        { type: 'line', name: 'Line Chart', description: 'Show trends over time' },
        { type: 'area', name: 'Area Chart', description: 'Show volume over time' }
      );
    }
    
    if (hasNumbers && hasStrings && columnTypes.length >= 3) {
      availableCharts.push(
        { type: 'scatter', name: 'Scatter Plot', description: 'Show correlation between variables' },
        { type: 'bubble', name: 'Bubble Chart', description: '3D scatter with size dimension' }
      );
    }
    
    if (hasNumbers) {
      availableCharts.push(
        { type: 'histogram', name: 'Histogram', description: 'Show distribution of values' },
        { type: 'box', name: 'Box Plot', description: 'Show statistical distribution' }
      );
    }
    
    return availableCharts;
  }
  
  // Transform data for specific chart types
  static transformDataForChart(data, headers, chartConfig) {
    const { chartType, xAxis, yAxis, groupBy } = chartConfig;
    
    switch (chartType) {
      case 'bar':
      case 'pie':
      case 'doughnut':
        return this.transformForCategorical(data, headers, xAxis, yAxis, groupBy);
      
      case 'line':
      case 'area':
        return this.transformForTimeSeries(data, headers, xAxis, yAxis, groupBy);
      
      case 'scatter':
      case 'bubble':
        return this.transformForScatter(data, headers, chartConfig);
      
      case 'histogram':
        return this.transformForHistogram(data, headers, yAxis);
      
      default:
        throw new Error(`Unsupported chart type: ${chartType}`);
    }
  }
  
  // Transform for categorical charts (bar, pie, doughnut)
  static transformForCategorical(data, headers, xAxisColumn, yAxisColumn, groupBy = null) {
    const xIndex = headers.indexOf(xAxisColumn);
    const yIndex = headers.indexOf(yAxisColumn);
    
    if (xIndex === -1 || yIndex === -1) {
      throw new Error('Invalid column selection');
    }
    
    // Group data by category
    const grouped = {};
    
    data.forEach(row => {
      const category = row[xIndex];
      const value = parseFloat(row[yIndex]) || 0;
      
      if (grouped[category]) {
        grouped[category] += value;
      } else {
        grouped[category] = value;
      }
    });
    
    // Convert to chart format
    const labels = Object.keys(grouped);
    const values = Object.values(grouped);
    
    return {
      labels,
      datasets: [{
        label: yAxisColumn,
        data: values,
        backgroundColor: this.generateColors(labels.length),
        borderColor: this.generateColors(labels.length, 0.8),
        borderWidth: 2
      }]
    };
  }
  
  // Transform for time series charts (line, area)
  static transformForTimeSeries(data, headers, xAxisColumn, yAxisColumn, groupBy = null) {
    const xIndex = headers.indexOf(xAxisColumn);
    const yIndex = headers.indexOf(yAxisColumn);
    
    // Sort data by date
    const sortedData = data
      .map(row => ({
        date: new Date(row[xIndex]),
        value: parseFloat(row[yIndex]) || 0,
        originalRow: row
      }))
      .filter(item => !isNaN(item.date.getTime()) && !isNaN(item.value))
      .sort((a, b) => a.date - b.date);
    
    const labels = sortedData.map(item => item.date.toISOString().split('T')[0]);
    const values = sortedData.map(item => item.value);
    
    return {
      labels,
      datasets: [{
        label: yAxisColumn,
        data: values,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: false
      }]
    };
  }
  
  // Transform for scatter plots
  static transformForScatter(data, headers, config) {
    const { xAxis, yAxis, sizeColumn } = config;
    const xIndex = headers.indexOf(xAxis);
    const yIndex = headers.indexOf(yAxis);
    const sizeIndex = sizeColumn ? headers.indexOf(sizeColumn) : -1;
    
    const points = data
      .map(row => {
        const point = {
          x: parseFloat(row[xIndex]) || 0,
          y: parseFloat(row[yIndex]) || 0
        };
        
        if (sizeIndex !== -1) {
          point.r = Math.max(3, Math.min(20, parseFloat(row[sizeIndex]) / 10));
        }
        
        return point;
      })
      .filter(point => !isNaN(point.x) && !isNaN(point.y));
    
    return {
      datasets: [{
        label: `${xAxis} vs ${yAxis}`,
        data: points,
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: '#3B82F6',
        borderWidth: 1
      }]
    };
  }
  
  // Transform for histogram
  static transformForHistogram(data, headers, column) {
    const columnIndex = headers.indexOf(column);
    const values = data
      .map(row => parseFloat(row[columnIndex]))
      .filter(val => !isNaN(val))
      .sort((a, b) => a - b);
    
    // Create bins
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binCount = Math.min(20, Math.ceil(Math.sqrt(values.length)));
    const binSize = (max - min) / binCount;
    
    const bins = Array(binCount).fill(0);
    const labels = [];
    
    for (let i = 0; i < binCount; i++) {
      const binStart = min + i * binSize;
      const binEnd = min + (i + 1) * binSize;
      labels.push(`${binStart.toFixed(1)}-${binEnd.toFixed(1)}`);
    }
    
    values.forEach(value => {
      const binIndex = Math.min(binCount - 1, Math.floor((value - min) / binSize));
      bins[binIndex]++;
    });
    
    return {
      labels,
      datasets: [{
        label: 'Frequency',
        data: bins,
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: '#22C55E',
        borderWidth: 1
      }]
    };
  }
  
  // Generate color palette
  static generateColors(count, alpha = 0.6) {
    const colors = [
      `rgba(59, 130, 246, ${alpha})`,   // Blue
      `rgba(34, 197, 94, ${alpha})`,    // Green
      `rgba(239, 68, 68, ${alpha})`,    // Red
      `rgba(245, 158, 11, ${alpha})`,   // Orange
      `rgba(168, 85, 247, ${alpha})`,   // Purple
      `rgba(236, 72, 153, ${alpha})`,   // Pink
      `rgba(14, 165, 233, ${alpha})`,   // Sky
      `rgba(132, 204, 22, ${alpha})`,   // Lime
    ];
    
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(colors[i % colors.length]);
    }
    return result;
  }
  
  // Calculate basic statistics
  static calculateStatistics(data, headers, column) {
    const columnIndex = headers.indexOf(column);
    const values = data
      .map(row => parseFloat(row[columnIndex]))
      .filter(val => !isNaN(val));
    
    if (values.length === 0) {
      return null;
    }
    
    const sorted = values.sort((a, b) => a - b);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / values.length;
    const median = sorted.length % 2 === 0 
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
    
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    const standardDeviation = Math.sqrt(variance);
    
    return {
      count: values.length,
      sum,
      mean: parseFloat(mean.toFixed(2)),
      median: parseFloat(median.toFixed(2)),
      min: Math.min(...values),
      max: Math.max(...values),
      standardDeviation: parseFloat(standardDeviation.toFixed(2)),
      q1: sorted[Math.floor(values.length * 0.25)],
      q3: sorted[Math.floor(values.length * 0.75)]
    };
  }
}