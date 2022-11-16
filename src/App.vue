<template>
  <div id="root">
    <NConfigProvider :theme="darkTheme">
      <NMessageProvider>
        <router-view />
      </NMessageProvider>
    </NConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { darkTheme } from "naive-ui";
</script>
