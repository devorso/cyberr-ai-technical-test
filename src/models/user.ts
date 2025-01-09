import { eq } from "drizzle-orm";
import { getDatabaseConnection } from "../db/config";
import { usersTable } from "../db/schema";
import { generateAccessToken } from "../utils/jwt";


export interface User {
    username: string;
    password: string;
}
const db = getDatabaseConnection()
export const loginUserDatabase = async(username: string, password: string) => {

    let user = await db.select().from(usersTable).where(eq(usersTable.username,username));
    if (!user) {
        throw new Error("Invalid credentials")
    }
    if (!user || !user[0]) {
        throw new Error("Invalid credentials")
    }

        let passwordDb = user[0].password;
        const isMatch = await Bun.password.verify(password, passwordDb);
        if (!isMatch) {
            throw new Error("Invalid credentials")
        }
 
        return generateAccessToken(username);
}

export const registerUserDatabase = async (username: string, password: string) => {
    const hash = await Bun.password.hash(password);
     await db.insert(usersTable).values({
        username,
        password: hash
    }).returning()
    return "OK"
}