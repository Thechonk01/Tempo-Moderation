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

con.connect(function (err) {
  if (err) throw err;
  console.log("guildCreate.js connected!");
});


module.exports = {
  name: 'guildDelete',
  execute(guild) {
    try {
      console.log("Left " + guild.name + "(" + guild.id + ")")
      guild.client.user.setActivity('over ' + guild.client.guilds.cache.size + ' guilds', { type: ActivityType.Watching });
      var sql = "DELETE FROM config WHERE guildId = '" + guild.id + "'";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Deleted from DB")
      });

    } catch (e) {
      console.log("Error: " + e + "\n Guild id: " + guild.id)
    }
  }
};