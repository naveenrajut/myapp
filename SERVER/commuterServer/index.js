const express = require("express");
const cors = require("cors");
const bycrypt = require("bcrypt");
//const crypto = require("crypto-js");
const { v4: uuidv4 } = require('uuid');
const pool = require("./database");

const QueryConstant = require("./queryConstants");
var storageKey64

const app = express();
app.use(cors());
app.use(express.json());
//app.use(express.logger());
app.post("/passenger/ticket/book",async (req,res) => {
    var logReport;
    try {
        const {bookedTime,
              boardingPoint,
              destinationPoint,
              busType,
              price,
              email} = req.body;
        const status = "booked...";
        const passengerId = await pool.query(QueryConstant.getUserKey,[email]);
        const ticket_id = uuidv4();
        const newData = await pool.query(QueryConstant.postTicket,
        [ticket_id,bookedTime,boardingPoint,destinationPoint,busType,price,passengerId.rows[0].passenger_id,status]);
        logReport = {
            ticketStatus:newData.rows[0].status,
            ticketId:newData.rows[0].ticket_id
        };
        res.json(logReport);
    } catch (err) {
        console.log(err.message);
    }
});
app.post ("/passenger/signin",async (req,res) => {
    var logReport;
    try {
        const {password,email} = req.body;
        console.log(password,email);
        const isUserExist = await pool.query(QueryConstant.authUser,[email]);
        if(isUserExist.rows[0] !== undefined)
        {
            const API_key = uuidv4();
            const hashedPassword = await pool.query(QueryConstant.validPassword,[email]);
            if(await bycrypt.compare(password,hashedPassword.rows[0].hashed_psswd))
            {
                await pool.query(QueryConstant.apikeyput,[API_key,hashedPassword.rows[0].passenger_id]);
                //console.log("passednger IIIIIIIIIIIIDDDDDDDDDDD = ",hashedPassword.rows[0].passenger_id);
                const api_key =  await pool.query(QueryConstant.apikeyget,[hashedPassword.rows[0].passenger_id]);
                //console.log("AAAAAAAAAPPPPPPPPPPPPPPIIIIIIIIIII = ",api_key);
                logReport = {
                    name:hashedPassword.rows[0].passenger_name,
                    email:hashedPassword.rows[0].email,
                    mobile:hashedPassword.rows[0].mobile,
                    gender:hashedPassword.rows[0].gender,
                    api_key: api_key.rows[0].authapikey,
                    status:"SUCCESS"
                };
            }else
            {
                logReport = {
                    name:"ERROR",
                    email:"ERROR",
                    mobile:"ERROR",
                    gender:"ERROR",
                    API_key:"ERROR",
                    status:"PASSWORD INVALID"
                };
            }
        }
        else
        {
            logReport = {
                name:"ERROR",
                email:"ERROR",
                mobile:"ERROR",
                gender:"ERROR",
                API_key:"ERROR",
                status:"USER INVALID"
            };
        }
        res.json(logReport);
    } catch (error) {
        console.error(error);
    }
});
app.post("/passenger/signup",async (req,res) => {
    var logReport;
    try {
        const {name,password,email,mobile,gender,age} = req.body;
        const hashedPsswd = await bycrypt.hash(password,10);
        const checkmail = await pool.query(QueryConstant.authUser,[email]);
        if(checkmail.rows[0] == undefined)
        {
            const passenger_id = uuidv4();
            const AuthAPI_key = uuidv4();
            const data = await pool.query(QueryConstant.postPassenger,
            [passenger_id,name,hashedPsswd,email,mobile,gender,age]);
            await pool.query(QueryConstant.apikeypost,[AuthAPI_key,passenger_id]);
            const API_key = await pool.query(QueryConstant.apikeyget,[passenger_id]);
            logReport = {
                name:data.rows[0].user_name,
                email:data.rows[0].email,
                API_key:data.rows[0].api_key,
                mobile:data.rows[0].mobile,
                gender:data.rows[0].gender,
                APIkey:API_key.rows[0].API_key,
                status: "SUCCESS"
            };
        }
        else
        {
            logReport = {
                name: "ERROR",
                email: "ERROR",
                passenger_id: "ERROR",
                mobile: "ERROR",
                gender: "ERROR",
                status: "USER ALREADY EXIST"
            };
        }
        res.json(logReport);
    } catch (error) {
        console.error(error);
    }
});

app.post("/passenger/signout",async(req,res) => {
    try{
        var logReport;
        const {email} = req.body;
        const passenger_id = await pool.query(QueryConstant.getpassengerid,[email]);
        await pool.query(QueryConstant.apikeyremove,[passenger_id.rows[0].passenger_id]);
        logReport = {
            name: "ERROR",
            email: "ERROR",
            passenger_id: "ERROR",
            mobile: "ERROR",
            gender: "ERROR",
            status: "USER LOGGEDOUT"
        };
        res.json(logReport);
    }catch(error){
        console.error(error);
    }
});
app.post("/passenger/isLoggedIn",async(req,res) => {
    try {
        const {email} = req.body;
        console.log("EMAIL       _         = ",email);
        const passenger_id = await pool.query(QueryConstant.getUserKey,[email]);
        const apiKey = await pool.query(QueryConstant.apikeyget,[passenger_id.rows[0].passenger_id]);
        const logReport = {apiKey: apiKey.rows[0].authapikey}
        res.json(logReport);
    } catch (error) {
        console.error(error);
    }
});
app.get("/passenger/ticket/history",async(req,res) => {
    try {
        
        const {email} = req.query;
        const passenger_id = await pool.query(QueryConstant.getUserKey,[email]);
        const ticketInfo = await pool.query(QueryConstant.ticketQuery,[passenger_id.rows[0].passenger_id]);
        var data;
        var logReport = [];
        //console.log("ticket info = ",ticketInfo);
        for(let i = 0;i < ticketInfo.rows.length;i++ )
        {
            data = {
                ticketId:ticketInfo.rows[i].ticket_id,
                from:ticketInfo.rows[i].boarding_point,
                to:ticketInfo.rows[i].destination_point,
                bookedTime:ticketInfo.rows[i].booked_time,
                status:ticketInfo.rows[i].status,
                price:ticketInfo.rows[i].price,
                busType:ticketInfo.rows[i].bus_type
            }
            logReport.push(data);
        }
        res.json(logReport);
    } catch (error) {
        console.error(error);
    }
});
app.get("/passenger/ticket/userinfo",async(req,res) => {
    try {
        const {email} = req.query;
        const passengerInfo = await pool.query(QueryConstant.passengerQuery,[email]);
        console.log("passenger info = ",passengerInfo.rows[0]);
        res.json(passengerInfo.rows[0]);
    } catch (error) {
        console.error(error);
    }
});
app.listen(5000, () => {
    console.log("Server has started");
});