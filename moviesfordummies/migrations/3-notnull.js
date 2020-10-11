'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "moviesImage" on table "movies"
 *
 **/

var info = {
    "revision": 3,
    "name": "notnull",
    "created": "2020-10-09T02:22:51.992Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "movies",
        "moviesImage",
        {
            "type": Sequelize.STRING,
            "field": "moviesImage",
            "allowNull": true
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
