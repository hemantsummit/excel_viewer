<template>
  <v-app>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Viewer App</v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-row class="mb-4">
        <v-col cols="6">
          <v-btn @click="showExcelViewer" color="primary">Show Excel Viewer</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn @click="showDocumentViewer" color="primary">Show Document Viewer</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card v-if="currentViewer === 'excel'" class="elevation-2">
            <ExcelViewer />
          </v-card>
          <v-card v-else-if="currentViewer === 'document'" class="elevation-2">
            <DocumentViewer />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
    };
  },
  methods: {
    showExcelViewer() {
      this.currentViewer = 'excel';
    },
    showDocumentViewer() {
      this.currentViewer = 'document';
    },
  },
};
</script>


<style>
@import '~vuetify/dist/vuetify.min.css';
</style>
