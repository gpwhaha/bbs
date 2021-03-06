/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')
const uploadController = require('./../controllers/upload')

const routers = router
  .post('/user/getUserInfo', userInfoController.getLoginUserInfo)
  .post('/user/signIn', userInfoController.signIn)
  .post('/user/signUp.json', userInfoController.signUp)
  .get('/user/images', userInfoController.getImages)
  .post('/user/allimages', userInfoController.getAllImages)
  .post('/user/upload', userInfoController.upload)
  .post('/user/uploadOS', uploadController.uploadOS)


module.exports = routers