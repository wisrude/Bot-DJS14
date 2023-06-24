const { Schema, model } = require('mongoose'); //Componentes de mongoose

const setup = new Schema({ //Creamos un nuevo Schema que se guardará en nuestra database
    guild: String, //Guardamos la ID de la guild
    suggestions: { //Objeto suggestions que se guardará en nuestra DataBase
        type: String, //Tipo de objeto en nuestro caso es un String, aunque hay más como Array, Number, Mixed, etc...
    },
});

module.exports = model('setup', setup); //Exportamos nuestro modelo con el nombre y el Schema