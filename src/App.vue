<template>    <NConfigProvider :theme="darkTheme">
      <NMessageProvider>
        <n-dialog-provider>
          <router-view />
        </n-dialog-provider>
      </NMessageProvider>
    </NConfigProvider>
</template>

<script setup lang="ts">
import { darkTheme } from "naive-ui"
</script>
