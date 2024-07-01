const Discord = require("discord.js")

module.exports = {
	name: Discord.Events.InteractionCreate,

	async execute(client, interaction) {
		if (!interaction.guild || interaction.user.bot) return;
		if (interaction.type !== Discord.InteractionType.ApplicationCommand) return;

		try {
			const command = client.slashCommands.get(interaction.commandName)
			if (!command) return;


			if (!interaction.member) {
				interaction.member = await interaction.guild.members.fetch(interaction.user.id);
			}

			await command.execute(client, interaction)
		} catch (error) {
			client.error(`[COMMAND] ${interaction.commandName} komutunda bir hata oluştu: ${error}`)
			return interaction.reply({ content: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.", ephemeral: true })
		}
	}
}