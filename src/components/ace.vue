<script setup lang="ts">
import ace from "ace-builds"
import themeMonokaiUrl from 'ace-builds/src-noconflict/theme-monokai?url'
ace.config.setModuleUrl('ace/theme/monokai', themeMonokaiUrl)
import { VAceEditor } from 'vue3-ace-editor'


import { ref, reactive, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { GetFile, SaveFile } from "../api"
import { useMessage } from "naive-ui"
const route = useRoute()
const message = useMessage()

const code = ref('')
const lang = ref('')

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

import javascript from 'ace-builds/src-noconflict/mode-javascript'
import typescript from 'ace-builds/src-noconflict/mode-typescript'
import html from 'ace-builds/src-noconflict/mode-html_elixir'
import json from 'ace-builds/src-noconflict/mode-json'
import css from 'ace-builds/src-noconflict/mode-css'
import less from 'ace-builds/src-noconflict/mode-less'


if (parser() === 'ts') {
  ace.config.setModuleUrl('ace/mode/typescript', typescript)
  lang.value = 'typescript'
} else if (parser() === 'js') {
  ace.config.setModuleUrl('ace/mode/javascript', javascript)
  lang.value = 'javascript'
} else if (parser() === 'vue' || parser() === 'html') {
  ace.config.setModuleUrl('ace/mode/html', html)
  lang.value = 'html'
} else if (parser() === 'json') {
  ace.config.setModuleUrl('ace/mode/json', json)
  lang.value = 'json'
} else if (parser() === 'css') {
  ace.config.setModuleUrl('ace/mode/css', css)
  lang.value = 'css'
} else if (parser() === 'less') {
  ace.config.setModuleUrl('ace/mode/less', less)
  lang.value = 'less'
}

onMounted(async () => {
  const data = await GetFile(route.query.path)
  console.log(data)
  code.value = data.data.data
})

const save = async () => {
  const request = await SaveFile(route.query.path,code.value)
  message.success(request.data.msg)
}
</script>

<template>
  <div class="container">
    <v-ace-editor
      v-model:value="code"
      :lang="lang"
      theme="monokai"
      style="height: 100%;font-size: 14px"
    />
    <div class="operation">
      <n-button @click="save">保存</n-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.operation {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 999;
}
</style>