module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
		console.log(`From ${interaction.guild.name} (${interaction.guild.id}) ${interaction.user.tag} (${interaction.user.id}) in #${interaction.channel.name} triggered ${interaction.commandName}.`);
	},
};