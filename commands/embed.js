const { SlashCommandBuilder, EmbedBuilder, Util } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Embeds a message')
        .addStringOption(option =>
            option.setName("channel")
                .setDescription("Name of channel to send embed in")
                .setRequired(true)),
    async execute(interaction) {
        const channelname = interaction.options.getString("channel")
        removeFirstChar = channelname.slice(2);
        const channelid = removeFirstChar.slice(0, removeFirstChar.length - 1);
        const channel = interaction.client.channels.cache.get(channelid)
        interaction.deferReply()
        const filter = m => m.member.id === interaction.user.id
        const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });
        collector.on('collect', m => {
            if (m.attachments.size != 0) {
                console.log(m.content);
                interaction.editReply((m.attachments.first().url + "\n" + m.content))
                content = Util.escapeMarkdown(m.content)
                const exampleEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Some title')
                    .setURL('https://discord.js.org/')
                    .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
                    .setDescription(content)
                    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                interaction.channel.send({ embeds: [exampleEmbed] })
                collector.stop()
            } else {
                content = Util.escapeMarkdown(m.content)
                const exampleEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Some title')
                    .setURL('https://discord.js.org/')
                    .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
                    .setDescription(content)
                    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                interaction.channel.send({ embeds: [exampleEmbed] })
                collector.stop()
                collector.stop()
            }
        });
        collector.on('end', collected => {
            if (collector.endReason == "time") {
                interaction.editReply("Timed out")
            }
        });
    },
};  