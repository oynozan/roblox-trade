import * as jose from "jose";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

export class Encryption {
    static createPassword(p: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt
                .genSalt(10)
                .then(salt => {
                    return bcrypt.hash(p, salt);
                })
                .then(hash => {
                    return resolve(hash);
                })
                .catch(e => {
                    console.log(e);
                    reject(e);
                });
        });
    }

    static async comparePasswords(hash: string, p: string): Promise<boolean> {
        const result = await bcrypt.compare(p, hash);
        return result;
    }

    /**
     * Generates a JWT token
     * @param {Record<string, any>} payload - The payload to be encoded in the JWT
     * @param {string} expire - The expiration time for the JWT
     * @returns {string} JWT token
     */
    static generateJwt(payload: Record<string, any>, expire: string = "90d"): string {
        return jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: expire,
        });
    }

    /**
     * Decodes the JWT token
     * @param {string} token - JWT token
     * @returns {JwtPayload} Decoded JWT payload
     */
    static async decodeJwt(token: string): Promise<JwtPayload> {
        const decoded = await jose.jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET!)
        ) as JwtPayload;
        return decoded.payload;
    }

    /**
     * This is a middleware to get user data from "access-token"
     * It moves user data from database to next request. If anything is invalid,
     * this method throws an error.
     */
    static async verifyJwt(
        req: NextApiRequest | NextRequest,
        res: NextApiResponse | NextResponse
    ): Promise<NextApiResponse | NextResponse | void> {
        try {
            const token =
                typeof req.cookies.get === "function" ? req.cookies.get("access-token")?.value : undefined;

            if (!token) {
                return new NextResponse(JSON.stringify({ message: "Please log in." }), {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                });
            }

            return new Promise(resolve => {
                jwt.verify(
                    token,
                    process.env.JWT_SECRET!,
                    {},
                    (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
                        if (!decoded || typeof decoded === "string") {
                            if (err) console.error(err);
                            resolve(
                                new NextResponse(JSON.stringify({ message: "Your account is invalid" }), {
                                    status: 403,
                                    headers: { "Content-Type": "application/json" },
                                })
                            );
                            return;
                        }

                        resolve();
                    }
                );
            });
        } catch (e) {
            console.error(e);
            return new NextResponse(JSON.stringify({ message: "An error occurred." }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    }
}
