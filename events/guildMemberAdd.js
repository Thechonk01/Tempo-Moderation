const { GuildMember } = require("discord.js")
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
    console.log("Join.js connected!");
});
module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        const { user, guild } = member;
        if (member.id == 1016371538154508421) {
            return console.log("Tempo got kicked");
        }
        var sql = "SELECT * FROM config WHERE guildId = " + member.guild.id;
        con.query(sql, function (err, result) {
            if (err) throw err;
            try {
                let evChan = "1082036368525492254"
                member.client.channels.cache.get(evChan).send("`" + user.tag + "` joined `" + guild.name + "` (`" + guild.id + ")`")
                if (result[0].welcome == null) {
                    return console.log("Welcome channel not found");
                }
                const leaveChannel = interaction.client.channels.cache.get(result[0].welcome);
                const leaveMessage = "<@" + user.id + "> **joined the server.**"
                leaveChannel.send({ content: leaveMessage })
                if (result[0].log == null) {
                    return;
                }
                const logchannel = interaction.client.channels.cache.get(result[0].log);
                logchannel.send(leaveMessage)
                console.log(user.tag + " joined " + guild.name)
            } catch (e) {
                console.log(e);
            }
        });
    },
};