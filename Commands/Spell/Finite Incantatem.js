module.exports = {
	name: 'finite incantatem', // Minuscule
	description: 'Finite Incantatem',
	execute(message, args) {
        var member = message.mentions.members.first();
        message.reply('_lance le sort finite incantatem sur_ ' +'_<@' + member.id + '>_');	},
};