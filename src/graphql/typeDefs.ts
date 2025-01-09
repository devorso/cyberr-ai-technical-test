
export default `

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

    
    addTask(title:String!, description: String!, status: String!): Task!
    updateTask(id:ID!,title:String!, description: String!, status: String!): Task!
    deleteTask(id: ID!): Task!

    }
`