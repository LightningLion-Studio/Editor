<template>
  <codemirror
    v-model="code"
    placeholder="输入内容..."
    :style="style"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    class="editor"
  />
</template>

<script setup lang="ts" allowJs="true">
import { ref, defineProps, onMounted } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { GetFile } from "../api"
import { useRoute } from "vue-router"

const props = defineProps({
  size: Number,
})
const route = useRoute()

const code = ref(`console.log('Hello, world!')`)

onMounted( async () => {
  const request = await GetFile(route.query.path)
  console.log(request)
  code.value = request.data.data
})

const style = ref({
  minHeight: "400px",
  fontSize: props.size + "px",
});
const extensions = [javascript(), oneDark];
</script>
