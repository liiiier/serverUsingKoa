import util from 'util'
import fs from 'fs'
import os from 'os'
import path from 'path'
import Busboy from 'busboy'
import { resolve } from 'upath';
import { reject } from 'bcrypt/promises';
const inspect = util.inspect

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}
/**
 * 
 * 
 * @param {String} newPath
 * @param {String} oldPathName
 * @return {String} path 这里返回上传的图片保存在服务器的地址，因为后台需要获取的
 */
function renameUploadImg(oldPath, newPath) {
    if (fs.existsSync(newPath)) {
        // 如果之前已经保存了相同文件名的图片，那么久需要把它删除，然后再保存
        fs.unlink(newPath, (err, res) => {
            console.log('delete old file...')
        })
    }
    return fs.renameSync(oldPath, newPath)
}
/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName(fileName) {
    let nameList = fileName.split('.')
    return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}         
 */
function uploadImg(ctx, options) {
    let req = ctx.req
    let res = ctx.res
    let busboy = new Busboy({ headers: req.headers })

    // 获取类型
    // 因为前端上传的图片会是不同的目的，根据不同的目的，分在不同的文件夹
    let fileType = options.fileType || 'common'
    let filePath = path.join(options.path, fileType)
    let mkdirResult = mkdirsSync(filePath)
    let tempName // 这个零时变量用来挂载上传的时候，零时保存的文件名

    // console.log('文件上传中...')
    let result = {
        code: 1,
        success: false,
        content: ''
    }
    // 解析请求文件事件
    return new Promise((resolve, reject) => {

        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            //let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            tempName = filename
            let _uploadFilePath = path.join(filePath, filename)
            let saveTo = path.join(_uploadFilePath)

            // 文件保存到制定路径
            file.pipe(fs.createWriteStream(saveTo))

            // 文件写入事件结束
            file.on('end', function () {
                result.success = true
                result.message = '文件上传成功'
                //console.log('文件上传成功！')
            })
        })
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            //console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
            //name = inspect(val)
            //console.log(val)
            //result.formData[fieldname] = inspect(val);
            let oldPath = path.join(path.join(filePath, tempName))
            let newFileName = val + '.' + getSuffixName(tempName)
            let newPath = path.join(path.join(filePath, newFileName))
            if(!renameUploadImg(oldPath, newPath)) {
                result.path = newPath
                result.content = 'ok'
                console.log(result)
            }
        });

        // 解析表单中其他字段信息


        // 解析结束事件
        busboy.on('finish', function () {
            console.log('文件上结束')
            resolve(result)
        })

        // 解析错误事件
        busboy.on('error', function (err) {
            console.log('文件上出错')
        })

        req.pipe(busboy)
    })

}
export default uploadImg