import { model, models, Schema } from "mongoose";

const DEPOSIT_METHODS = ["qiwi", "paypal", "sberbank"];

const depositSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    method: {
        type: String,
        required: true,
        enum: DEPOSIT_METHODS
    },
    date: {
        type: Date,
        required: true,
    },
});

export default models?.deposits || model("deposits", depositSchema);
