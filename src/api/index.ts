import request from "../utils/axios"

export async function GetList(path:string):Promise<any> {
  return await request({
    method: "get",
    url: "/list" + path,
    withCredentials: false
  })
}
