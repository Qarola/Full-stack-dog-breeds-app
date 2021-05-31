const { Router } = require('express');


const { addBreed, getAllBreedsList, getBreedById, getAllBreeds } = require('../controllers/dogController');
const { getAllTemperaments } = require('../controllers/temperamentController');

const router = Router();

// Configuramos los routers
//router.use('/users', user);

router.get('/home', getAllBreeds);

router.get('/dogs', getAllBreedsList);

router.get('/dogs/:id', getBreedById);

router.get('/temperament', getAllTemperaments);

router.post('/dog', addBreed)


module.exports = router;