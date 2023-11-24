import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
        }
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('User', UserSchema);