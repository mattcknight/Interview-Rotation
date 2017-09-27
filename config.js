var config = {
    mysql: {
        username: 'IntRotateApp',
        password: 'Dealer01',
        server: '35.184.218.54', // Google Cloud Host
        database: 'recruiting_rotation'
    },
    web: {
        port: 8080
    },
    api: {
        basePath: 'http://localhost:8080/api/'
    }
};

module.exports = config;