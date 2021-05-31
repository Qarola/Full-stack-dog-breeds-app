const { Temperament } = require('../db');



function getAllTemperaments(req, res) {
    try {
        Temperament.findAll({
            order: [['name', 'asc']] 
        }).then(r => {
            r.length ? res.send(r) : res.send({ message: 'Not found temperament'})
        })
    }
    catch(err) {
        res.send(err)
    }
};

module.exports = {
    getAllTemperaments
}