const { Op } = require("sequelize");
const db = require('../models');
var express = require('express')
var bodyParser = require('body-parser');
const address = require("../models/address");
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

var insert_country = async (req, res) => {
    var all_country_body = req.body
    console.log(all_country_body);
    try {
        const data = await db.country.create(all_country_body)
        return res.status(200).json({
            success: true,
            data: data,
            message: "Data Inserted Successfully!!!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Data Not Inserted!!!"
        })
    }
}

var insert_address = async (req, res) => {
    var all_address_body = req.body
    console.log(all_address_body);
    try {
        const data = await db.address.create(all_address_body)
        return res.status(200).json({
            success: true,
            data: data,
            message: "Data Inserted Successfully!!!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Data Not Inserted!!!"
        })
    }
}

// --------------------------------------------Normal Association--------------------------------------------------------

var one_to_one = async (req, res) => {

    try {
        const data = await db.country.create({
            country_name: "australia",
            address: {
                street_number: "452",
                address_line_1: "nothing",
                address_line_2: "demo",
                city: "ahemdabad",
                region: "indian",
            },
        },
            {
                include: [{ model: db.address }]
            }
        )
        console.log(data);
        return res.status(200).json({
            success: true,
            message: "Data Inserted !!!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Data Not Inserted!!!"
        })
    }
}

var one_to_many = async (req, res) => {
    try {
        const data = await db.state_master.bulkCreate([{
            state_name: "Gujarat",
            city_masters: [{ city_name: "Rajkot" }, { city_name: "Surat" }, { city_name: "Bhavnagar" }]
        }, {
            state_name: "Assam",
            city_masters: [{ city_name: "Guwahati" }, { city_name: "Jorhat" }, { city_name: "Dibrugarh" }]
        }],
            {
                include: [{ model: db.city_master }]
            }
        )
        console.log(data);
        return res.status(200).json({
            success: true,
            message: "Data Inserted !!!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something Went Wrong!!!'
        })
    }
}

var many_to_many = async (req, res) => {
    try {
        var data = await db.perent_category.create({
            parent_cat_name: "Electronics",
            child_categories: [{ child_cat_name: "Mobile" }, { child_cat_name: "Television" }, { child_cat_name: "A.C" }]
        }, {
            include: [{ model: db.child_category }]
        }
        )
        console.log(data);
        return res.status(200).json({
            success: true,
            message: "Data Insert Successfully!!!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong!!!"
        })
    }
}

// --------------------------------------Polymorphic Association-----------------------------------------------------------------

var Polymorphic_one_to_many = async (req, res) => {
    var type = req.body.type
    console.log(type);
    try {
        if (type == "image") {
            var data = await db.image.create({
                url: 'https://picsum.photos/200/8000/other',
                commnets: [{ comment_title: "this is image comment_111" }, { comment_title: "this is image comment_222" }]
            }, {
                include: [{ model: db.commnet }]
            })
        } else if (type == "video") {
            var data = await db.video.create({
                url: 'https://videocsum.photos/200/8000/other',
                commnets: [{ comment_title: "this is video comment_111" }, { comment_title: "this is video comment_222" }]
            }, {
                include: [{ model: db.commnet }]
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Data Not Inserted!!!"
            })
        }
        return res.status(200).json({
            success: true,
            data: data,
            message: "Data Insert Successfully!!!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong!!!"
        })
    }
}

// ----------------------------------------Hooks---------------------------------------------------------------------------------

var hooks = async (req, res) => {
    try {

        var data = await db.passwordMaster.create({
            password: 'this is without hooks password'
        })
        console.log(data.password);
        return res.status(200).json({
            success: true,
            data: data,
            message: "Password inserted successfully!!!"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong!!!"
        })
    }
}

module.exports = { insert_country, insert_address, one_to_one, one_to_many, many_to_many, Polymorphic_one_to_many, hooks }
