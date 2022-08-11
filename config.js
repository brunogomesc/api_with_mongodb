require('dotenv').config()
module.exports = {
      connectionStringMongoDB: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@4devti-cluster-mongodb.webhntn.mongodb.net/${process.env.NAME_DATABASE}?retryWrites=true&w=majority`,
}