<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    placeholder="测试 placeholder"
    height="100vh"
    id="editor"
  />
</template>

<script lang="ts" setup>
import Codemirror from "codemirror-editor-vue3";

// language
import "codemirror/mode/javascript/javascript.js"
import "codemirror/mode/htmlmixed/htmlmixed.js"
import "codemirror/theme/monokai.css"
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { GetFile } from "../api"
const route = useRoute()

const code = ref(``)
let cmOptions = ref({
    mode: "javascript", // 语言模式
    theme: "monokai", // 主题
    lineNumbers: true, // 显示行号
    smartIndent: true, // 智能缩进
    indentUnit: 2, // 智能缩进单位为4个空格长度
    foldGutter: true, // 启用行槽中的代码折叠
    styleActiveLine: true, // 显示选中行的样式
})

onMounted(async () => {
  const data = await GetFile(route.query.path)
  console.log(data)
  code.value = data.data.data
})
</script>

<style lang="less">
#editor {
  font-family: "JetBrains Mono",v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 18px;
  border: none;
}
</style>