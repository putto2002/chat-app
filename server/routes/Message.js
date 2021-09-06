const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('../config/dbConfig');

router.use(express.json());
router.use(express.urlencoded({extended: true}))
router.use(cors({
    origin: ['http://localhost:3000'],
}));

router.get('/retreive/:username', (req, res) => {
    const username = req.params.username;
    const sqlRetreive = "SELECT * FROM `message` WHERE `sender` = ? OR `receiver` = ?;";
    db.query(sqlRetreive, [username, username], (error, result) => {
        if(error){
            console.error(error);
        }

        if(result){
            res.send(result);
        }
    })
})

router.post('/insert', (req, res) => {
    const roomID = req.body.roomID;
    const message = req.body.message;
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const sqlInsert = "INSERT INTO `message` (`roomID`, `message`, `sender`, `receiver`) VALUES (?, ?, ?, ?);";
    db.query(sqlInsert, [message, sender,, receiver], (error, result) => {
        if(error){
            console.error(error);
        }
        if(result) {
            res.send(result);
        }
    })
})

module.exports = router;
