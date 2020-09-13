'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Email" to table "user"
 *
 **/

var info = {
    "revision": 2,
    "name": "actor_model_email",
    "created": "2020-09-13T03:49:12.685Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "user",
        "Email",
        {
            "type": Sequelize.STRING,
            "field": "Email",
            "unique": true
        }
    ]
}];

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
