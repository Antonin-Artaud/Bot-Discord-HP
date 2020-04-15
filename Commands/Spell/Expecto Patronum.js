module.exports = {
    name: 'expecto patronum', // Minuscule
	description: 'Expecto Patronum',
	execute(message, args) {
        var tauxDeChance = Math.floor(Math.random() * 9);
        console.log( message + tauxDeChance);
		(tauxDeChance < 6) ? message.reply('_Lance le sortilège_ ' + (message.content).substr(1) + ' _avec succès_') : message.reply('_a loupé son sort_');
    },
};