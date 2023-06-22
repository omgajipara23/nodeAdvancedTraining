const { Op, json } = require("sequelize");
const db = require('../models');
const faker = require('faker')
var express = require('express')
var bodyParser = require('body-parser');
const address = require("../models/address");
var app = express()
app.use(bodyParser.json())
app.set('view engine', 'ejs');
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

    const t = await db.sequelize.transaction()

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
                include: [{ model: db.address }],
                transaction: t
            },

        )

        await t.commit()
        console.log(data);
        return res.status(200).json({
            success: true,
            message: "Data Inserted !!!"
        })
    } catch (error) {

        await t.rollback();
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

// ------------------------------------Datatable With Association Data--------------------------------------------------------------------------------------

var table_file = async (req, res) => {
    res.render('demo.ejs')
}

var alldata = async (req, res) => {

    try {
        const { draw, search, order, start, length } = req.query;

        const search_conditions = {
            [Op.or]: {
                user_id: {
                    [Op.like]: `%${search.value}%`,
                },
                is_default: {
                    [Op.like]: `%${search.value}%`,
                },
                "$site_user.firstName$": {
                    [Op.like]: `%${search.value}%`,
                },
                "$site_user.lastName$": {
                    [Op.like]: `%${search.value}%`,
                },
                "$site_user.email$": {
                    [Op.like]: `%${search.value}%`,
                },
                "$site_user.phone_number$": {
                    [Op.like]: `%${search.value}%`,
                },
                "$site_user.addresses.address_line_1$": {
                    [Op.like]: `%${search.value}%`,
                },
                "$site_user.addresses.street_number$": {
                    [Op.like]: `%${search.value}%`,
                },
                "$site_user.addresses.city$": {
                    [Op.like]: `%${search.value}%`,
                },
                "$site_user.addresses.country.country_name$": {
                    [Op.like]: `%${search.value}%`,
                },
            },
        }

        const query = {
            where: { ...search_conditions },
            include: [{
                model: db.site_user,
                include: [{
                    model: db.address,
                    subQuery: false,
                    include: [
                        db.country,
                    ]
                }]
            }],
            offset: parseInt(start) || 0,
            limit: parseInt(length) || 10,
            subQuery: false,
            order: []
        };


        if (order && order.length > 0) {
            const { column, dir } = order[0];

            let columnName = req.query.columns[column].data;

            if (column >= 2 && column <= 5) {
                if (columnName.includes(".")) {
                    let curr = columnName.split(".");
                    var tableName = curr[0]
                    console.log(tableName);
                    columnName = curr[1];
                    console.log(curr[1]);
                    query.order.push([tableName, columnName, dir]);
                }
            }
            else if (column >= 6 && column <= 8) {
                let curr = columnName.split(".");
                var tableName = curr[1]
                console.log(tableName);
                columnName = curr[2];
                console.log(curr[1]);
                query.order.push([db.site_user, db.address, columnName, dir]);
            }
            else if (column == 9) {
                let curr = columnName.split(".");
                var tableName = curr[2]
                console.log(tableName);
                columnName = curr[3];
                console.log(curr[1]);
                query.order.push([db.site_user, db.address, db.country, columnName, dir]);
            }
            else {
                query.order.push([columnName, dir]);
            }

        }

        const data = await db.user_address.findAndCountAll(query);

        return res.json({
            draw: parseInt(draw),
            recordsTotal: data.count,
            recordsFiltered: data.count,
            data: data.rows,
        });
    } catch (err) {
        console.log({ err });
        return res.status(500).send(err);
    }
}

// -------------------------------------Faker-------------------------------------------------------------------------------------

var faker_data = async (req, res) => {

    var design = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone_number: faker.phone.phoneNumberFormat(),
        password: faker.internet.password(8),
        createdAt: new Date(),
        updatedAt: new Date(),
        addresses: [{
            street_number: Math.floor((Math.random() * 100) + 1),
            address_line_1: faker.address.streetName(),
            address_line_2: faker.address.streetName(),
            city: faker.address.city(),
            region: faker.address.country(),
            country: {
                country_name: faker.address.country(),
            }
        }]
    }

    try {
        var data = await db.site_user.create(design, {
            include: [{
                model: db.address,
                include: [
                    db.country
                ]
            }]
        })
        console.log(JSON.stringify(data));
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


module.exports = { insert_country, insert_address, one_to_one, one_to_many, many_to_many, Polymorphic_one_to_many, hooks, table_file, alldata, faker_data }
