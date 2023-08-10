<template>
  <v-card class="elevation-2">
    <v-card-title>Document Viewer</v-card-title>
    <v-card-text>
      <input type="file" @change="handleFileUpload" />
      <div id="hyturing"></div>
    </v-card-text>
  </v-card>
</template>

<script>
// import mammoth from 'mammoth';
import * as docx from "docx-preview";

export default {
  data() {
    return {
      blobObject: null,
      blobObjectUrl: '',
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.fileBuffer = reader.result; // Store the file buffer
          this.convertDocumentToHTML();
        };
        reader.readAsArrayBuffer(file);
      }
    },
    async convertDocumentToHTML() {
      try {
        const result = await docx.renderAsync(this.fileBuffer, document.getElementById("hyturing"));
        console.log(result);
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
