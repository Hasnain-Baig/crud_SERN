const express = require('express')
const app = express()
const mysql = require('mysql');

//SQL Connection
const pool = mysql.createPool({
    connectionLimit : 10,
    host:'localhost',
    user:'root',
    password:'',
    database:'sern_crud',
  })
  
// console.log("----->",pool);

module.exports=pool;