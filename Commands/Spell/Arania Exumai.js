module.exports = {
	name: 'arania-exumai',
	description: 'Arania Exumai',
	execute(message, args) {
        message.reply('_lance le sort ' + (message.content).substr(1) + ' avec succès_');
    },
};