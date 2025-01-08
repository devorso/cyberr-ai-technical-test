import express from "express";
import taskRoutes from "./routes/taskRoutes"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import resolvers from "./graphql/resolvers"
import typeDefs from "./graphql/typeDefs"
import graphqlHttp, { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql";

const app = express()


app.use(express.json())

app.use("/task", taskRoutes)


var schema = buildSchema(typeDefs)




// Create and use the GraphQL handler.
app.all(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true
    })
)

// const server = new ApolloServer({resolvers, typeDefs,})

// startStandaloneServer(server, {
//     listen:{
//         port: 5000
//     }
// })

app.listen(3010, () => {
    console.log("API Started")
})