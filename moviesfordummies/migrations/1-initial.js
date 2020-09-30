'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "movies", deps: [users]
 * createTable "posts", deps: [users]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial",
    "created": "2020-09-28T03:31:52.235Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "users",
            {
                "userId": {
                    "type": Sequelize.INTEGER,
                    "field": "userId",
                    "allowNull": false,
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "firstName": {
                    "type": Sequelize.STRING,
                    "field": "firstName",
                    "allowNull": true
                },
                "lastName": {
                    "type": Sequelize.STRING,
                    "field": "lastName",
                    "allowNull": true
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true,
                    "allowNull": true
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username",
                    "unique": true,
                    "allowNull": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt"
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "movies",
            {
                "moviesId": {
                    "type": Sequelize.INTEGER,
                    "field": "moviesId",
                    "allowNull": false,
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "moviesTitle": {
                    "type": Sequelize.STRING,
                    "field": "moviesTitle",
                    "unique": true,
                    "allowNull": true
                },
                "moviesBody": {
                    "type": Sequelize.STRING,
                    "field": "moviesBody",
                    "allowNull": true
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "users",
                        "key": "userId"
                    },
                    "allowNull": true,
                    "field": "userId"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt"
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "posts",
            {
                "postId": {
                    "type": Sequelize.INTEGER,
                    "field": "postId",
                    "allowNull": false,
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "postTitle": {
                    "type": Sequelize.STRING,
                    "field": "postTitle",
                    "unique": true,
                    "allowNull": true
                },
                "postBody": {
                    "type": Sequelize.STRING,
                    "field": "postBody",
                    "allowNull": true
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "users",
                        "key": "userId"
                    },
                    "allowNull": true,
                    "field": "userId"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt"
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt"
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
