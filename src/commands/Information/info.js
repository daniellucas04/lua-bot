const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, CommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('🙍 Get info about the server or a user!')
		.addSubcommand(subcommand =>
			subcommand
			.setName('user')
			.setDescription('🙍 Info about a user')
			.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand => 
			subcommand
			.setName('server')
			.setDescription('✉ Info about the server')),
			async execute(interaction, client){
				if(interaction.options.getSubcommand() == 'user'){

					const user = interaction.options.getUser('target');	

					const userEmbed = new MessageEmbed()
					.setColor('RANDOM')
					.setDescription('')
					.setTimestamp()
					.setFooter({
						text: `${interaction.user.username}'s requested`,
						iconURL: interaction.user.displayAvatarURL()
					});

				if(user){				
					userEmbed.setTitle(`${user.username}'s information:`)
					.setImage(user.displayAvatarURL({ dynamic:true, size: 512 }))
					.addFields(
						{name:'Username: ', value: user.tag, inline: true},						
						{name:'ID: ', value: user.id, inline: true},);
					await interaction.reply({ embeds: [userEmbed]});
				}
				else{
					userEmbed.setTitle(`${interaction.user.username}'s information:`)
					.setImage(interaction.user.displayAvatarURL({ dynamic:true, size: 512 }))
					.addFields(
						{name:'Username: ', value: interaction.user.tag, inline: true},						
						{name:'ID: ', value: interaction.user.id, inline: true},);
					await interaction.reply({ embeds: [userEmbed]});
				}
			}
			
			if(interaction.options.getSubcommand() == 'server'){
				/**
				 * @param {CommandInteraction} interaction
				 */
				const { guild } = interaction;
				const { createdTimestamp, ownerId, description, channels, emojis, stickers, members } = guild;

				const serverEmbed = new MessageEmbed()
				.setColor('RED')
				.setTitle(`${interaction.guild.name}'s information:`)
                .setThumbnail(interaction.guild.iconURL({ dynamic:true, size: 300 }))
                .addFields(
                    {
						name: "💡 | GENERAL",
						value: [
							`Name: ${guild.name}`,
							`Created: <t:${parseInt(createdTimestamp / 1000)}:R>`,
							`Owner: <@${ownerId}>`,
							`Members: ${guild.memberCount}`,
							`Description: ${description}`

						].join('\n')
					},
					{
						name: "🔔 | CHANNELS",
						value: [
							`- Text: ${channels.cache.filter((c) => c.type === "GUILD_TEXT").size}`,
							`- Voice: ${channels.cache.filter((c) => c.type === "GUILD_VOICE").size}`,
							`- Threads: ${channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD" && "GUILD_PUBLIC_THREAD" && "GUILD_PRIVATE_THREAD").size}`,
							`- Categories: ${channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}`,
							`- Stages: ${channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}`,
							`- News: ${channels.cache.filter((c) => c.type === "GUILD_NEWS").size}`,
							`Total: ${channels.cache.size}`
						].join('\n')			
					},
					{
						name: "😆 | EMOJIS & STICKERS",
						value: [
							`- Animated: ${emojis.cache.filter((e) => e.animated).size}`,
							`- Static: ${emojis.cache.filter((e) => !e.animated).size}`,
							`- Stickers: ${stickers.cache.size}`,
							`Total: ${stickers.cache.size + emojis.cache.size}`
						].join('\n')
					},
					{
						name: "✨ | NITRO STATISTICS",
						value: [
							`- Tier: ${guild.premiumTier.replace("TIER_", "").replace("NONE", "No Tier")}`,
							`- Boosts: ${guild.premiumSubscriptionCount}`,
							`- Boosters: ${members.cache.filter((m) => m.premiumSince).size}`

						].join('\n')
					}
				)
				.setFooter({text: 'Last Checked', iconURL: interaction.user.avatarURL()}).setTimestamp();
				
				await interaction.reply({embeds: [serverEmbed]})
			}else if(!interaction.options.getSubcommand() == 'server'){
				await interaction.reply('No sub command was used');
			}
		},
};