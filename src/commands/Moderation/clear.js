const { CommandInteraction, MessageEmbed, Permissions} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('👮 Deletes messages from a channel or member.')
		.addIntegerOption(option => option.setName('amount').setDescription('Number of messages to clear.').setRequired(true))
		.addUserOption(option => option.setName('member').setDescription('Select a user to clear their messages.').setRequired(false)),
		permissions: [ Permissions.FLAGS.MANAGE_MESSAGES ],
		
		/**
		 * 
		 * @param {CommandInteraction} interaction 
		 */
	async execute(interaction) {
		const { channel, options } = interaction;

		const Amount = options.getInteger('amount');
		const member = options.getMember('member');
		const deleteMessage = 3000;

		const Messages = await channel.messages.fetch();

		const embed = new MessageEmbed()
		.setColor('GREEN');

		if(Amount > 100 || Amount <= 0) {
            embed.setDescription(`Amount cannot exceed 100, and cannot be under 1.`)
            return interaction.reply({embeds: [embed]});
		}

		if(member){
			let i = 0;
			const filtered = [];
			(await Messages).filter((m) =>{
				if(m.author.id === member.id && Amount > i){
					filtered.push(m);
					i++;
				}
			})

			await channel.bulkDelete(filtered, true).then(messages =>{
				embed.setDescription(`🗑 Cleard ${messages.size} from ${member}.`);
				interaction.reply({embeds: [embed]})
				.then(() =>{
					setTimeout(() =>{
						interaction.deleteReply();
					}, deleteMessage);
				});
			});
		}else{
			await channel.bulkDelete(Amount, true).then(messages => {
				embed.setDescription(`🗑 Cleard ${messages.size} from this channel.`);
				interaction.reply({embeds: [embed]})
				.then(() =>{
					setTimeout(() =>{
						interaction.deleteReply();
					}, deleteMessage);
				});
			});
		}
	},
};