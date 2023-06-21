const { ActivityType } = require('discord.js')//Definimos un componente de DJS

module.exports = {//Exportamos nuestro evento
    name: 'ready',
    once: true,
    async execute(client) {//Ejecutamos con función asyncrona en caso de querer añadir una función

        console.log(`[ ${client.user.tag} está online ]`);//Logueamos nuestro bot conectado
        console.log('[ Plantilla diseñada por Axelander ]')
        await client.user.setPresence({// Establecemos nuestra presencia preferida
            status: 'dnd',//Estado de nuestro bot esté será en no molestar
            activities: [{//Ponemos la actividad del bot
                name: 'Axelander',//Nombre de la actividad
                type: ActivityType.Streaming,//Tipo de actividad en nuestro caso al usar dnd y tipo transmitiendo saldrá transmitiendo
                url: 'https://www.twitch.tv/axelanderkz',//URL de nuestra actividad
            }],
        });
    },
};
