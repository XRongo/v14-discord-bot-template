const Discord = require("discord.js")
const chalk = require(`chalk`)

module.exports = {
    name: "ready", // ZORUNLU
    once: true,

    /**
     * @param {Discord.Client} client 
     */

    async execute(client) {
        client.application.commands.set(client.commands)
        console.log(chalk.default.green(`[READY] ${client.user.tag} olarak giriş yapıldı.`))
    }
}