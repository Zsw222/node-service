var express = require('express');
var router = express.Router();
var jwtauth = require('../auth/jwtAuth')
const Article = require('../models/articles.js')

router.use(jwtauth).get("/list", (req, res, next) => {
    // 查询数据库
    Article
        .find({})
        .then((resData) => {
            if (!resData) {
                res.json(formate(2000, '', 'err'))
                return
            }

            res.json(formate(200, resData, 'ok'))
        })
})
// 增
router.use(jwtauth).post("/list", (req, res, next) => {
    let resp = req.body
    console.log(req.body)
    Article.create(req.body, function (err, response) {
        if (err) throw err;
        res.json(formate(200, '', 'ok'))
    })
})
function formate(code, data, msg) {
    let datas = {
        "data": data,
        "code": code,
        "msg": msg
    }
    return datas
}
module.exports = router;