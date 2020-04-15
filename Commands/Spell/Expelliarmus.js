module.exports = {
	name: 'expelliarmus', // Minuscule
	description: 'Expelliarmus',
	execute(message, args) {
        var tauxDeChance = Math.floor(Math.random() * 9);
        console.log(tauxDeChance);
		(tauxDeChance < 6) ? message.reply('_Lance le sortilège_ ' + (message.content).substr(1) + ' _avec succès_') : message.reply('_a loupé son sort_');
	},
};