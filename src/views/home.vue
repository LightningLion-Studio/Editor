<template>
  <div class="home">
    <n-h1 class="h1 margin">文件</n-h1>
      <n-list class="margin" hoverable clickable>
        <n-list-item v-for="(item,index) in data" :key="index">
          <n-thing :title="item.name" title-extra="extra" description="description" />
        </n-list-item>
      </n-list>
  </div>
</template>

<script setup lang="ts">
import { GetList } from "../api";
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
const route = useRoute()


const data = ref([])

onMounted(async () => {
  const request = await GetList('/')
  data.value = request.data.data
})
</script>

<style lang="less" scoped>
.h1 {
  margin-top: 20px;
}
</style>
