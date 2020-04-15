module.exports = {
    name: 'finite', 
	description: 'Finite',
	execute(message, args) {
        var member = message.mentions.members.first();
        message.reply('_lance le sort finite sur_ ' +' _<@' + member.id + '>_');
    },
};