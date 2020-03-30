const {ApolloServer} = require('apollo-server-express');
const PORT = process.env.PORT || 4000;
const app = require("express")();
const bodyParser = require("body-parser");

const {db:database} = require('./Database/Associate');
const seed = require("./Database/Data/Seed");

const typeDefs = require("./Apollo/Schema");
const resolvers = require("./Apollo/Resolver");
const {createDB} = require('./Database/Create');
const Database = require("./Apollo/Datasources/Database");
const db = createDB();
const cors = require('cors');

const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);

const apollo = new ApolloServer({
    // context: ()=>{

    // },
    typeDefs,
    resolvers,
    dataSources: () => ({   //Parenthesis very important!
        Database: new Database(db)
    })
});

const groupH = require('./Socket/GroupHandler');
const groupHandler = new groupH;
module.exports = groupHandler;

database.sync({force:true}).then(async() =>{
//we put all necessary code in here so that database can finish syncing before we start the
//server & sockets
    await seed();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    
    apollo.applyMiddleware({app});
    
    server.listen(PORT);
    console.log(`Server ready at http://localhost:4000${apollo.graphqlPath}`);

    require('./Socket')(io);
    console.log("Sockets are online")
}); 