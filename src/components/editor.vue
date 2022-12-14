<template>
  <div style="height: 100%">
    <div class="tool">
        <n-button type="primary" @click="save">
          保存
        </n-button>
        <n-slider v-model:value="fontSize" :step="1" />
    </div>
    <Codemirror
      v-model:value="code"
      :options="cmOptions"
      placeholder="测试 placeholder"
      height="100%"
      id="editor"
      :style="{
        '--fontSize': fontSize + 'px'
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import Codemirror from "codemirror-editor-vue3"
// language
import { useEditing } from "../stores/editing"
import "codemirror/mode/javascript/javascript.js"
import "codemirror/mode/htmlmixed/htmlmixed.js"
import "codemirror/mode/markdown/markdown.js"
import "codemirror/mode/vue/vue.js"
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/panda-syntax.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/json-lint'
// 折叠代码
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/comment-fold.js'
import "codemirror/theme/monokai.css"
// inport "codemirror/addon/edit/closetag.js"
import { ref, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { GetFile, SaveFile } from "../api"
import { useMessage } from "naive-ui"
const route = useRoute()
const message = useMessage()
const editing = useEditing()

// 字体大小
const fontSize = ref(editing.fontSize)
const onUpdate = () => {
  editing.updateFontSize(fontSize.value)
}
watch(fontSize,onUpdate)

const code = ref(``)
let cmOptions:any = ref({
    mode: null, // 语言模式
    theme: "monokai", // 主题
    lineNumbers: true, // 显示行号
    smartIndent: true, // 智能缩进
    tabSize: 2, // 智能缩进单位为4个空格长度
    foldGutter: true, // 启用行槽中的代码折叠
    styleActiveLine: true, // 显示选中行的样式,
    lineWrapping: true, // 自动换行
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
    cmOptions.value.lint = true
  } else if (parser() == 'md') {
    cmOptions.value.mode = 'markdown'
  } else if (parser() == 'json') {
    cmOptions.value.mode = 'application/json'
    cmOptions.value.lint = true
  } else if (parser() == 'ts') {
    cmOptions.value.mode = 'javascript'
  } else if (parser() == 'vue') {
    cmOptions.value.mode = 'vue'
  } else if (parser() == 'html') {
    cmOptions.value.mode = 'text/html'
    import("codemirror/addon/edit/closetag.js")
  }
  console.log(parser())
  const data = await GetFile(route.query.path)
  console.log(data)
  code.value = data.data.data
})
</script>

<style lang="less">
#editor .CodeMirror * {
  font-family: "JetBrains Mono",v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: var(--fontSize);
}
.tool {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #242424;
  z-index: 999;
  padding: 5px;
  display: flex;
  align-items: center;
}
</style>
