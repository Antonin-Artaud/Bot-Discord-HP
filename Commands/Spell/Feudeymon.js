module.exports = {
	name: 'feudeymon', // Minuscule
	description: 'Feudeymon',
	execute(message, args) {
        var tauxDeChance = Math.floor(Math.random() * 9);
        console.log(tauxDeChance);
		(tauxDeChance < 6) ? message.reply(('_Lance le sortilège_ '/* + (message.content).substr(1) +*/ +' _avec succès_') + '\n _D\'immense flammes verte apparaissent_') : message.reply('_a loupé son sort_');
	},
};