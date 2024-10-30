import { model, models, Schema } from "mongoose";

const proxySchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    },
    port: {
        type: Number,
        required: true,
    },
    IP: {
        type: String,
        required: true,
    },
});

export default models?.proxy || model("proxy", proxySchema);
