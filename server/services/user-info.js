/**
 * 用户业务操作
 */

const validator = require('validator')
const userModel = require('./../models/user-info')
const userCode = require('./../codes/user')

const user = {

  /**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  async create( user ) {
    let result = await userModel.create(user)
    return result
  },

  /**
   * 查找存在用户信息
   * @param  {object} formData 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getExistOne( formData ) {
    let resultData = await userModel.getExistOne({
      'email': formData.email,
      'name': formData.userName
    })
    return resultData
  },

  /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  async signIn( formData ) {
    let resultData = await userModel.getExistOne({
      'password': formData.password,
      'name': formData.username})
    return resultData
  },


  /**
   * 根据用户名查找用户业务操作
   * @param  {string} userName 用户名
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName( userName ) {
    
    let resultData = await userModel.getUserInfoByUserName( userName ) || {}
    let userInfo = {

      name: resultData.name,
      createTime: resultData.c_time,
      // roles:['admin']
    }
    return userInfo
  },

  /**
   * 根据token获取用户信息
   * @param {string} token 用户token
   * @returns 
   */
  async getUserInfoByToken(token){
    let resultData = await userModel.getUserInfoByToken(token);
    let userInfo = {
      name: resultData.name,
      createTime: resultData.c_time,
      // roles:['admin']
    }
    return userInfo
  },

  /**
   * 
   * @param {string} token 用户头生成的token
   * @returns 
   */
  async updateUserToken(token,name){
    let result = await userModel.updateUserToken({
      'token':token,
      'name':name
    });
    return result;
  },


  /**
   * 检验用户注册数据
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
  validatorSignUp( userInfo ) {
    let result = {
      success: false,
      message: '',
    }

    if ( /[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false ) {
      result.message = userCode.ERROR_USER_NAME
      return result
    }
    if ( !validator.isEmail( userInfo.email ) ) {
      result.message = userCode.ERROR_EMAIL
      return result
    }
    if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
      result.message = userCode.ERROR_PASSWORD
      return result
    }
    if ( userInfo.password !== userInfo.confirmPassword ) {
      result.message = userCode.ERROR_PASSWORD_CONFORM
      return result
    }

    result.success = true

    return result
  },

  /**
   * 
   * @param {number} userId 根据id查询照片
   * @returns 
   */
  async handleGetUserImages(userId){
    let result = await userModel.getUserImages(userId)
    return result
  },

  /**
   * 分页查询图片
   * @param {number} start 
   * @param {number} end 
   * @returns 
   */
  async handleGetAllImages(start,end){
    let result = await userModel.getAllImages(start,end)
    return result
  }

}

module.exports = user
