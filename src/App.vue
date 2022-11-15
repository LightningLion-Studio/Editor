<template>
  <div id="root">
    <NConfigProvider :theme="darkTheme">
      <router-view />
    </NConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { NConfigProvider, darkTheme } from "naive-ui";
</script>
