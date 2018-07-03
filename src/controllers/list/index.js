import Joi from 'joi';

import AddUser from './src/addUser';

exports.plugin = {register, name: 'list'};

async function register(plugin) {
	await plugin.route([
		{
			path: '/v1/list/user',
			method: 'POST',
			handler: AddUser,
			config: {
				validate: {
					payload: Joi.object().keys({
						email: Joi.string().required(),
						region: Joi.string().required(),
						listId: Joi.string().required(),
						apiKey: Joi.string().required(),
						status: Joi.string().default('subscribed')
					})
				}
			}
		}
	]);
}
