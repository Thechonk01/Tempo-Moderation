const { SlashCommandBuilder, Guild, EmbedBuilder, Faces } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Embeds a message')
		.addBooleanOption(option =>
			option.setName("format"))
		.setDescription("True will use the previous message in the channel")
		.addStringOption(option =>
			option.setName("channel")
				.setDescription("Name of channel to send embed in")
				.setRequired(true))
		.addStringOption(option =>
			option.setName("text")
				.setDescription("Text for embed here"))
		.addStringOption(option =>
			option.setName("image")
				.setDescription("Url of image")),
	async execute(interaction) {
		const format = interaction.options.getString("format")
		const message = interaction.options.getString("text")
		const image = interaction.options.getString("image")
		const channelname = interaction.options.getString("channel")
		removeFirstChar = channelname.slice(2);
		const channelid = removeFirstChar.slice(0, removeFirstChar.length - 1);
		const channel = interaction.client.channels.cache.get(channelid)
		if (format == true) {
			channel.lastMessage()
		}
		if (message == null && image == null) {
			return interaction.reply({ content: "Please specify text or image url", ephemeral: true })
		} else if (message == null && image != null) {
			const embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				.setImage(image)
			interaction.reply({ content: "Embed sent", ephemeral: true })
			channel.send({ embeds: [embed] })
		} else if (message != null && image == null) {
			const embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				.setDescription(message)
			interaction.reply({ content: "Embed sent", ephemeral: true })
			channel.send({ embeds: [embed] })
		} else {
			const embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				.setDescription(message)
				.setImage(image)
			interaction.reply({ content: "Embed sent", ephemeral: true })
			channel.send({ embeds: [embed] })
		}
	},
};