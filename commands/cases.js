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
    console.log("Cases.js connected!");
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cases')
        .setDescription('Shows you all cases from a user')
        .addUserOption(option =>
            option.setName("user")
                .setDescription("UserId/@")
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers) != true) {
            return interaction.reply({ content: "You do not have permission to do this", ephemeral: true })
        }
        str = interaction.options.getUser("user").toString();
        const user = interaction.options.getUser("user");
        removeFirstChar = str.slice(2);
        const UserId = removeFirstChar.slice(0, removeFirstChar.length - 1);
        var sql = "SELECT * FROM cases WHERE id = " + UserId + " AND guildId = " + interaction.guild.id;
        con.query(sql, function (err, result) {
            try {
                if (String(typeof (result[1])) == "undefined") {
                    let user2 = result[0].enforcedBy
                    let userId = String(result[0].id)
                    const caseEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setAuthor({ name: 'Tempo', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' })
                        .setDescription("Only one case found for `" + user.tag + "`\n__**Case " + result[0].caseId + "**__\nType:`" + result[0].type + "`\nReceived on:`" + result[0].date + "`\nReason:`" + result[0].reason + "`\nModerator:`" + user2 + "`")
                        .setTimestamp()
                        .setFooter({ text: 'Tempo Moderation Tools', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' });
                    interaction.reply({ embeds: [caseEmbed] })
                } else {
                    let userId = String(result[0].id)
                    i = 0
                    let results = ["**Cases for **`" + user.tag + "`\n"]
                    while (String(typeof (result[i])) != "undefined") {
                        let desc = "\n__**Case " + result[i].caseId + "**__\nType:`" + result[i].type + "`\nReceived on:`" + result[0].date + "`\nReason:`" + result[i].reason + "`\nModerator:`" + user.tag + "`";
                        results.push(desc)
                        i++
                    }
                    const caseEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setAuthor({ name: 'Tempo', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' })
                        .setDescription(results.join(""))
                        .setTimestamp()
                        .setFooter({ text: 'Tempo Moderation Tools', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' });
                    interaction.reply({ embeds: [caseEmbed] })
                }
            } catch (e) {
                const caseEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setAuthor({ name: 'Tempo', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' })
                    .addFields(
                        { name: "No cases found", value: "`" + user.tag + "` has no cases" })
                    .setTimestamp()
                    .setFooter({ text: 'Tempo Moderation Tools', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' });
                interaction.reply({ embeds: [caseEmbed] })
            }
        });
    },
};