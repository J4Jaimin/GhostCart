import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    data: {
        cart: [
            {
                courseId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Course"
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ]
    },
    expiredAt: {
        type: Number,
        default: Math.round(Date.now() / 1000 + 60 * 60)
    }
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;