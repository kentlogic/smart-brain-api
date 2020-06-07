const handleProfileGet = (req, res) => {
	const { id } = req.params;
	db.select('*').from('users').where({ id })
		.then(user => {
			if(user.length) {
				res.json(user[0])
			} else {
				res.json({ code: 404, message: 'User not found'})
			}
		}).catch(err =>
			res.json({ code: 404, message: 'Invalid parameter'})
		)
	}



module.exports = {
	handleProfileGet: handleProfileGet
};