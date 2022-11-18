<template>
  <div>
    <n-button @click="save">
      保存
    </n-button>
    <Codemirror
      v-model:value="code"
      :options="cmOptions"
      placeholder="测试 placeholder"
      height="100vh"
      id="editor"
    />
  </div>
</template>

<script lang="ts" setup>
import Codemirror from "codemirror-editor-vue3";
// language
import "codemirror/mode/javascript/javascript.js"
import "codemirror/mode/htmlmixed/htmlmixed.js"
import "codemirror/mode/markdown/markdown.js"
import "codemirror/theme/monokai.css"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { GetFile, SaveFile } from "../api"
import { useMessage } from "naive-ui"
const route = useRoute()
const message = useMessage()

const code = ref(``)
let cmOptions:any = ref({
    mode: null, // 语言模式
    theme: "monokai", // 主题
    lineNumbers: true, // 显示行号
    smartIndent: true, // 智能缩进
    indentUnit: 2, // 智能缩进单位为4个空格长度
    foldGutter: true, // 启用行槽中的代码折叠
    styleActiveLine: true, // 显示选中行的样式
})

const parser = () => {
  let path:any = route.query.path
  path = path.split('/')
  path = path[path.length - 1]
  if (path.search('.') != -1) {
    path = path.split('.')
    return path[path.length - 1]
  } else {
    return null
  }
}

const save = async () => {
  const request = await SaveFile(route.query.path,code.value)
  message.success(request.data.msg)
}

onMounted(async () => {
  if (parser() == 'js') {
    cmOptions.value.mode = 'javascript'
  } else if (parser() == 'md') {
    cmOptions.value.mode = 'markdown'
  }
  console.log(parser())
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
