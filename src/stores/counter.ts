import { defineStore } from 'pinia'

export const useCounterStore:any = defineStore('counter', {
  state: () => {
    return {
      count: '/',
      history: ['/'],
    }
  },
  actions: {
    push(path:string) {
      const check = path.substring(0, 1)
      console.log(check)
      if (check != '/') {
        path = '/' + path
      }
      if (this.count != '/') {
        this.count = this.count + path
      } else {
        this.count = path
      }
      this.history.push(this.count)
      console.log(this.history)
    },
    back() {
      this.history.splice(this.history.length - 1,1)
      this.count = this.history[this.history.length - 1]
      console.log(this.history)
    }
  },
  persist: {
    enabled: true,
    storage: localStorage,
  },
})
