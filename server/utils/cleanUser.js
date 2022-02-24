const cleanUser = user => {
    ['_id', 'password', '__v'].forEach(key => {
        user[key] = undefined;
    });
    return user;
};

module.exports = { cleanUser };
