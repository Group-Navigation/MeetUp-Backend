const { DataSource } = require('apollo-datasource');

class Database extends DataSource{
    constructor(db){
        super();
        this.User = db.User;
        this.Group = db.Group;
        this.Message = db.Message;
        this.Invitation = db.Invitation;
    }

    async createUser({email, password, displayName, profilePic=null}) {
        let user = this.User.create({email,password,displayName,profilePic});
        await user.addUser(1);
        return true;
    }

    async deleteUser({id}) {
        await this.User.destroy({
            where: {Id: id}
        });
        
        return true;
    }

    async allUsers() {
        let users = await this.User.findAll();
        return users;
    }

    async findUser({id}) {
        let user = await this.User.findByPk(id);
        return user;
    }
}

module.exports = Database;