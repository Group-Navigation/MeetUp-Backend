const {gql} = require('apollo-server');

const typeDefs = gql`
    type User{
        id: ID!
        displayName: String!
        email: String!
        password: String! #temporary
        profilePic: String
        longitude: Int! #temporaries
        latitude: Int!
        archive: [Group]
        contacts: [User]
        groups: [Group]
        invitations: [Invitation]
    }

    type Group{
        name: String
        time: Int #
        longitude: Int! #temporaries
        latitude: Int!
    }

    type Message{
        sender: User
        message: String!
        timestamp: Int! #temporary
        group: Group!
    }

    type Invitation{
        sender: User!
        group: Group!
    }

    enum Status{
        ACTIVE
        INACTIVE
        IDLE
    }

    type Query{
        users: [User]!
        user(id: ID!): User
    }

    type Mutation{
        createUser(
            email: String!, 
            password: String!, 
            displayName: String!, 
            profilePic: String): Response

        deleteUser(id: ID!): Response
    }

    enum Response{
        SUCCESS
        ERROR
    }

`

module.exports = typeDefs;