const Discord = require("discord.js")
const FS = require("fs")
const chalk = require("chalk")
const ayarlar = require("./ayarlar.js")

const client = new Discord.Client({
    intents: Object.values(Discord.GatewayIntentBits),
    partials: Object.values(Discord.Partials),
    presence: {
        activities: [{
            name: ayarlar.bot_status,
            type: Discord.ActivityType.Custom,
            state: ayarlar.bot_status
        }],
        status: "dnd"
    },
    shards: "auto"
})

module.exports = client;
client.log = (message) => console.log(chalk.blue(`${message}`))
client.success = (message) => console.log(chalk.green(`${message}`))
client.error = (message) => console.error(chalk.red(`${message}`))
client.warn = (message) => console.warn(chalk.yellow(`${message}`))
client.slashCommands = new Discord.Collection()
client.slashCommandDatas = []

FS.readdirSync("./commands").filter(f => f.endsWith(".js")).forEach(f => {
    try {
        const command = require(`./commands/${f}`)
        var eksilikler = []
        if (!command.name) eksilikler.push("name")
        if (command.type === 1 && !command.description) eksilikler.push("description")
        if (!command.type) eksilikler.push("type")
        if (!command.execute) eksilikler.push("execute")
        if (eksilikler.length > 0) return client.error(`[COMMAND] ${f} komutunda eksiklikler var: ${eksilikler.join(", ")}`)
        client.slashCommandDatas.push({
            name: command.name,
            description: command.description,
            options: command?.options,
            dm_permission: false,
            type: command.type,
            default_member_permissions: command?.default_member_permissions,
        })
        client.slashCommands.set(command.name, command)
        client.success(`[COMMAND] ${command.name} komutu yüklendi.`)
    } catch (error) {
        client.error(`[COMMAND] ${f} komutunda bir hata oluştu: ${error}`)
    }
})

FS.readdirSync("./events").filter(f => f.endsWith(".js")).forEach(f => {
    try {
        const event = require(`./events/${f}`)
        var eksilikler = []
        if (!event.name) eksilikler.push("name")
        if (!event.execute) eksilikler.push("execute")
        if (eksilikler.length > 0) return client.error(`[COMMAND] ${f} komutunda eksiklikler var: ${eksilikler.join(", ")}`)
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args))
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args))
        }
        client.success(`[EVENT] ${event.name} eventi yüklendi.`)
    } catch (error) {
        client.error(`[EVENT] ${f} eventinde bir hata oluştu: ${error}`)
    }
})

client.login(ayarlar.bot_token)

process.on("unhandledRejection", (reason) => {
    client.error(`[ERROR] ${reason}`);
});
process.on("uncaughtException", (err) => {
    client.error(`[ERROR] ${err}`);
});
process.on("uncaughtExceptionMonitor", (err) => {
    client.error(`[ERROR] ${err}`);
});
process.on("warning", (err) => {
    client.warn(`[WARN] ${err}`);
});
