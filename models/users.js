var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema(
{
    name: String,
    email: String,
    password: String
}
);

mongoose.model('homeusers', usersSchema);