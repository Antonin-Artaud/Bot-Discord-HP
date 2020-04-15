const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = sequelize.import('models/CurrencyShop');
sequelize.import('models/Users');
sequelize.import('models/UserItems');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Baguette de Voldemort', cost: 1, desc: 'Baguette en bois d\'If avec une plume de phénix'}),
		CurrencyShop.upsert({ name: 'Baguette de Harry Potter', cost: 2, desc: 'Baguette en bois d\'houx avec une plume de phénix' }),
		CurrencyShop.upsert({ name: 'Baguette de Hermione Granger', cost: 2, desc: 'Baguette en bois de vigne, avec ventricule de dragon' }),
		CurrencyShop.upsert({ name: 'Baguette de Ron Wheasley', cost: 2, desc: 'Baguette en bois de saule avec un crin de licorne' }),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);