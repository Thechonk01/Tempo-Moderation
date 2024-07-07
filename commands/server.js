const { SlashCommandBuilder } = require('discord.js');
const { time } = require('discord.js');
const date = new Date();
const timeString = time(date);
const relative = time(date, 'R');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(interaction) {
		return interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	},
};