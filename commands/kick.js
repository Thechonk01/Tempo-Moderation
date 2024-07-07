const { SlashCommandBuilder, EmbedBuilder, Client, PermissionsBitField } = require('discord.js');
const d = new Date();
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
    console.log("Kick.js connected!");
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('UserId/User @')
                .setRequired(true))
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for Kicking user")
                .setRequired(true)),
    async execute(interaction) {
        const guildId = interaction.guild.id
        const reason = interaction.options.getString("reason")
        const user = interaction.options.getUser("user")
        const member = interaction.options.getMember("user")
        const str = interaction.options.getUser("user").toString();
        removeFirstChar = str.slice(2);
        const UserId = removeFirstChar.slice(0, removeFirstChar.length - 1);
        const date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()
        const memberpos = member.roles.highest.position
        const modpos = interaction.member.roles.highest.position
        const botpos = interaction.guild.members.me.roles.highest.position
        if (interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers) != true) {
            return interaction.reply({ content: "You do not have permission to do this", ephemeral: true })
        } else if (modpos <= memberpos && interaction.member.id != interaction.guild.ownerId) {
            return interaction.reply({ content: "You cannot kick this member since their role is higher/equal to yours!", ephemeral: true })
        } else if (botpos <= memberpos) {
            return interaction.reply({ content: "I cannot kick this member since their role is higher/equal to mine!", ephemeral: true })
        }
        var sql = "INSERT INTO cases (id, type, reason, guildId, enforcedBy, date) VALUES(" + UserId + ", 'Kick','" + reason + "'," + guildId + ",'" + interaction.user.tag + "','" + date + "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Kick added to DB");
        });
        try {
            await member.send("You were kicked from **" + interaction.guild.name + "** for `" + reason + "`")
            await interaction.guild.members.kick(user)
            const warnEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({ name: 'Tempo', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' })
                .setThumbnail(user.displayAvatarURL())
                .addFields(
                    { name: "User kick", value: "Kicked user <@" + UserId + ">" },
                    { name: "Kick reason:", value: "``" + reason + "``" })
                .setTimestamp()
                .setFooter({ text: 'Tempo Moderation Tools', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' });
            var sql = "SELECT log FROM config WHERE guildId = " + interaction.guild.id;
            con.query(sql, function (err, result) {
                if (err) throw err;
                if (result[0].log == null) {
                    return interaction.reply("User kicked, please setup log channel in /config");
                }
                const logchannel = interaction.client.channels.cache.get(result[0].log);
                logchannel.send({ embeds: [warnEmbed] })
                interaction.reply({ embeds: [warnEmbed] })
            });
        } catch (e) {
            const warnEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({ name: 'Tempo', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' })
                .setThumbnail(user.displayAvatarURL())
                .setDescription("Could not kick, are you sure the user is in the server?")
                .setTimestamp()
                .setFooter({ text: 'Tempo Moderation Tools', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' });
            interaction.reply({ embeds: [warnEmbed] })
        }

    }
};