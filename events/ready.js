const { ActivityType } = require('discord.js');
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
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log("In: " + client.guilds.cache.size + " guilds, with: " + client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0) + " members")
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('over ' + client.guilds.cache.size + ' guilds', { type: ActivityType.Watching });
		const Guilds = client.guilds.cache.map(guild => guild.id);
		for (let i = 0; i < Guilds.length; i++) {
			var sql = "SELECT guildId FROM config WHERE EXISTS(SELECT guildId FROM config WHERE guildId = " + Guilds[i] + ")";
			con.query(sql, function (err, result) {
				if (err) throw err;
				if (result.length < Guilds.length) {
					console.log(Guilds[i] + " Is not in the DB, adding now")
					var sql2 = "INSERT INTO config (guildId) VALUES(" + Guilds[i] + ")";
					con.query(sql2, function (err, result) {
						if (err) throw err;
						console.log("Added to DB")
					})
				} else {
					console.log(Guilds[i] + " Is already in DB")
				}
			}

			)
		}
	}
};