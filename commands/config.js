const { SlashCommandBuilder } = require('discord.js');
var mysql = require('mysql');
const { host, port, user, password, database } = require("../sql.json")
var con = mysql.createConnection({
  host: host,
  port: port,
  user: user,
  password: password,
  database: database,
  supportBigNumbers: true
});


con.connect(function (err) {
  if (err) throw err;
  console.log("Config connected!");
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Configures the bot')
    .addStringOption(option =>
      option.setName("option")
        .setDescription("Choose what to configure")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("set")
        .setDescription("Choose what to configure your option to")
        .setRequired(true)),
  async execute(interaction) {
    if (interaction.member.id != interaction.guild.ownerId) {
      return interaction.reply({ content: "You cannot use this command", ephemeral: true })
    }
    const option = interaction.options.getString("option")
    const set = interaction.options.getString("set")
    removeFirstChar = set.slice(2);
    const channelid = removeFirstChar.slice(0, removeFirstChar.length - 1);
    if (option.toLowerCase() == "join") {
      var sql = "UPDATE config SET welcome = '" + channelid + "' WHERE guildId = " + interaction.guild.id;
      con.query(sql, function (err, result) {
        if (err) throw err;
        interaction.reply("Config updated")
      });
    } else if (option.toLowerCase() == "log") {
      console.log(channelid)
      var sql = "UPDATE config SET " + option + " = '" + channelid + "' WHERE guildId = " + interaction.guild.id;
      con.query(sql, function (err, result) {
        if (err) throw err;
        interaction.reply("Config updated")
      });
    } else {
      interaction.reply("That option is not valid")
    }

  },
};