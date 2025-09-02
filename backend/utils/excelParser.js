import XLSX from 'xlsx';
import fs from 'fs';

export class ExcelParser {
  static async parseExcelFile(filePath) {
    try {
      // Read the Excel file
      const workbook = XLSX.readFile(filePath);
      const sheetNames = workbook.SheetNames;
      
      const result = {
        sheets: [],
        totalRows: 0,
        totalColumns: 0,
      };

      // Process each sheet
      for (const sheetName of sheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (jsonData.length > 0) {
          const headers = jsonData[0] || [];
          const data = jsonData.slice(1);
          
          result.sheets.push({
            name: sheetName,
            headers: headers,
            data: data,
            rowCount: data.length,
            columnCount: headers.length,
          });
          
          result.totalRows += data.length;
          result.totalColumns = Math.max(result.totalColumns, headers.length);
        }
      }
      
      return result;
    } catch (error) {
      console.error('Excel parsing error:', error);
      throw new Error('Failed to parse Excel file');
    }
  }

  static getColumnTypes(data) {
    if (!data || data.length === 0) return [];
    
    const columns = data[0]?.length || 0;
    const types = [];
    
    for (let col = 0; col < columns; col++) {
      let numberCount = 0;
      let dateCount = 0;
      let stringCount = 0;
      let totalCount = 0;
      
      for (let row = 0; row < Math.min(data.length, 100); row++) {
        const value = data[row][col];
        if (value !== null && value !== undefined && value !== '') {
          totalCount++;
          
          if (!isNaN(value) && !isNaN(parseFloat(value))) {
            numberCount++;
          } else if (Date.parse(value)) {
            dateCount++;
          } else {
            stringCount++;
          }
        }
      }
      
      // Determine type based on majority
      let type = 'string';
      if (numberCount > totalCount * 0.6) {
        type = 'number';
      } else if (dateCount > totalCount * 0.6) {
        type = 'date';
      }
      
      types.push(type);
    }
    
    return types;
  }
}