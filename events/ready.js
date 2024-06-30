const Discord = require("discord.js")
const chalk = require("chalk")

module.exports = {
    name: Discord.Events.ClientReady,
    once: true,

    async execute(client) {
        client.application.commands.set(client.slashCommandDatas)
        client.success(`[READY] ${client.user.tag} olarak giriş yapıldı.`)
    }
}