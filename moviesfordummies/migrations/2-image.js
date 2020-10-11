'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "moviesImage" to table "movies"
 *
 **/

var info = {
    "revision": 2,
    "name": "image",
    "created": "2020-10-09T02:13:24.751Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
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
