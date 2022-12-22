const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports ={
    data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Im gonna echo what you want.')
    .addStringOption(option =>
        option.setName('message')
        .setDescription('The message you want echo.')
        .setRequired(true)),

    execute(interaction){
        const sendMessage = interaction.options.getString('message');

        const sendEmbed = new MessageEmbed()
        .setColor('WHITE')
        .setTitle(`${sendMessage}`)
        interaction.reply({ embeds: [sendEmbed] });
    },
};