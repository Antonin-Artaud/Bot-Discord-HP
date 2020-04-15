module.exports = {
    name: 'bombarda maxima', // Minuscule
	description: 'Bombarda Maxima',
	execute(message, args) {
        var tauxDeChance = Math.floor(Math.random() * 9);
        console.log(tauxDeChance);
		(tauxDeChance < 4) ? message.reply('_Lance le sortilège_ ' + (message.content).substr(1) + ' _avec succès_') : message.reply('_a loupé son sort_');
    },
};