import request from '@/utils/fetch'



export default{
  getHospSetList(current, limit, searchObj) {
      return request({
      url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
      method: 'post',
      data: searchObj//使用json
    })
  },
  deleteHospSet(id) {
    return request({
    url: `/admin/hosp/hospitalSet/${id}`,
    method: 'delete'
    })
  },
  batchRemoveHospSet(idList) {
    return request({
    url: `/admin/hosp/hospitalSet/batchRemove`,
    method: 'delete',
    data: idList
    })
  },
  lockHospSet(id, status) {
    return request({
    url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
    method: 'put'
    })
  },
  saveHospitalSet(hospitalSet){
    return request({
      url: `/admin/hosp/hospitalSet/saveHospitalSet`,
      method: 'post',
      data: hospitalSet
      })
  },
  getHospSet(id){
    return request({
      url: `/admin/hosp/hospitalSet/getHospSet/${id}`,
      method: 'get' 
      })
  },
  updateHospitalSet(hospitalSet){
    return request({
      url: `/admin/hosp/hospitalSet/updateHospitalSet`,
      method: 'post',
      data: hospitalSet
      })
  }
}
