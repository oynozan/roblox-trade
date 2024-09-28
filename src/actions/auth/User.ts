"use server";

import { cookies } from "next/headers";

import MongoConnect from "@/lib/db";
import { Encryption } from "@/lib/encryption";
import userDB, { IUser } from "@/models/User";

interface IUserTidier {
    id: string;
    username: string;
    email: string;
    activated: boolean;
    affiliateCode: string;
    referral: string;
    avatar: string;
    registerDate: number;
    balance: number;
}

export async function GetUserByCookie() {
    const userCookie = cookies().get("access-token")?.value;
    if (!userCookie) return null;

    let decryptedCookie = await Encryption.decodeJwt(userCookie);
    if (!decryptedCookie?.id) return null;

    const user: IUserTidier | null = await GetUserByID(decryptedCookie.id);
    if (!user?.id) return null;

    return user;
}

export async function GetUserByID(id: string) {
    await MongoConnect();

    const user: IUser | null = await userDB.findById(id);
    if (!user) return null;

    return UserTidier(user);
}

export async function GetUserByEmail(email: string) {
    await MongoConnect();

    const user: IUser | null = await userDB.findOne({ email });
    if (!user) return null;

    user["id"] = user["_id"] as string;
    delete user!["_id"];

    return UserTidier(user);
}

export async function GetPublicUserByUsername(username: string) {
    await MongoConnect();

    const user: IUser | null = await userDB.findOne({ username });
    if (!user) return null;

    return {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
    };
}

function UserTidier(user: IUser): IUserTidier {
    return {
        id: user._id!.toString(),
        username: user.username,
        email: user.email,
        activated: user.activated,
        affiliateCode: user.affiliateCode,
        referral: user.referral,
        avatar: user.avatar,
        registerDate: user.registerDate,
        balance: user.balance,
    };
}
