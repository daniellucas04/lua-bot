const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports ={   
    data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeout a member you want.')
    .addUserOption(option =>
        option.setName('user')
        .setDescription('Select the member you want timeout.')
        .setRequired(true))
    .addNumberOption(option =>
        option.setName('time')
        .setDescription('Time for timeout.')
        .addChoice('1 minute', 60 * 1000)
        .addChoice('5 minutes', 5 * 60 * 1000)
        .addChoice('10 minutes', 10 * 60 * 1000)
        .addChoice('30 minutes', 30 * 60 * 1000)
        .addChoice('1 hour', 60 * 60 * 1000)
        .addChoice('1 day', 24 * 60 * 60 * 1000)
        .addChoice('1 week', 7 * 24 * 60 * 60 * 1000)
        .setRequired(true))
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('The reason for timeout.')),
    permissions: [ Permissions.FLAGS.MODERATE_MEMBERS ],

    async execute(interaction){
        const taggedUser = interaction.options.getUser('user');
        const time = interaction.options.getNumber('time');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        const member = await interaction.guild.members.fetch(taggedUser.id);

        const embed = new MessageEmbed()
        .setColor('RANDOM');

        if(member.isCommunicationDisabled()){
            embed.setTitle('This member is already timeout.')
            .setColor('YELLOW');
            interaction.reply({ embeds: [embed]});
        }else{
            await member.timeout(time, reason);

            embed.setTitle(`${taggedUser.username} has been timeout.`)
            .setDescription(`Time: ${time}\n Reason: ${reason}`)
            .setFooter({ text: `By ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})
            .setTimestamp();
            interaction.reply({ embeds: [embed] });
        };
    }
};