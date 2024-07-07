const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
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
    console.log("Deletecase.js connected!");
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletecase')
        .setDescription('Deletes the specified case')
        .addStringOption(option =>
            option.setName("caseid")
                .setDescription("Id for the case you want to delete")
                .setRequired(true)),
    async execute(interaction) {
        const member = interaction.options.getMember("user")
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers) != true) {
            return interaction.reply({ content: "You do not have permission to do this", ephemeral: true })
        }
        var sql = "SELECT * FROM cases WHERE caseId = " + interaction.options.getString("caseid") + " AND guildId = " + interaction.guild.id;
        con.query(sql, function (err, result) {
            try {
                let userId = String(result[0].id)
                var sql = "DELETE FROM cases WHERE caseId = " + interaction.options.getString("caseid") + " AND guildId = " + interaction.guild.id;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                });

                const caseEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setAuthor({ name: 'Tempo', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' })
                    .addFields(
                        { name: "Case deleted", value: '\u200B' },
                        { name: "User punished:", value: "<@" + userId + ">" },
                        { name: result[0].type + " reason:", value: "```" + result[0].reason + "```\n**Punished by:**`" + result[0].enforcedBy + "`\n**Punished at:**`" + result[0].date + "`" })
                    .setTimestamp()
                    .setFooter({ text: 'Tempo Moderation Tools', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' });
                var sql = "SELECT log FROM config WHERE guildId = " + interaction.guild.id;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    if (result[0].log == null) {
                        return interaction.reply("Case deleted, please setup log channel in /config");
                    }
                    const logchannel = interaction.client.channels.cache.get(result[0].log);
                    logchannel.send({ embeds: [caseEmbed] })
                    interaction.reply("Deleted case")
                });
            } catch {
                const caseEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setAuthor({ name: 'Tempo', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' })
                    .addFields(
                        { name: "Case could not be deleted", value: "Are you sure the case exists?" })
                    .setTimestamp()
                    .setFooter({ text: 'Tempo Moderation Tools', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' });
                interaction.reply({ embeds: [caseEmbed] })
            }
        });
    },
};