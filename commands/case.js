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
    console.log("Case.js connected!");
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('case')
        .setDescription('Shows you information about a case')
        .addStringOption(option =>
            option.setName("caseid")
                .setDescription("Id for the case you want to see")
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers) != true) {
            return interaction.reply({ content: "You do not have permission to do this", ephemeral: true })
        }
        var sql = "SELECT * FROM cases WHERE caseId = " + interaction.options.getString("caseid") + " AND guildId = " + interaction.guild.id;
        con.query(sql, function (err, result) {
            try {
                let userId = String(result[0].id)
                const caseEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setAuthor({ name: 'Tempo', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' })
                    .addFields(
                        { name: "User punished:", value: "<@" + userId + ">" },
                        { name: result[0].type + " reason:", value: "```" + result[0].reason + "```\n**Moderated by:**`" + result[0].enforcedBy + "`\n**Moderated at:**`" + result[0].date + "`" })
                    .setTimestamp()
                    .setFooter({ text: 'Tempo Moderation Tools', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' });
                interaction.reply({ embeds: [caseEmbed] })
            } catch {
                const caseEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setAuthor({ name: 'Tempo', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' })
                    .addFields(
                        { name: "Case not found", value: "Case does not exist" })
                    .setTimestamp()
                    .setFooter({ text: 'Tempo Moderation Tools', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' });
                interaction.reply({ embeds: [caseEmbed] })
            }
        });
    },
};