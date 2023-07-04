const { Client, SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js')// Definimos componentes de DJS

/**
  * @param {Client} client //Parametro del cliente
  * @param {ChatInputCommandInteraction} interaction //Parametro de la interacción
  */

module.exports = { //Exportamos nuestro slashcommand
    data: new SlashCommandBuilder()//Creamos el comando de forma Slash o como comando de barra
        .setName('ping')//Nombre del comando
        .setDescription('Ping del bot'),//Descripción de nuestro comando

    async execute(client, interaction) {// Usamos nuestra función asyncrona para más funciones
        await interaction.reply({ content: `Ping: ${client.ws.ping} ms`, ephemeral: true })// Esperamos la interacción y se responderá un mensaje para unicamente el usuario que ejecuto el comando indicando el ping del bot
    }
}
