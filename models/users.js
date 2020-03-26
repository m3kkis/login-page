var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema(
{
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}
);

var Users = mongoose.model('homeusers', usersSchema);
module.exports = Users;