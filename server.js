var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var users = [{
        id: 1,
        name: 'Brian',
        age: '21',
        gender: 'M'
    },
    {
        id: 2,
        name: 'Kim',
        age: '22',
        gender: 'M'
    },
    {
        id: 3,
        name: 'Joseph',
        age: '23',
        gender: 'M'
    },
    {
        id: 3,
        name: 'Faith',
        age: '23',
        gender: 'F'
    },
    {
        id: 5,
        name: 'Joy',
        age: '25',
        gender: 'F'
    }
]

// Initialize a GraphQL schema
var schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(gender: String): [Person]
  },
  type Person {
    id: Int
    name: String
    age: Int
    gender: String    
  }
`);

var getUser = function (args) {
    var userID = args.id;
    return users.filter(user => {
        return user.id == userID;
    })[0];
}

var retrieveUsers = function (args) {
    if (args.gender) {
        var gender = args.gender;
        return users.filter(user => user.gender === gender);
    } else {
        return users;
    }
}

// Root resolver
var root = {
    user: getUser, // Resolver function to return user with specific id
    users: retrieveUsers
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema, // Must be provided
    rootValue: root,
    graphiql: true, // Enable GraphiQL when server endpoint is accessed in browser
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));