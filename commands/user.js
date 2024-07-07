const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { time } = require('discord.js');
const date = new Date();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with iformation about a user!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('UserId/User @')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers) != true) {
            return interaction.reply({ content: "You do not have permission to do this", ephemeral: true })
        }
        const user = interaction.options.getMember("user");
        const user1 = interaction.options.getUser("user");
        const str = interaction.options.getUser("user").toString();
        removeFirstChar = str.slice(2);
        const user2 = removeFirstChar.slice(0, removeFirstChar.length - 1);
        try {
            await interaction.guild.members.fetch(user2)
            let roler = user.roles.cache
                .filter((roles) => roles.id !== interaction.guild.id)
                .map((role) => role.toString());
            if (roler.toString() === "") {
                roler = "User has no roles"
            }
            const userEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setAuthor({ name: 'Tempo', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' })
                .setThumbnail(user1.displayAvatarURL())
                .addFields(
                    { name: 'User Information', value: 'User tag: ``' + user1.tag + "``\nUser Id: ``" + user2 + "``\nMention: " + "<@" + user2 + ">" },
                    { name: "Account Age", value: "User joined: " + time(user.joinedAt, "R") + "\nAccount created: " + time(user.user.createdAt, "R") },
                    { name: "User Roles", value: roler.toString() })
                .setTimestamp()
                .setFooter({ text: 'Tempo Moderation Tools', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' });
            return interaction.reply({ embeds: [userEmbed] });
        } catch (e) {
            const userEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({ name: 'Tempo', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' })
                .setThumbnail(user1.displayAvatarURL())
                .addFields(
                    { name: 'User Information', value: 'User tag: ``' + user1.tag + "``\nUser Id: ``" + user2 + "``\nMention: " + "<@" + user2 + ">" },
                    { name: "User Not Found", value: "User is not in the server" })
                .setTimestamp()
                .setFooter({ text: 'Tempo Moderation Tools', iconURL: 'https://cdn.discordapp.com/attachments/972879472795734096/1021434510325329920/tempologo2.png' });
            return interaction.reply({ embeds: [userEmbed] });
        }
    },
};