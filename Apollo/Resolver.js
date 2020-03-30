module.exports = {
    Query: {
        users:(_,__,{dataSources}) =>
            dataSources.Database.allUsers(),
        user:(_,{id},{dataSources}) =>
            dataSources.Database.findUser(id)
    },

    Mutation: {
        createUser:(_,{email,password,disaplyName,profilePic},{dataSources}) => {
            dataSources.Database.createUser({email,password,displayName,profilePic})
            return {
                sucess: true, //filler
                results: true
            }
        },
        deleteUser:(_,{id},{dataSources})=>{
            dataSources.Database.deleteUser({id})
            return {
                sucess: true, //filter
                results: true
            }
        }
    }
}