import request from '@/utils/fetch'



export default{
  getHospList(page, limit, searchObj) {
      return request({
      url: `/admin/hosp/hospital/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  //根据dictcode查询子节点
  findByDictCode(dictCode) {
      return request({
      url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
      method: 'get'
    })
  },
  findByParentId(id) {
    return request({
        url: `/admin/cmn/dict/findChildData/${id}`,
        method: 'get'
      })
  },
  updateStatus(id, status) {
    return request({
        url: `/admin/hosp/hospital/updateHospStatus/${id}/${status}`,
        method: 'get'
      })
  },
//查看医院详情
getHospById(id) {
    return request ({
      url: `/admin/hosp/hospital/show/${id}`,
      method: 'get'
    })
  }
}
