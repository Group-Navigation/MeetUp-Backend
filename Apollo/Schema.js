const {gql} = require('apollo-server');

const typeDefs = gql`
    type User{
        id: ID!
        displayName: String!
        email: String
        password: String
        profilePic: String!
        longitude: Float! 
        latitude: Float!
        archive: [Group]
        contacts: [User]
        groups: [Group]
        invitations: [Invitation]
    }

    type Group{
        name: String!
        time: Int #
        longitude: Float! #temporaries
        latitude: Float!
        users: [User]!
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
        recievers: [User]!
    }

    type Path{
        path: [[Float]]!
        eta: String!
        user: User!
    }

    enum Status{
        ACTIVE
        INACTIVE
        IDLE
    }

    type Query{
        users: [User!]
        user(id: ID!): User
        group(id: ID!): Group
        pathsOfGroup(id: ID!): [Path]!
    }

    type Mutation{
        createGroup(name: String!, address: String!, userIds: [ID]!):Boolean
        deleteGroup(id: ID!):Boolean
        addToGroup(userId: ID!, groupId: ID!):Boolean    #adds a specific user to a specific group
        
        addInvitation(sender: String!, group: String!):Boolean   
        removeFromUser(invId: ID!, userId: ID!):Boolean   #deletes a specific invitation from a specific user
    }

`

module.exports = typeDefs;