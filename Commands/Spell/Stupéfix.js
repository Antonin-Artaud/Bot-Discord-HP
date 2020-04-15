module.exports = {
	name: 'stupéfix', // Minuscule
	description: 'Stupéfix',
	execute(message, args) {
		var member = message.mentions.members.first();
		var tauxDeChance = Math.floor(Math.random() * 9);
		if(member.id == null){
			return message.reply('veuillez cibler une personne.');
		} else {
			(tauxDeChance < 6) ? message.reply('_Lance le sort stupéfix sur_ ' + '<@' + member.id + '>') : message.reply('_a loupé son sort_');
		}
	},
};