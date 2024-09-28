import { model, models, Schema } from "mongoose";

// User Interface
export interface IUser {
    _id?: string;
    id: string; // <-- Not in the database
    username: string;
    email: string;
    password: string;
    activated: boolean;
    affiliateCode: string;
    referral: string;
    avatar: string;
    registerDate: number;
    balance: number;
    passwordCode: string;
    activationCode: string;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    activated: {
        type: Boolean,
        default: false,
    },
    affiliateCode: {
        type: String,
        default: null,
    },
    referral: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        default: "/dummy/avatar.png",
    },
    registerDate: {
        type: Number, // Miliseconds
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
        required: true,
    },
    passwordCode: {
        type: String,
        default: null,
    },
    activationCode: {
        type: String,
        default: null,
    },
});

export default models?.users || model("users", userSchema);
