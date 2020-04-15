module.export = {
    name: 'protego maxima',
    description: 'Protego maxima',
	execute(message, args) {
        var tauxDeChance = Math.floor(Math.random() * 9);
        console.log(tauxDeChance);
		(tauxDeChance < 5) ? message.reply('_Lance le sortilège_ ' + (message.content).substr(1) + ' _avec succès_') : message.reply('_a loupé son sort_');
    },
};