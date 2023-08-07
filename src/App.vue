<template>
  <div id="app">
    <h1>Vue Excel Viewer</h1>
    <ExcelViewer />
  </div>
</template>

<script>
import ExcelViewer from './components/ExcelViewer.vue';

export default {
  name: 'App',
  components: {
    ExcelViewer,
  },
};
</script>
