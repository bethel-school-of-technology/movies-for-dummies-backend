'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Password" to table "user"
 * changeColumn "createdAt" on table "user"
 * changeColumn "updatedAt" on table "user"
 *
 **/

var info = {
    "revision": 4,
    "name": "user_model_password",
    "created": "2020-09-14T01:37:24.226Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "user",
            "Password",
            {
                "type": Sequelize.STRING,
                "field": "Password"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "user",
            "createdAt",
            {
                "type": Sequelize.DATE,
                "field": "createdAt"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "user",
            "updatedAt",
            {
                "type": Sequelize.DATE,
                "field": "updatedAt"
            }
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
