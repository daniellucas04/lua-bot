const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports ={
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('👮 Unban a user from your server') 
    .addStringOption(option =>
        option.setName('user')
        .setDescription('ID from the user you want to unban.')
        .setRequired(true)),
    permissions: [ Permissions.FLAGS.BAN_MEMBERS ],

    execute(interaction){
        const id = interaction.options.getString('user');
        const deleteMessage = 3000;

        const embed = new MessageEmbed()
        .setColor('RANDOM');

        interaction.guild.members.unban(id).then((user) =>{
            embed.setTitle(`${user.username} has been unbanned!`)
            .setFooter({ text: `By ${interaction.user.username}`, iconURL: interaction.user.avatarURL()});
            interaction.reply({ embeds: [embed]});
        }).catch(() =>{
            embed.setDescription('Please specify a valid user to unban');
            interaction.reply({ embeds: [embed]}).then(() =>{
                setTimeout(() =>{
                    interaction.deleteReply();
                }, deleteMessage);
            });
        });
    },
};