const express = require('express')
const pool = require('../connection')
const router = express.Router()

// getUsers
router.get('/', (req, res) => {
    pool.query("SELECT * FROM users", (err, rows) => {
        if (!err) {
            res.send(rows)
        }
        else {
            res.send(err)
        }
    })
})

// getUsersById
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    pool.query(`SELECT * FROM users WHERE id= ${id}`, (err, rows) => {
        if (!err) {
            res.send(rows)
        }
        else {
            res.send(err)
        }
    })
})

// addUsers
router.post('/', async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const username = req.body.username;
    pool.query(`INSERT INTO users(name,age,username) VALUES ('${name}',${age},'${username}')`, (err, rows) => {
        if (!err) {
                    res.send(rows)
        }
        else {
            res.send(err)
        }
    })
})

//update
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    const username = req.body.username;

    pool.query(`UPDATE users SET name='${name}',age=${age},username='${username}' where _id=${id}`, (err, rows) => {
        if (!err) {
            res.send(rows)
        }
        else
            res.send(err);
    })
})

//delete
router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    pool.query(`DELETE FROM users WHERE _id=${id}`, (err, rows) => {
        if (!err) {
            res.send(rows)
        }
        else
            res.send(err);
    })

})

module.exports = router;