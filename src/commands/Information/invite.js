const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports ={
    data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('💌 Get link to invite me!'),
    execute(interaction){
        const embed = new MessageEmbed()
        .setColor('WHITE')
        .setTitle('Take your link.')
        
        const row = new MessageActionRow().addComponents(
            new MessageButton().setLabel("Invite me!").setURL('https://discord.com/api/oauth2/authorize?client_id=847921540284284928&permissions=1110517509239&scope=bot%20applications.commands').setStyle('LINK')
        )

        interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
}