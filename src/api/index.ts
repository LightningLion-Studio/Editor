import request from "../utils/axios"
import { message } from "../utils/public"

export async function GetList(path:string):Promise<any> {
  const data = await request({
    url: "/files",
    params: {
      action: "GetDir",
      path
    }
  })
  if (data.data.status === false) {
    message.error(data.data.msg)
    return {
      DIR: [],
      status: false
    }
  }
  for (let i =0;i < data.data.DIR.length;i++) {
    data.data.DIR[i] = data.data.DIR[i].split(';')
    data.data.DIR[i].push({
      type: "folder",
    })
  }
  for (let i = 0;i < data.data.FILES.length;i++) {
    data.data.FILES[i] = data.data.FILES[i].split(';')
    // 读取扩展名
    const ext = data.data.FILES[i][0].split('.')
    data.data.FILES[i].push({
      type: "file",
      ext: ext[1]
    })
    data.data.DIR.push(data.data.FILES[i])
  }
  console.log(data)
  return data
}

export async function GetFile(path:any):Promise<any> {
  const data = await request({
    params: {
      action: "GetFileBody",
      path
    },
    method: "post",
    url: "/files"
  })
  return data
}
