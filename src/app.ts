import express from "express";
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql";
import cors from "cors";
import {ApolloServer} from "apollo-server-express"
import taskRoutes from "./routes/taskRoutes"
import authRoutes from "./routes/authRoutes"
import resolvers from "./graphql/resolvers"
import typeDefs from "./graphql/typeDefs"
import { authenticateToken } from "./utils/jwt";
require("dotenv").config()

const app = express()


app.use(cors())
app.use(express.json())
app.use("/auth",authRoutes)


const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection:true,
    context: ({req}) => {
      
       return {user: authenticateToken(req,null,null)}
    }
 
  });
  
server.start().then((v) => {
    server.applyMiddleware({ app, path: "/graphql" });
})

app.use("/task", authenticateToken, taskRoutes)






app.listen(3011, () => {
    console.log("API Started")
})