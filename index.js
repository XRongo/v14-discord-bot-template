// github.com/XRongo
const Discord = require("discord.js")
const FS = require("fs")
const chalk = require("chalk")
const config = require("./config.js")
// github.com/XRongo
const client = new Discord.Client({
    intents: Object.values(Discord.GatewayIntentBits),
    partials: Object.values(Discord.Partials),
    presence: {
        activities: [{
            name: "xrongo.xyz", // KENDİ İSTEĞİNİZE GÖRE DEĞİŞTİRİN
            type: Discord.ActivityType.Watching // KENDİ İSTEĞİNİZE GÖRE DEĞİŞTİRİN
        }],
        status: "dnd" // KENDİ İSTEĞİNİZE GÖRE DEĞİŞTİRİN
    },
    shards: "auto"
})
// github.com/XRongo
module.exports = client;
// github.com/XRongo
client.commands = []
// github.com/XRongo
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
    console.log(chalk.default.green(`[COMMAND] ${command.name} komutu yüklendi.`))
})
// github.com/XRongo
FS.readdirSync("./events").forEach(f => {
    if (!f.endsWith(".js")) return;
    const event = require(`./events/${f}`)
    if (!event.name) return;
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args))
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args))
    }
    console.log(chalk.default.green(`[EVENT] ${event.name} eventi yüklendi.`))
})
// github.com/XRongo
client.login(config.token)

process.on("unhandledRejection", (reason) => {
    console.error(chalk.default.red(`[ERROR] ${reason}`));
  });
  process.on("uncaughtException", (err) => {
    console.error(chalk.default.red(`[ERROR] ${err}`));
  });
  process.on("uncaughtExceptionMonitor", (err) => {
    console.error(chalk.default.red(`[ERROR] ${err}`));
  });



