<template>
  <div>
    <input type="file" ref="fileInput" accept=".xls,.xlsx,.csv" @change="loadExcelFile" />
    <div v-if="dataTable">
      <h2>Data Table:</h2>
      <table>
        <thead>
          <tr v-for="(row, rowIndex) in dataTable" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
              {{ cell }}
            </td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>


<script>
import * as XLSX from 'xlsx';

export default {
  name: 'ExcelViewer',
  data() {
    return {
      dataTable: null,
    };
  },
  methods: {
    // Function to load and parse the Excel file
    loadExcelFile(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming you want data from the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const range = XLSX.utils.decode_range(worksheet['!ref']);

        const dataTable = [];

        for (let R = range.s.r; R <= range.e.r; ++R) {
          const rowData = [];
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { c: C, r: R };
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            const cellValue = worksheet[cellRef] ? worksheet[cellRef].v : null;
            rowData.push(cellValue);
          }
          dataTable.push(rowData);
        }

        // Set the data table
        this.dataTable = dataTable;
      };

      reader.readAsArrayBuffer(file);
    },
  },
};
</script>
