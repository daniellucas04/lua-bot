const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports ={
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('👮 Ban a member from your server.')
    .addUserOption(option =>
        option.setName('user')
        .setDescription('The member you want to ban.')
        .setRequired(true))
    .addStringOption(option => 
        option.setName('reason')
        .setDescription('The reason for the ban.')),
        permissions: [ Permissions.FLAGS.BAN_MEMBERS ],
        
    async execute(interaction){
        const banUser = interaction.options.getUser('user');
        const banMember = interaction.guild.members.fetch(banUser.id);
        if(!banMember) return await interaction.reply({ content: `This user is no longer within the server.`, ephemeral: true })
        
        let reason = interaction.options.getString('reason');
        if(!reason) reason = 'No reason provided';

        await banMember.send({ content: `You have been banned from ${interaction.guild.name}\nReason: ${reason}`})
            .catch(err => console.log("The user that was being banned did not recieve the message. Are their DM's off?"));

        await banMember.ban({ reason: reason })
            .catch(err => console.error(err));
    
        await interaction.reply({ content: `${banUser.username} has been banned!\nReason: ${reason}`});

    },
};
