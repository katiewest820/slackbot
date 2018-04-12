
exports.verifyToken = (req, res) => {
	console.log('hello from get')
	console.log(req.body)
	
	let returnVal = req.body.test;
	res.status(200).send(returnVal)
}