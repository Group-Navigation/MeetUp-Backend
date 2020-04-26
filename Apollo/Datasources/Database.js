const { DataSource } = require('apollo-datasource');

class Database extends DataSource{
    constructor(db){
        super();
        this.User = db.User;
        this.Group = db.Group;
        this.Message = db.Message;
        this.Invitation = db.Invitation;
    }

    async allUsers() {
            let users = await this.User.findAll();
            return users;
    }

    async findUser(id) {
        let user = await this.User.findByPk(id);
        return user;
    }

    async findGroup(id,type=false){
        if(!type){
            let response = await this.Group.findByPk(id);
            let {name, long,lat} = response.dataValues;
            let groupObject = {name, longitude:long, latitude:lat, id};
            return groupObject;
        }
        else
        {
            let groupUsers = await this.Group.findAll({
                where: {id: id},
                attributes: ['name', 'long', 'lat'],
                include: [{
                    model: this.User,
                    attributes: ['displayName', 'long', 'lat','profilePic', 'id']
                }]
            });
            return groupUsers;
        }
    }

    async deleteGroup(id){
        let res = await this.Group.destroy({
            where: {id : id}
        });
        console.log(res);
        return res;
    }

    async addToGroup(userId,groupId){
        let group = await this.Group.findByPk(groupId);
        let user = await this.User.findByPk(userId);

        await group.addUser(user);
        return group != null && user != null;
    }

    async removeFromUser(invId,userId){
        let inv = await this.Invitation.findByPk(invId);
        let user = await this.User.findByPk(userId);

        await inv.removeUser(user);
        return inv!= null && user != null;
    }

    async createGroup(name, lat, long, userIds){
        let group = await this.Group.create({name,lat,long});

        for(let i = 0; i < userIds.length; i++)
        {
            let user = await this.User.findByPk(userIds[i]);
            await group.addUser(user);
        }
        return group != null;
    }

    async createInvitation(sender,group){
        let inv = await this.Invitation.create({sender,group});
        return inv != null;
    }
}

module.exports = Database;