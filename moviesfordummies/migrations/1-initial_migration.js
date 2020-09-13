'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "movie", deps: []
 * createTable "user", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2020-09-13T03:48:08.154Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "movie",
            {
                "idmovie_name": {
                    "type": Sequelize.INTEGER,
                    "field": "idmovie_name",
                    "primaryKey": true,
                    "allowNull": false,
                    "autoIncrement": true
                },
                "movie_name": {
                    "type": Sequelize.STRING(45),
                    "field": "movie_name",
                    "allowNull": true
                },
                "description": {
                    "type": Sequelize.STRING(999),
                    "field": "description",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "user",
            {
                "iduser": {
                    "type": Sequelize.INTEGER,
                    "field": "iduser",
                    "primaryKey": true,
                    "allowNull": false,
                    "autoIncrement": true
                },
                "first_name": {
                    "type": Sequelize.STRING(45),
                    "field": "first_name",
                    "allowNull": true
                },
                "last_name": {
                    "type": Sequelize.STRING(45),
                    "field": "last_name",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
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
