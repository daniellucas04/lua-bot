module.exports ={
    name: 'ready',
    once: true,
    async execute(client){
        console.log(`🤖 The bot ${client.user.username} is ready to use.`);
        client.user.setPresence({
            activities: [{
                name: '/help'
            }],
            status: 'dnd',
        });
    },
};