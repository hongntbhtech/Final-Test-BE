import * as bcrypt from 'bcrypt';

export function cryptPassword(password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return callback(err, '');

        bcrypt.hash(password, salt, function (err, hash) {
            return callback(err, hash);
        });
    });
}

export function comparePassword(plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
        return callback(err, isPasswordMatch);
    });
}
