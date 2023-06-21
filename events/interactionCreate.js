const { Client, BaseInteraction } = require("discord.js");// Definimos nuestro cliente y la interacción

module.exports = {//Exportamos nuestro evento
    name: 'interactionCreate',//Nombre del evento
    /**
     * @param {Client} client //Registramos parametro del cliente
     * @param {BaseInteraction} interaction //Registramos parametro de la interacción
     */
    async execute(client, interaction) {// Usamos función asyncrona para usar funciones

        if (!interaction.isChatInputCommand()) return;//Si no existe la interacción no realizamos nada

        const slashcmd = client.slashcommands.get(interaction.commandName)//Definimos nuestro comandos ha obtener
        if (!slashcmd) return;//Si no existe el comando no se ejecutará, también sirve para evitar si no existe ningún archivo como comando no suelte error

        else if (slashcmd) {//En caso de haber comando se ejecutará
            await slashcmd.execute(client, interaction).catch((err) => {//Ejecutamos nuestro comando y capturamos el error en caso de haber uno
                console.error(err);//Logueamos el error para próximamente corregirlo
                interaction.reply({ content: 'Ocurrio un error', ephemeral: true })//En caso de error se enviará un mensaje unicamente visible para el usuario que ejecuto el comando diciendo que ocurrió un error
            })
        }
    },
}