const Clarifai = require('clarifai')
const app = new Clarifai.App({
 apiKey: '0bc52d5a64ab421c97190dbe0639564a'
});


const handleApiCall = (req, res) => {
	const { input } = req.body;
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        input)
    .then(data => {
    	res.json(data)
    })
    .catch(err => res.status(400).json( { error: err} ))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
	  .where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	if(entries.length) {
	  	res.json(entries[0])
		} else {
			res.status(400).json('Unable to get entries.')
		}})
	  .catch(err => res.status(400).json('Unable to get entries.'))
	}



module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};