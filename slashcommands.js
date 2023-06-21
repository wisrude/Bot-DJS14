// Instalaciones requeridas para los SlashCommands //
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10");
const config = require('./config.json')//Requerimos nuestra configuración
const clientId = (config.clientId)//Indicamos la ID de nuestro bot
const fs = require('fs')
const commands = []//Definimos nuestros comandos
const commandFolders = fs.readdirSync('./commands');// Definimos la lectura donde leer los comandos de nuestra carpeta

for (const folder of commandFolders) {//Leemos las carpetas dentro de nuestra carpeta de comandos
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));//Definimos nuestro carpeta donde estarán todos los slashcommands y nuestros archivos leidos sean unicamente su nombre terminado por JS
    for (const file of commandFiles) {//Leemos el archivo dentro de nuestras carpetas definidas anteriormente
        const slash = require(`./commands/${folder}/${file}`)//Definimos donde se encontrarán nuestros archivos para ser leidos
        commands.push(slash.data.toJSON())//Agregamos los datos convirtiendolos en JSON
    }
}

const rest = new REST({ version: "10" }).setToken(config.token)//Definimos nuestra version rest anteriormente definida e insertamos nuestro token del bot
createSlash()//Registramos nuestros comandos slash o comandos de barra

async function createSlash() {//Creamos nuestra función para registrarlos
    try {
        await rest.put(
            Routes.applicationCommands(clientId), {
            body: commands
        })//Indicamos a cual bot se va a registrar y registramos los comandos slash de nuestra carpeta de comandos
        console.log("[ SlashCommands cargados correctamente ]")//Logueamos que hayan sigo registrados correctamente
    } catch (err) {//Capturamos el error
        console.error(err)//Logueamos el error para luego resolverlo en caso de que no funcione
    }
}