import { eq } from "drizzle-orm";
import { getDatabaseConnection } from "../db/config";
import { usersTable } from "../db/schema";
import { generateAccessToken } from "../utils/jwt";


export interface User {
    username: string;
    password: string;
}
const db = getDatabaseConnection()
export const loginUser = async(username: string, password: string) => {

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

export const registerUser = async (username: string, password: string) => {
    const hash = await Bun.password.hash(password);
    return await db.insert(usersTable).values({
        username,
        password: hash
    }).returning()
}