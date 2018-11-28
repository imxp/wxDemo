import { config } from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: 'appkey无效',
  1006: '服务器内部错误',
  1007: '没找到资源',
  2000: '你已经点过赞了',
  2001: '你还没点过赞',
  3000: '该期内容不存在'
}

class HTTP{
  request({url, method='GET', data={}}){
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, method, data)
    })
  }
  _request(url, resolve, reject, method='GET', data={}){
    wx.request({
      url: config.api_base_url+url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
          resolve(res.data)
        }else{
          reject()
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }
  _show_error(error_code){
    if(!error_code){
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tip[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export { HTTP }