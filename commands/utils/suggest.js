const { SlashCommandBuilder, EmbedBuilder, Client, ChatInputCommandInteraction } = require('discord.js'); //Componentes de DJS
const suggestions = require('../../models/server/setups') //Nuestro modelo creado

module.exports = { //Exportamos
    data: new SlashCommandBuilder() //Creamos nuevo comando de barra
        .setName("sugerir") //Nombre del comando
        .setDescription("Realiza una sugerencia dentro del servidor") //Descripción
        .addStringOption(option => option.setName('sugerencia').setDescription('Texto a sugerir al servidor').setRequired(true)), //Añadimos una opcíon String donde se puede poner texto y números,damos un nombre, una descripción y hacemos si es necesario en nuestra opción

    /**
     * @param {Client} client  //Parametro del cliente 
     * @param {ChatInputCommandInteraction} interaction //Parametro de nuestra interaccion
     */

    async run(client, interaction) { //Función asyncrona
        if (!interaction.guild.members.me.permissions.has('EmbedLinks')) return interaction.reply({ content: 'No puedo enviar mensaje en el canal de sugerencias.', ephemeral: true }); //Si el bot no tiene permisos para enviar mensajes embeds responderá

        try { //Hacemos que intente lo siguiente
            let suggest = interaction.options.getString("sugerencia", true) //Definimos suggest como la obtención de nuestra opción String que hemos llamado como sugerencia y la requerimos

            let dataEmbed = new EmbedBuilder() //Creamos nuestro embed
                .setDescription('Sugerencias sin establecer') //Descripción del embed
                .setColor("#ffffff") //Color del embed

            let data = await suggestions.findOne({ guild: interaction.guild.id }) //Buscamos si existe la ID del servidor donde se interactuo
            if (!data.suggestions) return interaction.reply({ embeds: [dataEmbed], ephemeral: true }) //Si en el servidor no existe nuestro objeto suggestions donde guardamos el objeto suggestions responderá

            let suggestEmbed = new EmbedBuilder() //Creamos nuestro embed a enviar
                .setTitle('Sugerencia') //Titulo del embed
                .setDescription(`${suggest}`) //Descripción del embed
                .setFooter({ text: `Sugerencia de ${interaction.user.tag}` }) //Pie de página del embed
                .setColor("#ffffff") //Color del embed
                .setTimestamp() //Hora de creación del embed

            await client.channels.cache.get(data.suggestions).send({ embeds: [suggestEmbed] }) //Hacemos que nuestro bot busque la ID del canal para enviar el mensaje que esta definido en nuestro modelo como suggestions y enviamos nuestro embed
            await interaction.reply({ content: "Su sugerencia fue enviada con éxito", ephemeral: true }) //Respondemos la interacción confirmando que el mensaje fue enviado

        } catch (error) { //Capturamos el error
            console.log(error) //Logueamos el error para luego arreglarlo
        }
    }
}
