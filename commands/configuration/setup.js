const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js'); //Componentes de DJS
const setups = require('../models/server/setups') //Definimos nuestra constante requiriendo nuestro modelo

module.exports = { //Exportamos
    data: new SlashCommandBuilder() //Creamos un nuevo comando de barra
        .setName("setup") //Nombre del comandoo
        .setDescription("Seleccione su sistema favorito") //Descripción del comando
        .addSubcommand(subcommand => //Añadimos subcomandos que sirven para no tener que crear comandos comenzando por el mismo nombre
            subcommand //Definimos subcommand y después lo usamos para darle componentes a nuestro subcomando
                .setName('sugerencias') //Nombre del subcomando
                .setDescription('Estableza el sistema de sugerencias') //Descripción del subcomando
                .addChannelOption(c => c.setName('channel').setDescription('Canal de sugerencias').setRequired(true))), //Opción que nos proporcionará nuestro subcomando la nuestra será de un canal. Usando .setRequired si lo ponemos en true obligaremos al usuario a añadir esa opción y en caso de false se convertirá en opcional
    /**
     * @param {Client} client //Nuestro parametro del cliente
     * @param {ChatInputCommandInteraction} interaction //Nuestro parametro de la interacción
     */

    async run(client, interaction) { //Usamos nuestra función asyncrona
        try { //Hacemos que intente lo siguiente
            if (!interaction.member.permissions.has('ManageChannels')) return interaction.reply({ content: "Requieres de permisos de Editar Canales para ejecutar este comando", ephemeral: true }) //Si el usuario que interactúo no tiene permisos de Editar Canales responderá
            if (!interaction.guild.members.me.permissions.has('ManageChannels')) return interaction.reply({ content: "Requiero de permisos de Editar Canales para establecer el sistema", ephemeral: true }) //Si el bot no tiene permisos de Editar Canales responderá. Esto funciona de manera que en el servidor ejecutado se busca a él mismo entre los usuarios y comprueba si tiene el permiso citado

            let data = await setups.findOne({ guild: interaction.guild.id }) //Definimos data y hacemos petición a mongodb buscando el objeto guild que es definido como la ID del servidor donde se interactua
            if (!data) data = await (new setups({ guild: interaction.guild.id })).save() // Si no existe este dato, creamos nuestro objeto usando el modelo definido arriba anteriormente que será guild como la ID del servidor donde se ejecuto y lo GUARDAMOS, si no se guarda simplemente será algo innecesario

            if (interaction.options.getSubcommand() === 'sugerencias') { //Si la opción de la interacción es el subcomando de sugerencias realizará lo siguiente
                let channel = interaction.options.getChannel("channel", true) // Definimos channel como la obtención de la opción definida en nuestro subcomando que obtendremos un canal por eso usamos getChannel y ponemos cual es el nombre de la opción del subcomando ha obtener y si es obligatorio u opcional usando true o false
                data.suggestions = channel.id // Aqui hacemos que cree el objeto suggestions y lo defina como la ID del canal obtenido anteriormente

                let suggestionsEmbed = new EmbedBuilder() //Definimos nuestro embed
                    .setTitle('<:Configuracion:1054733140729532476> | Sugerencias') //Titulo del embed
                    .setDescription(`<:Canales:1054742504584519710> **Canal establecido:** [${channel}]\n<:Corona:1054740007186866286> **Autor:** [<@${interaction.user.id}>]`) //Descripción del embed
                    .setColor("#ffffff") //Color del embed

                await setups.findOneAndUpdate({ guild: int.guild.id }, data) //Finalmente hacemos que de nuestro modelo definido en el principio obtenga y actualice nuestros objetos guild añadiendo lo definido como data que es igual a la ID del canal que hemos obtenido
                await interaction.reply({ embeds: [suggestionsEmbed] }) //Respondemos la interacción confirmando finalmente que no hubo errores
            }
        } catch (error) { //En caso de error lo capturamos
            console.log(error) //Hacemos log de nuestro error capturado para arreglarlo
        }
    }
}
