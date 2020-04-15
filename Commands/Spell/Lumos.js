module.exports = {
	name: 'lumos',
	cooldown: 5,
	description: 'Lumos',
	execute(message, args) {
        message.reply('_lance le sort ' + (message.content).substr(1) + ' avec succès_');
    },
};