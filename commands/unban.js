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
    console.log("Unban.js connected!");
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('unbans user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('UserId/User @')
                .setRequired(true))
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for unbanning user")
                .setRequired(true)),
    async execute(interaction) {
        const member = interaction.options.getMember("user")
        if (interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers) != true) {
            return interaction.reply({ content: "You do not have permission to do this", ephemeral: true })
        }
        const guildId = interaction.guild.id
        const reason = interaction.options.getString("reason")
        const user = interaction.options.getUser("user")
        const str = interaction.options.getUser("user").toString();
        removeFirstChar = str.slice(2);
        const UserId = removeFirstChar.slice(0, removeFirstChar.length - 1);
        const date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()
        var sql = "INSERT INTO cases (id, type, reason, guildId, enforcedBy, date) VALUES(" + UserId + ", 'Unban','" + reason + "'," + guildId + ",'" + interaction.user.tag + "','" + date + "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Unban added to DB");
        });
        try {
            await interaction.guild.members.unban(user)
            const warnEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({ name: 'Tempo', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' })
                .setThumbnail(user.displayAvatarURL())
                .addFields(
                    { name: "User unban", value: "Unbanned user <@" + UserId + ">" },
                    { name: "Unban reason:", value: "``" + reason + "``" })
                .setTimestamp()
                .setFooter({ text: 'Tempo Moderation Tools', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' });
            var sql = "SELECT log FROM config WHERE guildId = " + interaction.guild.id;
            con.query(sql, function (err, result) {
                if (err) throw err;
                if (result[0].log == null) {
                    return interaction.reply("User unbanned, please setup log channel in /config");
                }
                const logchannel = interaction.client.channels.cache.get(result[0].log);
                logchannel.send({ embeds: [warnEmbed] })
                interaction.reply("Unbanned `" + user.tag + "` for `" + reason + "`")
            })
        } catch (e) {
            const warnEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({ name: 'Tempo', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' })
                .setThumbnail(user.displayAvatarURL())
                .setDescription("Could not unban, are you sure the user is banned?")
                .setTimestamp()
                .setFooter({ text: 'Tempo Moderation Tools', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' });
            interaction.reply({ embeds: [warnEmbed] })
        }

    }
};