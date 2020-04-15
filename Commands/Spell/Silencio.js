module.exports = {
	name: 'silencio',
	description: 'Silencio',
	execute(message, args) {
        message.reply('_lance le sort ' + (message.content).substr(1) + ' avec succès_');
    },
};