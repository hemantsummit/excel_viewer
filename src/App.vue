<template>
  <v-app>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Viewer App</v-toolbar-title>
    </v-toolbar>
    <v-container fluid class="d-flex flex-column align-center justify-center">
      <v-row class="mb-4">
        <v-col cols="6" class="text-center">
          <v-btn @click="showExcelViewer" color="primary">Excel Viewer</v-btn>
        </v-col>
        <v-col cols="6" class="text-center">
          <v-btn @click="showDocumentViewer" color="primary">Document Viewer</v-btn>
        </v-col>
      </v-row>
    </v-container>
    
    <!-- Modal Dialog -->
    <v-dialog v-model="dialogVisible" max-width="1400px">
      <v-card>
        <v-card-title>
        </v-card-title>
        <v-card-text>
          <v-card class="elevation-2" style="max-height: 500px; overflow: auto;">
            <ExcelViewer v-if="currentViewer === 'excel'" />
            <DocumentViewer v-else-if="currentViewer === 'document'" />
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="dialogVisible = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import ExcelViewer from './components/ExcelViewer.vue';
import DocumentViewer from './components/DocumentViewer.vue';

Vue.use(Vuetify);

export default {
  name: 'App',
  components: {
    ExcelViewer,
    DocumentViewer,
  },
  data() {
    return {
      currentViewer: null,
      dialogVisible: false,
    };
  },
  methods: {
    showExcelViewer() {
      this.currentViewer = 'excel';
      this.dialogVisible = true;
    },
    showDocumentViewer() {
      this.currentViewer = 'document';
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.align-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
