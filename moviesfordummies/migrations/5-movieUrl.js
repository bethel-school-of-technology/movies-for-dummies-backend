'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "moviesUrl" on table "movies"
 * changeColumn "moviesUrl" on table "movies"
 *
 **/

var info = {
    "revision": 5,
    "name": "movieUrl",
    "created": "2020-10-11T05:35:43.464Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "movies",
            "moviesUrl",
            {
                "type": Sequelize.STRING,
                "field": "moviesUrl",
                "notNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "movies",
            "moviesUrl",
            {
                "type": Sequelize.STRING,
                "field": "moviesUrl",
                "notNull": false
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
