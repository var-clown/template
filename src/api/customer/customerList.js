import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/decent";

// 查询客户列表
export function getListPage(query) {
  return request({
    url: '/system/sys/customer/getListPage',
    method: 'get',
    params: query
  })
}
// 新增客户
export function addCustomer(data) {
  return request({
    url: '/system/sys/customer/add',
    method: 'post',
    data: data
  })
}
// 修改客户
export function updateCustomer(data) {
  return request({
    url: '/system/sys/customer/update',
    method: 'put',
    data: data
  })
}


