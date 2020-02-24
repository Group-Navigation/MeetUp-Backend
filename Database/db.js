const MongoClient = require('mongodb').MongoClient;

var database; 
//creating connection to the database with user:admin and pass:root
const uri = "mongodb+srv://admin:root@database-ofryg.mongodb.net/test?retryWrites=true&w=majority";

const connect = async (callback) => {
  try{
      MongoClient.connect(uri, (err,client) =>{
        database = client.db("users");  //used to store a reference to a singluar database instance so that
        console.log("database is running!");
        return callback(err); //multiple connections are no longer needed for crud operations
      })
  }
  catch(err)
  {
      console.log(err);
  }
}

const get = () => {return database;}

const disconnect = () => {database.close();

}
module.exports = {connect,get,disconnect};
