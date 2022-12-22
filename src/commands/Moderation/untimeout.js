const { SlashCommandBuilder, EmbedAssertions } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports ={   
    data: new SlashCommandBuilder()
    .setName('untimeout')
    .setDescription('Removes a member from timeout.')
    .addUserOption(option =>
        option.setName('user')
        .setDescription('Select the member you want to remove from timeout.')
        .setRequired(true)),
    permissions: [ Permissions.FLAGS.MODERATE_MEMBERS ],

    async execute(interaction){
        const taggedUser = interaction.options.getUser('user');
        const member = await interaction.guild.members.fetch(taggedUser.id);

        const embed = new MessageEmbed()
        .setColor('RANDOM');

        if(!member.isCommunicationDisabled()){
            embed.setTitle('This member is not timeout.')
            .setColor('YELLOW');
            interaction.reply({ embeds: [embed], ephemeral: true });
        }else{
            await member.timeout(null);
        
            embed.setTitle(`${taggedUser.username} has been removed from timeout.`)
            .setFooter({ text: `By ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})
            .setTimestamp();
    
            interaction.reply({ embeds: [embed] });
        };
    }
};