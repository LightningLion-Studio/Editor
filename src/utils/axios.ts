import axios from "axios"
import md5 from "md5"
const config = {
  host: "/apis",
  token: "899loiW5aLbLIRmWEqQZAw9RDK1c782W"
}


const time = Math.round(new Date().getTime()/1000).toString()
const token = md5(time + md5(config.token))

const request = axios.create({
  baseURL: config.host,
  timeout: 100000,
  params: {
    request_time: time,
    request_token: token,
  },
  method: "post"
})

export default request