const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstname: String
    lastname: String
    email: String
    password: String
    mtgCard: [MTGCard] 
  }

  type MTGCard{
    name: String
    cmc: Int
    colors: [String]
    colorIdentity: [String]
    type: String
    types: [String]
    subtypes: [String]
    set: String
    setName: String
    number: String
    imageUrl: String
    rarity: String
    mvId: String
    quantity: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    
  }

`;

module.exports = typeDefs;
