const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {  
		data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('❔ Show the bot commands'),

        async execute (interaction, client){
            const embed = new MessageEmbed()
            .setColor('PURPLE')
            .setTitle(`Commands from ${client.user.username}`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                {
                    name:'⚠ | ALERT',
                    value: "This bot was created in order to learn, uses slash commands and doesn't need a conventional prefix like '!'\n\n",
                },
                {
                    name: '👮 | MODERATION',
                    value:  "- Ban: a member from your server. \n- Unban: Unban a user from your server.\n- Kick: member from your server.\n- Clear: messages from a channel or member.\n- Lock: Disable the @everyone to send messages in a specific channel\n- Unlock: Enable @everyone to send messages in a specific channel\n\n",
                },
                {
                    name: '❓ | INFORMATION',
                    value: "*Type /info and two options will appear.*\n- Info user: Show information about you or a member.\n- Info server: Show information about the server.\n- Invite: To invite me to your server just click the button on my profile! But if you prefer use /invite to get my link.\n- Help: Show this message.\n\n",
                }
            )
            .setFooter({ text: `${interaction.user.username}'s requested`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true} );
        }
};