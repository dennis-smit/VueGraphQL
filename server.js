const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });
const User = require('./models/User');
const Post = require('./models/Post');

mongoose
    .set('useCreateIndex', true)
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

const typeDefs = gql`
    type Todo {
        task: String
        completed: Boolean
    }

    type Query {
        getTodos: [Todo]
    }
`;

const server = new ApolloServer({
    typeDefs,
    context: {
        User,
        Post
    }
});

server.listen().then(({ url }) => {
    console.log(`server listening on ${url}`);
});
