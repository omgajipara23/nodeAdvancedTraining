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

// ------------------------------------Datatable With Simple Data--------------------------------------------------------------------------------------

var table_file = async (req, res) => {
    res.render('demo.ejs')
}

var alldata = async (req, res) => {

    try {

        const { draw, search, order, start, length } = req.query;

      
        var columns = [
            "user_id",
            "is_default",
            "firstName",
            "lastName",
            "email",
            "phone_number",
            "street_number",
            "address_line_1",
            "city",
            "country_name"
        ];


        const query = {
            where: {},
            include: [{
                model: db.site_user,
                include: [{
                    model: db.address,
                    include: [
                        db.country
                    ]
                }]
            }],
            offset: parseInt(start) || 0,
            limit: parseInt(length) || 10,
            order: []
        };

        if (order && order.length > 0) {
            const { column, dir } = order[0];
            const columnName = req.query.columns[column].data;
            query.order.push([columnName, dir]);
        }

        if (search.value) {
            query.where[Op.or] = columns.map((column) => ({
                [column]: { [Op.like]: `%${search.value}%` },
            }));
        }

        const data = await db.user_address.findAndCountAll(query);
        // console.log(data);

        // console.log(data.rows[0].dataValues.user_id);
        // console.log(data.rows[0].dataValues.is_default);
        // console.log(data.rows[0].dataValues);
        // console.log(data.rows[0].dataValues.site_user.dataValues.firstName);
        // console.log(data.rows[0].dataValues.site_user.dataValues.lastName);
        // console.log(data.rows[0].dataValues.site_user.dataValues.email);
        // console.log(data.rows[0].dataValues.site_user.dataValues.phone_number);
        // console.log(data.rows[0].dataValues.site_user.dataValues.addresses[0].dataValues.street_number);
        // console.log(data.rows[0].dataValues.site_user.dataValues.addresses[0].dataValues.address_line_1);
        // console.log(data.rows[0].dataValues.site_user.dataValues.addresses[0].dataValues.city);
        // console.log(data.rows[0].dataValues.site_user.dataValues.addresses[0].dataValues.country.dataValues.country_name);
        // console.log(data.rows[0].dataValues.site_user.dataValues.street_number);
        // console.log(data.rows[0].dataValues.site_user.dataValues.address_line_1);
        // console.log(data.rows[0].dataValues.site_user.dataValues.city);

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
        console.log(JSON.stringify(data) + "  <=== Dataaaaaaaaaaaaaaaaaaaaaaa");
        // res.end("Data Inserted Successfully!!!")
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

// --------------------------------------Detatable With Association Data-----------------------------------------------------------

var datatableWithAssociationData = async (req, res) => {
    try {
        var { draw, search, order, start, length } = req.query;

        var columns = [
            "user_id",
            "is_default",
            "firstName",
            "lastName",
            "email",
            "phone_number",
            "street_number",
            "address_line_1",
            "city",
            "country_name"
        ];

        console.log(draw, start, order, length);

        const query = {
            where: {},
            offset: parseInt(start) || 0,
            limit: parseInt(length) || 10,
            order: [],
        };

        if (order.length > 0) {
            const { column, dir } = order[0];

            console.log(column, "no of column");
            let columnName = req.query.columns[column].data;
            console.log(columnName, "column name");

            // if (columnName.includes("team")) {
            //   let curr = columnName.split(".");
            //   columnName = curr[1];
            //   console.log(curr[1]);
            // }

            query.order.push([columnName, dir]);
        }

        // let value = [Op.or]:{}columns.map((column) => ({
        //   [column]: { [Op.like]: `%${search.value}%` },
        // }));

        console.log(query, "queryyyyyyyy");

        const data = await player.findAll({
            order: query.order,
            offset: query.offset,
            limit: query.limit,

            where: {
                [Op.or]: {
                    "$team.teamName$": {
                        [Op.like]: `%${search.value}%`,
                    },
                    "$team.id$": {
                        [Op.like]: `%${search.value}%`,
                    },
                    "$team.teamPlace$": {
                        [Op.like]: `%${search.value}%`,
                    },
                    "$team.totalPerson$": {
                        [Op.like]: `%${search.value}%`,
                    },
                    id: {
                        [Op.like]: `%${search.value}%`,
                    },
                    playerName: {
                        [Op.like]: `%${search.value}%`,
                    },
                    playerNo: {
                        [Op.like]: `%${search.value}%`,
                    },
                    playerAge: {
                        [Op.like]: `%${search.value}%`,
                    },
                },
            },
            include: [
                {
                    model: team,
                },
            ],
        });

        const filtered = await data.length;

        console.log(filtered, "filtererrr");
        const dataCount = await player.count({
            where: {
                [Op.or]: {
                    "$team.teamName$": {
                        [Op.like]: `%${search.value}%`,
                    },
                    "$team.id$": {
                        [Op.like]: `%${search.value}%`,
                    },
                    "$team.teamPlace$": {
                        [Op.like]: `%${search.value}%`,
                    },
                    "$team.totalPerson$": {
                        [Op.like]: `%${search.value}%`,
                    },
                    id: {
                        [Op.like]: `%${search.value}%`,
                    },
                    playerName: {
                        [Op.like]: `%${search.value}%`,
                    },
                    playerNo: {
                        [Op.like]: `%${search.value}%`,
                    },
                    playerAge: {
                        [Op.like]: `%${search.value}%`,
                    },
                },
            },
            include: [
                {
                    model: team,
                },
            ],
        });

        // console.log(dataCount, "totallllllllllllllll");

        // console.log(data, "orwoiejr");

        return res.json({
            draw: draw,
            recordsTotal: dataCount,
            recordsFiltered: dataCount,
            data: data,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error,
            message: "Something Went Wrong!!!"
        })

    }
}

var findAllDataWithAssocication = async (req, res) => {
    var data = await db.user_address.findAll({
        where: {
            id: 1
        },
        include: [{
            model: db.site_user,
            include: [{
                model: db.address,
                include: [
                    db.country
                ]
            }]

        }]
    })
    console.log(data);
    return res.json({
        data: data
    })
}


module.exports = { insert_country, insert_address, one_to_one, one_to_many, many_to_many, Polymorphic_one_to_many, hooks, table_file, alldata, faker_data, findAllDataWithAssocication }
