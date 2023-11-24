import mongoose from "mongoose";

const StudentSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        group: {
            type: Number,
            required: false,
        },
        rate: {
            type: Number,
            required: false,
        }
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('student', StudentSchema);