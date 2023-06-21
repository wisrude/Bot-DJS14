const { Client, GatewayIntentBits, Collection } = require('discord.js')//Definimos lo que vayamos a usar siempre que provenga de DJS
const fs = require("fs")//Instalación para leer archivos y carpetas
const mongoose = require('mongoose');//Instalación para facilitar el uso de MONGODB
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});//Creamos un cliente con los intents necesarios
const config = require('../config.json')//Requerimos nuestra configuración del bot

// Database //
mongoose.connect(config.mongoose).then(() => {//Conectamos la DataBase
    console.log('[ Database conectada correctamente ]')//Hacemos un log para comprobar la conexión
}).catch(err => console.log(err));//Si no se conecta nos dirá el error

// SlashCommands //
client.slashcommands = new Collection();// Creamos una nueva colección
const commandFolders = fs.readdirSync('./commands');//Definimos la lectura de la carpeta

for (const folder of commandFolders) { //Hacemos que lea la carpeta dentro de otra
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));//Definimos nuestra carpeta para leer las siguientes carpetas y hacemos que lea archivos únicamente si terminan por JS
    for (const file of commandFiles) {//Hacemos que lea los archivos de las carpetas
        const command = require(`./commands/${folder}/${file}`);//Definimos que el comando proviene de la carpeta de comandos definida
        client.slashcommands.set(command.data.name, command);//Creamos los slashcommands con su nombre y función del archivo
    }
}
console.log(`[ ${client.slashcommands.size} comandos cargados correctamente ]`)//Logueamos la cantidad de slashcommands creados
require("./slashcommands")//Requerimos la carpeta donde cargamos los slashcommands
// Event Handling //
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));//Definimos los archivos eventos terminados por JS

for (const file of eventFiles) {//Requerimos el archvio de la carpeta
    const event = require(`./events/${file}`);//Definimos que nuestros eventos se encontrarán en esta carpeta
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));//Hacemos que se ejecute por su nombre y contenido
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));//Hacemos que se ejecute por segunda vez por su nombre y contenido en caso del que primero falle
    }
};
// Logueo //
client.login(config.token);//Logueamos e iniciamos nuestro bot atráves de su token