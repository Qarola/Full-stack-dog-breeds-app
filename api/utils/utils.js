module.exports = { 

filtered: function (arr, value) {
    var a = arr.filter((element) => {
      return (
        element.name.toLowerCase().includes(value.toLowerCase()) ||
        (element.temperament &&
          element.temperament.toLowerCase().includes(value.toLowerCase()))
      );
    });
    return a;
  },

  arrayParser: function (array) {
    let string = "";
    array.forEach((element) => {
      return (string += `${element.name}, `);
    });
    return string.substring(0, string.length - 2);
  }
  
 
};