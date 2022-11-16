<template>
  <div id="edit">
    <Editor :size="14" />
  </div>
</template>

<script setup lang="ts" allowJs="true">
import Editor from "../components/examples/index.vue"
</script>

<style lang="less" scoped>
#edit {
  height: 100%;
}
</style>
