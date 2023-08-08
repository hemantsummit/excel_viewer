<template>
  <v-app>
    <input type="file" ref="fileInput" accept=".xls,.xlsx,.csv" @change="loadExcelFile" />
    <div v-if="dataTable">
      <v-data-table :headers="headers" :items="dataTable" class="excel-table">
        <template v-slot:item="props">
          <tr>
            <td
              v-for="(cell, cellIndex) in props.item"
              :key="cellIndex"
              class="excel-cell"
            >
              {{ cell }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </v-app>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  name: 'ExcelViewer',
  data() {
    return {
      headers: [], 
      dataTable: null,
    };
  },
  methods: {
    loadExcelFile(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        console.log(workbook)
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const range = XLSX.utils.decode_range(worksheet['!ref']);

        let lastRowIndex = -1;
        let lastColumnIndex = -1;

        for (let R = range.s.r; R <= range.e.r; ++R) {
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { c: C, r: R };
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            const cellValue = worksheet[cellRef] ? worksheet[cellRef].v : null;

            if (cellValue !== null) {
              lastRowIndex = Math.max(lastRowIndex, R);
              lastColumnIndex = Math.max(lastColumnIndex, C);
            }
          }
        }

        if (lastRowIndex === -1 || lastColumnIndex === -1) {
          this.dataTable = null;
        } else {
          const dataTable = [];
          for (let R = range.s.r; R <= lastRowIndex; ++R) {
            const rowData = [];
            for (let C = range.s.c; C <= lastColumnIndex; ++C) {
              const cellAddress = { c: C, r: R };
              const cellRef = XLSX.utils.encode_cell(cellAddress);
              const cellValue = worksheet[cellRef] ? worksheet[cellRef].v : null;
              rowData.push(cellValue);
            }
            dataTable.push(rowData);
          }

          // Set the data table
          this.dataTable = dataTable;
        }
      };

      reader.readAsArrayBuffer(file);
    },
  },
};
</script>

<style>
/* Add Vuetify-specific styling to the table */
.v-data-table {
  width: 100%;
}

.v-data-table tr th,
.v-data-table tr td {
  padding: 12px 16px;
  border: none;
  border-right: 1px solid #ddd; /* Add right border for cells */
}

.v-data-table tr th:last-child,
.v-data-table tr td:last-child {
  border-right: none; /* Remove right border for the last cell in each row */
}

.v-data-table tr th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.v-data-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.v-data-table tr:hover {
  background-color: #fafafa;
}

/* Custom CSS to style the table as Excel-like cells */
.excel-table {
  border-collapse: collapse;
}

.excel-cell {
  border: 1px solid #ddd;
  border-right: none; /* Remove right border for each cell */
  padding: 8px 12px;
  min-width: 80px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.excel-cell:last-child {
  border-right: 1px solid #ddd; /* Add right border for the last cell in each row */
}

.excel-cell:hover {
  background-color: #f2f2f2;
}
</style>

