const Discord = require("discord.js")

module.exports = {
    name: "ping", // ZORUNLU
    description: "Botun gecikmesini gösterir.", // ZORUNLU
    type: 1, // ZORUNLU
    options: [],

    /**
     * @param {Discord.Client} client
     * @param {Discord.ChatInputCommandInteraction} interaction
     */

    async execute(client, interaction) {
        interaction.reply(`Ölçülüyor...`).then(() => {
            setTimeout(() => {
                interaction.editReply(`Ping: ${client.ws.ping}`)
            }, 2000)
        })
    }
}