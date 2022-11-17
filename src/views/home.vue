<template>
  <div class="home">
    <n-h1 class="h1 margin">文件</n-h1>
    <n-text class="margin">
      {{ counter.count }}
    </n-text>
    <n-spin :show="show">
      <n-list class="margin" hoverable clickable>
        <n-list-item v-for="(item,index) in data" :key="index" @click="go(item)">
          <n-thing :title="item[0]" :title-extra="item[3]" :description="item[10]">
            <n-tag v-if="item[12].type === 'folder'">文件夹</n-tag>
            <n-tag v-else-if="item[12].type === 'file'">{{ item[12].ext }} 文件</n-tag>
          </n-thing>
        </n-list-item>
      </n-list>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { GetList } from "../api";
import { ref, onMounted } from "vue"
import { useCounterStore } from '../stores/counter'
import { useRouter } from "vue-router"
import FolderRound from "@vicons/material/FolderRound"
const counter = useCounterStore()
const router = useRouter()
const data = ref([])
const show = ref(true)
// 获取数据
const getter = async (path) => {
  let request = await GetList(path)
  return request
}
// 前往目录
const go = async (path) => {
  if (path[12].type == 'folder') {
    show.value = true
    let before = counter.count
    counter.push(path[0])
    const get = await getter(counter.count)
    if (get.status == false) {
      counter.back()
      show.value = false
      return
    }
    data.value = get.data.DIR
    show.value = false
  } else {
    show.value = true
    router.push({
      path: '/edit',
      query: {
        path: counter.count + '/' + path[0]
      }
    })
    show.value = false
  }
}
const req = async () => {
  show.value = true
  let request = await GetList('/')
  data.value = request.data.DIR
  show.value = false
}
onMounted(req)
</script>

<style lang="less" scoped>
.h1 {
  margin-top: 20px;
}
</style>