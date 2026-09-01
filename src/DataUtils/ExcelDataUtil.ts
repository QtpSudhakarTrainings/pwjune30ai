// Function to read data from excel and return json data

import * as XLSX from "xlsx";
import * as fs from "fs";

export function readExcelFile(filePath: string): ExcelDataType {
    const data = fs.readFileSync(filePath); // Read the file synchronously

    const workbook = XLSX.read(data, { type: "buffer" }); // Read the Excel data from the buffer

    // Read Excel file and convert to JSON
    // const workbook = XLSX.readFile("FileData/employees.xlsx");
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    return jsonData as ExcelDataType;
}

//create custom type for excel data to be used in test fixtures
// [
//   {
//     empid: 101,
//     firstname: 'John Doe',
//     lastname: 'Engineering'
//   },
//   {
//     empid: 102,
//     firstname: 'Jane Smith',
//     lastname: 'Marketing'
//   },

// ]

export type ExcelDataType = {
    empid: number;
    firstname: string;
    lastname: string;
}[];