const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.MONGO_URI;

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Hello World!!!!!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//Connect to Mongodb and Apollo
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to MongoDB");
    return server.listen({ port: 5000 });
  })
  .then((res) => console.log(`Server running at ${res.url}`));
