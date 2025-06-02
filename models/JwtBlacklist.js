const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jwtBlacklistSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("JwtBlacklist", jwtBlacklistSchema);
