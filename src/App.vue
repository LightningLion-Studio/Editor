<template>
  <div id="root">
    <NConfigProvider :theme="darkTheme">
      <NMessageProvider>
        <n-dialog-provider>
          <router-view />
        </n-dialog-provider>
      </NMessageProvider>
    </NConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { darkTheme } from "naive-ui"
</script>
