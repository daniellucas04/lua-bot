module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isCommand()) return;	

	const command = client.commands.get(interaction.commandName);

	if (!command) return;
	try {

		if(command.permissions && command.permissions.length > 0){
			if(!interaction.member.permissions.has(command.permissions)) return await interaction.reply({ content: 'You do not have permission to use this command.',  ephemeral: true});
		}

		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: "⚠ Ocorreu um erro ao executar esse comando. ⚠\
											\n Erros de administração 👮‍♂️ \
											\n - A hierarquia de cargo não permite que um membro sofra uma ação. \
											\n Erros não explicados ❔ \
											\n - Por favor reporte o erro para o suporte - https://discord.gg/ys22FDkv35 (MOON SERVER)", ephemeral: true });
	}
	},
};