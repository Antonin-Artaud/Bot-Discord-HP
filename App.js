const fs = require('fs');
const Discord = require('discord.js');

const {prefix, token, warydra} = require('./config.json');
const { Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const currency = new Discord.Collection();

Reflect.defineProperty(currency, 'add', {
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

client.once('ready', async () => {
    const storedBalances = await Users.findAll();
    storedBalances.forEach(b => currency.set(b.user_id, b));
	console.log(`Logged in as ${client.user.tag}!`);
});

const commandSpell = fs.readdirSync('./commands/Spell').filter(file => file.endsWith('.js'));

for (const file of commandSpell) {
 	const command = require(`./commands/Spell/${file}`)
    client.commands.set(command.name, command);
};

client.on('message', function(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

 	const args = message.content.slice(prefix.length).split(/ +/);
 	const commandName = args.shift().toLowerCase();

 	if (!client.commands.has(commandName)) return;
        const command = client.commands.get(commandName);
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command! Please contact Warydra#1969');
    }
});

client.on('message', async message => {
	if (message.author.bot) return;
	currency.add(message.author.id, 1);

	if (!message.content.startsWith(prefix)) return;
	const input = message.content.slice(prefix.length).trim();
	if (!input.length) return;
	const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

	if (command === 'balance') {
        const target = message.mentions.users.first() || message.author;
        return message.reply(`${target.tag} possède ${currency.getBalance(target.id)}` + ` gallions`)
	} else if (command === 'inventory') {
        const target = message.mentions.users.first() || message.author;
        const user = await Users.findOne({ where: { user_id: target.id } });
        const items = await user.getItems();
        
        if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
        return message.channel.send(items.map(item => `${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name} ${i.item.desc}`).join(', ')}`), {code: true});
	} else if (command === 'transfer') {
        const currentAmount = currency.getBalance(message.author.id);
        const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
        const transferTarget = message.mentions.users.first();
        
        if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
        if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
        if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);
        
        currency.add(message.author.id, -transferAmount);
        currency.add(transferTarget.id, transferAmount);
        
        return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
	} else if (command === 'buy') {
        const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
        if (!item) return message.channel.send(`That item doesn't exist.`);
        if (item.cost > currency.getBalance(message.author.id)) {
            return message.channel.send(`You currently have ${currency.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
        }
        
        const user = await Users.findOne({ where: { user_id: message.author.id } });
        currency.add(message.author.id, -item.cost);
        await user.addItem(item);
        
        message.channel.send(`You've bought: ${item.name}.`);
	} else if (command === 'shop') {
        const items = await CurrencyShop.findAll();
        return message.channel.send(items.map(item => `${item.name}: ${item.desc} -> ${item.cost}💰`).join('\n'), { code: true });
    } else if( command === 'spam') {
        for (let index = 0; index < 100; index++) {
            var member = message.mentions.members.first();
            message.channel.send('<@' + member.id + '>');
        }/*
        const admin = guild.member(message.author);
        if (admin) {
            message.reply("Welcome administrator !");
        } else {
            message.reply("This command has been disabled by the administrator, please try again later !");
        }*/
    }
});

client.login(token);