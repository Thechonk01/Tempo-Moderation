const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with a list of all commands!')
		.addStringOption(option =>
			option.setName("command")
				.setDescription("Name of command")
				.setRequired(false)),
	async execute(interaction) {
		try {
			if (interaction.options.getString("command").toLowerCase() == "ping") {
				const pingEmbed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
					.setThumbnail(interaction.user.displayAvatarURL())
					.addFields(
						{ name: "Command Name", value: "``ping``" },
						{ name: "Command Description", value: "This command allows you to see the bots ping" },
						{ name: "Command Usage", value: "``/ping``" })
					.setTimestamp()
					.setFooter({ text: "Tempo Help", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				return interaction.reply({ embeds: [pingEmbed] })
			} else if (interaction.options.getString("command").toLowerCase() == "server") {
				const serverEmbed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
					.setThumbnail(interaction.user.displayAvatarURL())
					.addFields(
						{ name: "Command Name", value: "``server``" },
						{ name: "Command Description", value: "This command allows you to see important stats about the server" },
						{ name: "Command Usage", value: "``/server``" })
					.setTimestamp()
					.setFooter({ text: "Tempo Help", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				return interaction.reply({ embeds: [serverEmbed] })
			} else if (interaction.options.getString("command").toLowerCase() == "user") {
				const userEmbed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
					.setThumbnail(interaction.user.displayAvatarURL())
					.addFields(
						{ name: "Command Name", value: "``user``" },
						{ name: "Command Description", value: "This command allows you to view vital information about the user" },
						{ name: "Command Usage", value: "``/user: @Chonk``**OR**``/user: 955526397277913159``" })
					.setTimestamp()
					.setFooter({ text: "Tempo Help", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				return interaction.reply({ embeds: [userEmbed] })
			} else if (interaction.options.getString("command").toLowerCase() == "config") {
				const configEmbed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
					.setThumbnail(interaction.user.displayAvatarURL())
					.addFields(
						{ name: "Command Name", value: "``config``" },
						{ name: "Command Description", value: "This command allows you to configure the bot" },
						{ name: "Command Usage", value: "The config command takes in two inputs at the moment, option and set. Option is what you want to configure, which is currently limited to `join` and `log`.\n `join` is the channel name where you want the welcome and leave messages to go.\n`log` is the name of the channel where you want all the bot logs to go.\nUsage: `/config welcome join-leave` **OR** `/config log logs` " })
					.setTimestamp()
					.setFooter({ text: "Tempo Help", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				return interaction.reply({ embeds: [configEmbed] })
			} else if (interaction.options.getString("command").toLowerCase() == "warn") {
				const warnEmbed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
					.setThumbnail(interaction.user.displayAvatarURL())
					.addFields(
						{ name: "Command Name", value: "``warn``" },
						{ name: "Command Description", value: "This command allows you to warn a user" },
						{ name: "Command Usage", value: "`/warn user reason`" })
					.setTimestamp()
					.setFooter({ text: "Tempo Help", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				return interaction.reply({ embeds: [warnEmbed] })
			} else if (interaction.options.getString("command").toLowerCase() == "ban") {
				const banEmbed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
					.setThumbnail(interaction.user.displayAvatarURL())
					.addFields(
						{ name: "Command Name", value: "``ban``" },
						{ name: "Command Description", value: "This command allows you to ban users" },
						{ name: "Command Usage", value: "``/ban user@/userID reason``" })
					.setTimestamp()
					.setFooter({ text: "Tempo Help", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				return interaction.reply({ embeds: [banEmbed] })
			} else if (interaction.options.getString("command").toLowerCase() == "cases") {
				const caseEmbed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
					.setThumbnail(interaction.user.displayAvatarURL())
					.addFields(
						{ name: "Command Name", value: "``cases``" },
						{ name: "Command Description", value: "This command allows you to see all cases relating to a user" },
						{ name: "Command Usage", value: "``/cases user@/userID``" })
					.setTimestamp()
					.setFooter({ text: "Tempo Help", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				return interaction.reply({ embeds: [caseEmbed] })
			} else if (interaction.options.getString("command").toLowerCase() == "case") {
				const pingEmbed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
					.setThumbnail(interaction.user.displayAvatarURL())
					.addFields(
						{ name: "Command Name", value: "``case``" },
						{ name: "Command Description", value: "This command allows you to view details about a specifc case" },
						{ name: "Command Usage", value: "``/case caseID``" })
					.setTimestamp()
					.setFooter({ text: "Tempo Help", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				return interaction.reply({ embeds: [pingEmbed] })
			} else if (interaction.options.getString("command").toLowerCase() == "deletecase") {
				const pingEmbed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
					.setThumbnail(interaction.user.displayAvatarURL())
					.addFields(
						{ name: "Command Name", value: "``deletecase``" },
						{ name: "Command Description", value: "This command allows you to delete a specific case from a user" },
						{ name: "Command Usage", value: "``/deletecase caseID``" })
					.setTimestamp()
					.setFooter({ text: "Tempo Help", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				return interaction.reply({ embeds: [pingEmbed] })
			} else if (interaction.options.getString("command").toLowerCase() == "embed") {
				const pingEmbed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
					.setThumbnail(interaction.user.displayAvatarURL())
					.addFields(
						{ name: "Command Name", value: "``embed``" },
						{ name: "Command Description", value: "This command allows you to send an embed to a specific channel, including an image and/or text" },
						{ name: "Command Usage", value: "``/embed channelName text imageURL``" })
					.setTimestamp()
					.setFooter({ text: "Tempo Help", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				return interaction.reply({ embeds: [pingEmbed] })
			} else if (interaction.options.getString("command").toLowerCase() == "unban") {
				const pingEmbed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
					.setThumbnail(interaction.user.displayAvatarURL())
					.addFields(
						{ name: "Command Name", value: "``unban``" },
						{ name: "Command Description", value: "This command allows you to unban a user from the server" },
						{ name: "Command Usage", value: "``/unban user@/userID``" })
					.setTimestamp()
					.setFooter({ text: "Tempo Help", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				return interaction.reply({ embeds: [pingEmbed] })
			} else {
				interaction.reply({ content: 'Command does not exist!', ephemeral: true })
			}
		} catch {
			const helpEmbed = new EmbedBuilder()
				.setColor(0xFF0000)
				.setAuthor({ name: "Tempo", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
				.setThumbnail(interaction.user.displayAvatarURL())
				.addFields(
					{ name: "Command Prefix", value: "The bots command prefix is ``/``" },
					{ name: "How to use", value: "This command allows you to see what commands do, how they are used, and their usage. To view a specific command, do /help `command name`" },
					{ name: "Command names", value: "**Ping**\n**Server**\n**User**\n**Case**\n**Cases**\n**Config**", inline: true },
					{ name: "\u200B", value: "**Deletecase**\n**Embed**\n**Kick**\n**Unban**\n**Warn**\n**Ban**", inline: true })
				.setTimestamp()
				.setFooter({ text: "Tempo Help", iconURL: "https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png" })
			return interaction.reply({ embeds: [helpEmbed] });
		}
	},
};