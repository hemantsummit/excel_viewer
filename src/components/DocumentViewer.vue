<template>
  <v-card class="elevation-2">
    <v-card-title>Document Viewer</v-card-title>
    <v-card-text>
      <input type="file" @change="handleFileUpload" />
      <div v-if="htmlContent" v-html="htmlContent"></div>
    </v-card-text>
  </v-card>
</template>

<script>
import mammoth from 'mammoth';

export default {
  data() {
    return {
      htmlContent: '',
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.convertDocumentToHTML(file);
      }
    },
    async convertDocumentToHTML(file) {
      try {
        const result = await mammoth.convertToHtml({ arrayBuffer: file });
        this.htmlContent = result.value;
      } catch (error) {
        console.error('Error converting document:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Your component styles here */
</style>
