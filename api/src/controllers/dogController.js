const { Dog, Temperament } = require('../db');
const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const {filtered, arrayParser} = require('../../utils/utils')
const Op = Sequelize.Op;
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');


const fetch = require('node-fetch')


function getAllBreeds(req, res) {
    try {
        const urlApi = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const dogDb = Dog.findAll({
            include: Temperament
        });
      
        Promise.all([ urlApi, dogDb ])
        .then((response) => {
           
            var dogArray = [];
            response[0].data.forEach((el) => {
                let objBreed = {
                    id: el.id,
                    name: el.name,
                    image: el.image.url,
                    temperament: el.temperament
                };
               dogArray.push(objBreed);
            });
            response[1].forEach((el) => {
                let objBreed = {
                    id: el.id,
                    name: el.name,
                    image: el.image,
                    temperament: arrayParser(el.temperaments)
                };
               dogArray.push(objBreed)
    
            });
            let finalDogs = dogArray.slice(0, 8);
    
            return res.json(finalDogs);
        })
           
        
      
    }
    
      catch(err) {
       res.send(err)
      }   

}  

   
   


//Search for dog's name...(query params...)
function getAllBreedsList(req, res) {
    let name = req.query.name;
    try {
        const urlApi = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const dogDb = Dog.findAll({
            where: {
                name: {
                    [Op.like]:  `%${name}%`
                },
            },
            include: Temperament
        });
        Promise.all([ urlApi, dogDb ])
        .then((response) => {
            let dogArray = [];
            response[0].data.forEach((el) => {
                let objBreed = {
                    id: el.id,
                    name: el.name,
                    image: el.image.url,
                    life_span: el.life_span,
                    temperament: el.temperament
                };
                dogArray.push(objBreed);
            });
            response[1].forEach((el) => {
                let objBreed = {
                    id: el.id,
                    name: el.name,
                    image: el.image,
                    life_span: el.life_span,
                    temperament: arrayParser(el.temperaments)
                };
                dogArray.push(objBreed)

            });
            if(name) {
                let filterName = filtered(dogArray, name).slice(0, 8);
                return res.json(filterName)
            }
        }) 
    }

      catch(err) {
         res.send(err)
      }     
}
       


async  function getBreedById(req, res) {

    let { id } = req.params;
    let pattern = /^[0-9]+$/;  // Use the [^0-9] expression to find any character that is NOT a digit.
       if(pattern.test(id)) {
        fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${parseInt(id)}`)    

        .then ((data)=> data.json())
        .then ((result)=> res.json(result[0].breeds[0]))             
        .catch((err)=> res.status(401))
         
       } else {
        try {
            Dog.findByPk(id, {
                include: Temperament
            }).then(r => {
                r ? res.send(r) : res.send({ message: `Could not get breed with id: ${id}` })
            })
        }
        catch (err) {
            res.send(err)
        }
        
      }
}
       



//Add a dog breed to the DB...
async function addBreed(req, res) {

    const { name, height, weight, life_span, temperament } = req.body;
    const id = uuidv4();
    const newBreed = { id, name, height, weight, life_span, temperament }
    const breed = await Dog.create(newBreed);
    breed.setTemperaments(temperament);
    res.send({ message: 'New dog breed has been created successfully.'}); 
    
  

  /*  const dog = req.body;
   res.send(await Dog.create({
        ...dog,
        id: uuidv4()
    })) */

  

}

module.exports = {
    addBreed,
    getAllBreedsList,
    getBreedById,
    getAllBreeds
   
}