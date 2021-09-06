const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('../config/dbConfig');

router.use(cors({
    origin: ['http://localhost:3000']
}));
router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/retreive/:username', (req, res) => {
    const username = req.params.username;
    const sqlRetreive = "SELECT * FROM `room` INNER JOIN `users` ON (clientA = username OR clientB = username) WHERE clientA = ? OR clientB = ?;"
    db.query(sqlRetreive, [username, username, username], (error, result) => {
        if(error) {
            console.error(error);
        }

        if(result){
            for(var i = 0; i < result.length; i++){
                if(result[i].username === username){
                    result.splice(i, 1);
                }
            }

            res.send(result)

        }
    })
});

router.post('/insert', (req, res) => {
    const roomID = req.body.roomID;
    const clientA = req.body.clientA;
    const clientB = req.body.clientB;
    const sqlInsert = "INSERT INTO `room` (roomID, clientA, clientB) VALUES (?, ?, ?);";
    db.query(sqlInsert, [roomID, clientA, clientB], (error, result) => {
        if(error){
            console.error(error);
        } 
        if(result) {
            res.send(result);
            console.log(result)
        }
    })
})



module.exports = router;