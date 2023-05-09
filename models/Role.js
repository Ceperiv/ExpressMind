const {Schema, model} = require('mongoose');

const RoleSchema = new Schema({
    role: {type: String, required: true},
    blocked: {type: Boolean, required: true},
    my_user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
}, {
    timestamps: false,
    versionKey: false,
});

module.exports = model('roles', RoleSchema);

