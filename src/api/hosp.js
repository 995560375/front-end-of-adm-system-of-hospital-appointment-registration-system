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
  }
}
