import { gql } from "apollo-server-express";

export default gql`

 type Task {
    id: ID!
title: String!
description: String!
status: String!
    }
    type Query {
      task(id: ID!): Task
      tasks: [Task!]!
    }

    type Mutation {

    
    addTask(title:String!, description: String!): Task!
    updateTask(id:ID!,title:String!, description: String!, status: String!): Task!
    deleteTask(id: ID!): Task!
    loginUser(username: String!, password: String!): String!
    registerUser(username: String!, password: String!): String!

    }
`