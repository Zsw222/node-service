// import app from '../app';
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var jwtauth = require('../auth/jwtAuth')
var createError = require('http-errors');
// var handle=require('./dbhandle.js') var db=require('../models/model.js')
const Category = require('../models/category.js')
// 查
router.use(jwtauth).get("/list", (req, res, next) => {
    // 查询数据库
    Category
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
    // 查询数据库
    if (!req.body.title || req.body.title === '') {
        res.json(formate(2000, '', 'error'))
        return;
    }
    let resp = {
        title: req.body.title,
        remark: req.body.remark
    }
    Category.create(resp, function (err, response) {
        if (err) throw err;
        res.json(formate(200, '', 'ok'))
    })
})
// 改
router.use(jwtauth).put("/list", (req, res, next) => {
    // 查询数据库
    if (!req.body.title || req.body.title === '') {
        res.json(formate(2000, '', 'error'))
        return;
    }
    let resp = {
        title: req.body.title,
        remark: req.body.remark
    }
    Category.update({_id:req.body._id},{$set:resp}, function (err, response) {
        if (err) throw err;
        res.json(formate(200, '', 'ok'))
    })
})
// 删
router.use(jwtauth).delete("/list", (req, res, next) => {
    // 查询数据库
    if (!req.body._id) {
        res.json(formate(2000, '', 'error'))
        return;
    }
    Category.find({_id:req.body._id}).remove({},function(err,response){
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