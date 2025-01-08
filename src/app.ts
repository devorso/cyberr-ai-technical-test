import express from "express";
import taskRoutes from "./routes/taskRoutes"
import resolvers from "./graphql/resolvers"
import typeDefs from "./graphql/typeDefs"
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql";
import cors from "cors";

const app = express()


app.use(cors())
app.use(express.json())

app.use("/task", taskRoutes)


var schema = buildSchema(typeDefs)


app.all(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true
    })
)

app.listen(3010, () => {
    console.log("API Started")
})