const Discord = require("discord.js")
const FS = require("fs")

module.exports = {
    name: "interactionCreate", // ZORUNLU
    once: false, 

    /**
     * @param {Discord.Client} client 
     * @param {Discord.CommandInteraction} interaction 
     */

    async execute(client, interaction) {
        if (!interaction.guild || interaction.user.bot) return;
        if (interaction.type !== Discord.InteractionType.ApplicationCommand) return;

        FS.readdirSync("./commands").forEach(async (f) => {
			if (!f.endsWith(".js")) return;
			const cmd = require(`../commands/${f}`)
			if (cmd && (cmd.name !== interaction.commandName)) return;
	
			const args = [];
	
			for (const option of interaction.options.data) {
				if (option.type == 1) {
					if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.value) args.push(x.value);
					});
				}
				else if (option.type == 2) {
					if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.type == 1) {
							if (x.name) args.push(x.name);
							x.options?.forEach((i) => {
								if (i.value) args.push(i.value);
							});
						}
					});
				}
				else if (option.value) {
					args.push(option.value);
				}
			}
	
			if (!interaction.member) {
				interaction.member = await interaction.guild.members.fetch(
					interaction.user.id,
				);
			}
	
			cmd.execute(client, interaction, args)
		})

    }
}