import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
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
      const before:any = this.history[this.history.length - 2]
      delete this.history[this.history.length - 1]
      this.count = this.history[before]
      console.log(this.history)
    }
  }
})
