import axios from "axios"

const request: any = axios.create({
  baseURL: "/apis",
  timeout: 100000,
})

export default request
