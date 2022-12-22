const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('👮 Kicks a member from your server.')
		.addUserOption(option =>
			option.setName('member')
			.setDescription('The member to kick')
			.setRequired(true))
		.addStringOption(option => 
				option.setName('reason')
				.setDescription('The reason for the kick.')),
				permissions: [Permissions.FLAGS.KICK_MEMBERS],
		execute(interaction) {
			const target = interaction.options.getUser('member');
			const reason = interaction.options.getString('reason') || 'No reason provided.';

			const embed = new MessageEmbed()
			.setColor('RANDOM')

			const kickedmember = interaction.guild.members.kick(target);

			if(!kickedmember){
				try{
					interaction.reply({ content: 'Its not possible to kick this member', ephemeral:true});
				}
				catch(err){
					console.error(err);
				}
			}else{
				embed.setTitle(`${target.tag} has been kicked!`)
				.setDescription(`Reason: ${reason}`)
				.setFooter({ text: `By ${interaction.user.username}`, iconURL: interaction.user.avatarURL() });
				interaction.reply({ embeds: [embed]});
			}

			embed.setTitle(`👮 You has been kicked from ${interaction.guild.name}`)
            .setDescription(`Reason: ${reason}`)
            .setFooter({ text: `By ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
			target.send({ embeds: [embed]})
	},
};