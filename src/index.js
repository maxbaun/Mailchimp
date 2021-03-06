import Hapi from 'hapi';

const port = process.env.PORT || 9001;

// Const isDev = process.env.NODE_ENV === 'development';

const Server = new Hapi.Server({
	port,
	router: {stripTrailingSlash: true},
	routes: {
		cors: {
			origin: [process.env.ORGINS || '*']
		},
		validate: {
			failAction: async (request, h, err) => {
				if (process.env.ENV !== 'production') {
					console.error(err);
				}

				throw err;
			}
		}
	}
});

async function beginServer() {
	try {
		await Server.register([require('./health'), require('./controllers/list')]);

		console.log(`Server is running on port ${port}`);

		console.log(Server.info);

		await Server.start();
	} catch (err) {
		console.log(err);
	}
}

beginServer();

module.exports = Server;
