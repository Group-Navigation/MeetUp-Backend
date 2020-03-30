module.exports.createDB = () => {
	const {
		db,
		Users: User,
		Groups: Group,
		Invitations: Invitation,
		Messages: Message
	} = require("./Associate");

	db.authenticate().then(() => {
		console.log("Connected to Postgres Database");
	})
	.catch(err => {
		console.log("Error Connecting to Postgres Database");
		console.error(err);
	});

	return { User, Group, Invitation, Message };
};