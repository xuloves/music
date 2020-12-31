import { HTTP } from '../utils/http.js'

class Register extends HTTP {
  constructor() {
    super()
  }

  /**
   * 注册
   * @param { 成功后的回调函数 } success 
   */
  sendMsg(phone, success) {
    let params = {
      url: 'captcha/sent',
      data: {
        phone,
      },
      success
    }
    this.request(params)
  }

  registerAndfindPwd(phone,password,captcha, success) {
    let params = {
      url: 'register/cellphone',
      data: {
        phone,
        password,
        captcha
      },
      success
    }
    this.request(params)
  }

  checkPhone(phone,success){
    let params = {
      url: 'cellphone/existence/check',
      data: {
        phone,
      },
      success
    }
    this.request(params)

  }


}

export default Register;