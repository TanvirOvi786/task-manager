const UsersModel = require("../models/UserModels");
const jwt = require("jsonwebtoken");


//regSection
exports.registration = (req, res) => {
    let reqBody = req.body
    UsersModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(200).json({ status: "data registration failed", data: err })
        }
        else {
            res.status(200).json({ status: "data registration success", data: data })
        }
    })
}

//user login

exports.login = (req, res) => {
    let reqBody = req.body
    UsersModel.aggregate([
        { $match: reqBody },
        { $project: { _id: 0, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1 } }
    ], (err, data) => {
        if (err) {
            res.status(400).json({ status: "log in failed", data: err })
        }
        else {
            if (data.length > 0) {
                let Payload = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data[0]['email'] }
                let token = jwt.sign(Payload, 'SecretKey786');
                res.status(200).json({ status: "log in success", token: token, data: data[0] })
            }
            else {
                res.status(401).json({ status: "user unauthorized" })
            }
        }
    })
}

//Update users Profile

exports.profileUpdate = (req, res) => {
    let email = req.headers['email'];
    let reqBody = req.body;

    UsersModel.updateOne({ email: email }, reqBody, (err, data) => {
        if (err) {
            res.status(200).json({ status: "data update failed", data: err });
        }
        else {
            res.status(200).json({ status: "data update success", data: data });
        }
    });
}

exports.profileDetails = (req, res) => {
    let email = req.headers['email'];
    UsersModel.aggregate([
        { $match: { email: email } },
        { $project: { _id: 1, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1, password: 1 } }
    ], (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })
}

