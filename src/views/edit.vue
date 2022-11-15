<template>
  <div id="edit">
    <Editor :size="18" />
  </div>
</template>

<script setup lang="ts" allowJs="true">
import Editor from "../components/editor.vue";
</script>

<style lang="less" scoped>
.edit {
  height: 100%;
}
</style>
