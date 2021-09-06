const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('../config/dbConfig');
router.use(cors({
    origin: ['http://localhost:3000'],
}))
router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/search/:searchTerm/:username', (req, res) => {
    const searchTerm = req.params.searchTerm + '%';
    const username = req.params.username;
    console.log(searchTerm, username)
    const sqlSearch = "SELECT username, firstName, lastName from users WHERE username LIKE ? AND NOT EXISTS (SELECT username FROM users INNER JOIN room ON (username = clientA OR username = clientB) WHERE username = ? AND (clientA LIKE ? OR clientB LIKE ?)) AND username != ?;";
    db.query(sqlSearch, [searchTerm, username, searchTerm, searchTerm, username], (error, result) => {
        if(error){
            console.log(error);
        }

        if(result){
            res.send(result)
            console.log(result)
        }
    })


})

module.exports = router;