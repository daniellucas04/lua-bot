const { MessageEmbed, Permissions} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lock')
		.setDescription('👮 Disable @everyone from sending messages in specific channel.'),
		permissions: [ Permissions.FLAGS.MANAGE_CHANNELS ],

	async execute(interaction) {
        const deleteMessage = 5000;

        let role = interaction.guild.roles.cache.find(r => r.name === '@everyone');
        interaction.channel.permissionOverwrites.edit(role, { SEND_MESSAGES: false });

        const embed = new MessageEmbed()
        .setColor('DARK_RED')
        .setDescription('🔐 this channel has been locked!')
        .setFooter({ text: '*this message will be deleted in 5 seconds.*'});

        await interaction.reply({ embeds: [embed]}).then(() =>{
            setTimeout(() =>{
                interaction.deleteReply();
            }, deleteMessage);
        });
    }
};