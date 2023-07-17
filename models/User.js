const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unqiue: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            match: [/.+@.+\..+/, "Must match an email address!"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            }
        ]

    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

userSchema.virtual("friendcount").get(function () {
    return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;