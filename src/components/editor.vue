<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    placeholder="测试 placeholder"
    :height="200"
    id="editor"
  />
</template>

<script lang="ts">
import Codemirror from "codemirror-editor-vue3";

// language
import "codemirror/mode/javascript/javascript.js"
import "codemirror/mode/htmlmixed/htmlmixed.js"
import "codemirror/theme/monokai.css"

import { ref } from "vue";
export default {
  components: { Codemirror },
  setup() {
    const code = ref(``)
    let cmOptions = {
        mode: "javascript", // 语言模式
        theme: "monokai", // 主题
        lineNumbers: true, // 显示行号
        smartIndent: true, // 智能缩进
        indentUnit: 2, // 智能缩进单位为4个空格长度
        foldGutter: true, // 启用行槽中的代码折叠
        styleActiveLine: true, // 显示选中行的样式
      };
    return {
      code, cmOptions
    }
  },
};
</script>

<style lang="less">
@font-face {
  font-family: 'JetBrains Mono';
  src: url("/fonts/JetBrainsMono-Regular.woff") format('woff'),
       url("/fonts/JetBrainsMono-Regular.woff2") format('woff2'),
       url("/fonts/JetBrainsMono-Regular-2.ttf") format('ttf'),
}
#editor {
  font-family: "JetBrains Mono";
  font-size: 18px;
}
</style>