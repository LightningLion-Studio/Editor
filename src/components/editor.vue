<template>
  <codemirror
    v-model="code"
    placeholder="输入内容..."
    :style="style"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
  />
</template>

<script setup lang="ts" allowJs="true">
import { ref, defineProps } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const props = defineProps({
  size: Number,
});

const code = ref(`console.log('Hello, world!')`);
const style = ref({
  height: "100%",
  fontSize: props.size + "px",
});
const extensions = [javascript(), oneDark];
</script>
