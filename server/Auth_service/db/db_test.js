const db = require('./db2');

const print = console.log;


db.get_user('user1')
    .then(print)
    .catch(print);


db.get_user('user10')
    .then(print)
    .catch((err) => {
        print('here')
        print(err);
    });