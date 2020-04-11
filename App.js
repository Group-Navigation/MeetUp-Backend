const {ApolloServer} = require('apollo-server-express');
const app = require("express")();
const PORT = process.env.PORT || 4000;

const database = require('./Database').database;
const db = require('./Database').models;
const seed = require("./Database/Data/Seed");

const typeDefs = require("./Apollo/Schema");
const resolvers = require("./Apollo/Resolver");
const Database = require("./Apollo/Datasources/Database");
const GoogleAPI = require("./Apollo/Datasources/Google");

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({   //Parenthesis very important!
        Database: new Database(db),
        Google: new GoogleAPI()
    })
});

const cors = require('cors');
const bodyParser = require("body-parser");

const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);

const groupH = require('./Socket/GroupHandler');
const groupHandler = new groupH;
module.exports = groupHandler;

database.sync({force:true}).then(async() =>{
//we put all necessary code in here so that database can finish syncing before we start the
//server & sockets & perform async functions

    //repopulate database
    await seed();

    //Apply Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    
    //combine apollo with express
    apollo.applyMiddleware({app});
    
    server.listen(PORT);
    console.log(`Server ready at http://localhost:4000${apollo.graphqlPath}`);

    require('./Socket')(io);
    console.log("Sockets are online")
}); 