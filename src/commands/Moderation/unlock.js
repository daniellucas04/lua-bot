const { MessageEmbed, Permissions} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('👮 Enable @everyone to send messages in a specific channel'),
		permissions: [ Permissions.FLAGS.MANAGE_CHANNELS ],

	async execute(interaction) {
        const deleteMessage = 5000;

        let role = interaction.guild.roles.cache.find(r => r.name === '@everyone');
        interaction.channel.permissionOverwrites.edit(role, { SEND_MESSAGES: true });

        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription('🔓 this channel has been unlocked!')
        .setFooter({ text: '*this message will be deleted in 5 seconds.*'});

        await interaction.reply({ embeds: [embed]}).then(() =>{
            setTimeout(() =>{
                interaction.deleteReply();
            }, deleteMessage);
        });
    }
};