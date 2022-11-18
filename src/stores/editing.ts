import { defineStore } from 'pinia'

export const useEditing:any = defineStore('editing',{
  state: () => {
    return {
      fontSize: 18,
    }
  },
  actions: {
    updateFontSize(size:any) {
      this.fontSize = size
    }
  },
  persist: {
    enabled: true,
    storage: localStorage,
  },
})
