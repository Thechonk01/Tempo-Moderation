const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, logchannelid, errorchannelid } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		try {
			client.on(event.name, (...args) => {
				event.execute(...args)
				client.channels.cache.get(logchannelid).send("New event: " + event.name)
			});
		} catch (e) {
			client.channels.cache.get(errorchannelid).send("New event error: " + e)
		}
	}
}

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
		client.channels.cache.get(errorchannelid).send(`From ${interaction.guild.name} (${interaction.guild.id}) ${interaction.user.tag} (${interaction.user.id}) in #${interaction.channel.name} triggered ${interaction.commandName}.`)
	} catch (error) {
		console.log(error)
		client.channels.cache.get(errorchannelid).send("On command: " + interaction.commandName + "\n In guild: " + interaction.guild.name + "(" + interaction.guild.id + ")\nExecuted by: " + interaction.user.tag + "\nNew error: " + error)
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);