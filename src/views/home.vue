<template>
  <div class="home">
    <n-h1 class="h1 margin">文件</n-h1>
    <n-text class="margin">
      {{ counter.count }}
    </n-text>
    <n-space class="margin">
      <n-button @click="showModal = true" type="primary">
        新建文件
      </n-button>
    </n-space>
    <n-spin :show="show">
      <n-list class="margin" hoverable clickable>
        <n-list-item v-for="(item,index) in data" :key="index" @click="go(item)">
          <n-thing :title="item[0]" :title-extra="item[3]" :description="item[10]">
            <n-tag v-if="item[12].type === 'folder'">
              文件夹
            </n-tag>
            <n-tag v-else-if="item[12].type === 'file'">
              {{ item[12].ext }} 文件
            </n-tag>
          </n-thing>
        </n-list-item>
      </n-list>
    </n-spin>
  </div>
  
  <!--新建文件-->
  <n-modal v-model:show="showModal" preset="dialog" title="请输入名字">
    <n-space class="padding" vertical justify="center">
      <n-input v-model:value="name" />
      <n-button @click="handleConfirm" block type="primary" :loading="show">确定</n-button>
    </n-space>
  </n-modal>
</template>

<script setup lang="ts">
import { GetList, NewFile } from "../api";
import { ref, onMounted } from "vue"
import { useCounterStore } from '../stores/counter'
import { useRouter } from "vue-router"
import { useDialog } from "naive-ui"
import FolderRound from "@vicons/material/FolderRound"
const counter = useCounterStore()
const router = useRouter()
const dialog = useDialog()
const data = ref([])
const show = ref(true)
const root = document.querySelector("#app")
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

const showModal = ref(false)
const name = ref('')
const handleConfirm = async () => {
  show.value = true
  const newFile = await NewFile(counter.count + '/' + name.value)
  const request = await getter(counter.count)
  data.value = request.data.DIR
  showModal.value = false
  show.value = false
}

onMounted( async () => {
  show.value = true
  let request = await GetList(counter.count)
  data.value = request.data.DIR
  show.value = false
})
</script>

<style lang="less" scoped>
.h1 {
  margin-top: 20px;
}
</style>
