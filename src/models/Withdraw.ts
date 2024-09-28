import { model, models, Schema } from "mongoose";

const WITHDRAW_METHODS = ["qiwi", "paypal", "sberbank"];

const withdrawSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    method: {
        type: String,
        required: true,
        enum: WITHDRAW_METHODS
    },
    date: {
        type: Date,
        required: true,
    },
});

export default models?.withdraws || model("withdraws", withdrawSchema);
