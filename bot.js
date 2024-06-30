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

FS.readdirSync("./commands").forEach(f => {
    if (!f.endsWith(".js")) return;
    const command = require(`./commands/${f}`)
    if (!command.name || !command.type) return;
    client.commands.push({
        name: command.name,
        description: command.description,
        options: command.options,
        dm_permission: false,
        type: command.type
    })
    client.slashCommands.set(command.name, command)
    client.success(`[COMMAND] ${command.name} komutu yüklendi.`)
})

FS.readdirSync("./events").forEach(f => {
    if (!f.endsWith(".js")) return;
    const event = require(`./events/${f}`)
    if (!event.name) return;
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args))
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args))
    }
    client.success(`[EVENT] ${event.name} eventi yüklendi.`)
})

client.login(config.token)

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



