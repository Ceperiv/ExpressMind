const {Schema, model} = require('mongoose');

const postSchema = new Schema({
    postName: {type: String, trim: true, required: true},
    author: {type: String, trim: true, required: true},
    description: {type: String, trim: true, required: true},
    my_user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('posts', postSchema);
