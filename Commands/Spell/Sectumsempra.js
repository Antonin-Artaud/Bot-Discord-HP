module.exports = {
    name: 'sectumsempra', // Minuscule
	description: 'Sectumsempra',
	execute(message, args) {
        var member = message.mentions.members.first();
        var tauxDeChance = Math.floor(Math.random() * 9);
        console.log(tauxDeChance + member.id);
		(tauxDeChance < 6) ? message.reply('_Lance le sort sectumsempra sur_ ' + '_<@' + member.id + '>_, ' + '_<@' + member.id + '> ' + 'commence à se vider de son sang_') : message.reply('_a loupé son sort_');
    },
};