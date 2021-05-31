const { default: axios } = require('axios');
const server = require('./src/app.js');
const { conn, Temperament } = require('./src/db.js');
const { API_KEY } = process.env;


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
//the dog temperaments...
  //axios.get("https://api.thedogapi.com/v1/breeds?") 
  axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  .then((result) => {
   // console.log(result.data)
   let mySet = new Set();
   let resp = result.data;
   let tempString = resp.map((el) => el.temperament);
   //console.log(tempString)

  let newTemp = tempString.map((el) => el && el.split(', ')).flat()
  //console.log(newTemp)

    for(var i = 0; i < newTemp.length; i++) {
      mySet.add(newTemp[i]);
    }
    //console.log(mySet)

    const arr = [];
    mySet.forEach((name) => {
      arr.push({ name });
    });
    //console.log(arr);
    return Temperament.bulkCreate(arr, { returning: true })
}) 
 

  console.log('Conexión con la DB correcta')
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
 
 
  });
});
