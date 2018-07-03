import axios from 'axios';
import Boom from 'boom';

module.exports = async req => {
	const {region, listId, apiKey, email, status} = req.payload;
	const url = `https://${region}.api.mailchimp.com/3.0/lists/${listId}/members`;

	const data = await axios({
		method: 'post',
		url,
		headers: {
			Authorization: `apikey ${apiKey}`,
			'Content-Type': 'application/json'
		},
		data: {
			email_address: email, // eslint-disable-line camelcase
			status
		}
	}).then(res => {
		return res.data;
	}).catch(e => {
		const {data} = e.response;
		const {detail} = data;

		if (detail.includes('is already a list member')) {
			return `${email} is already a member`;
		}

		throw new Boom(data.detail, {
			statusCode: data.status
		});
	});

	return {
		success: true,
		data
	};
};
