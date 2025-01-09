import express from "express";
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql";
import cors from "cors";
import {expressjwt as jwt} from "express-jwt"
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
var schema = buildSchema(typeDefs)

app.all(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,

        graphiql: true,
        context: () => authenticateToken(req,null,null)
        
    }))

app.use(authenticateToken)
app.use("/task", taskRoutes)






app.listen(3010, () => {
    console.log("API Started")
})