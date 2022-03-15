import request from '@/utils/fetch'



export default{
  dictList(id) {
      return request({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: 'get'
    })
  }
}
