const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {type: String},
    email: {type: String, required: true, lowercase: true},
    password: {type: String, required: true},
    my_role:{
        type: [Schema.Types.ObjectId],
        ref: 'roles',
    }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('users', UserSchema);

