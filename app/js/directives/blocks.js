"use strict";

var $ = require("jquery");
var sb2 = require("../scratchblocks2.min");
// console.log($, sb2);
var blocks = function() {
    // console.log("I am running: blocks");
    return {
        restrict: "A",
        link: function(scope, elem, attrs) { 
            // console.log(scope, elem, attrs);
            $(elem).text(scope.scripts[0]);
            sb2.parse(elem);
            var i = 1;
            setInterval(function switchScript() {
                // console.log(i);
                $(elem).fadeOut("slow", function fOut() {
                    $(elem).empty();
                    $(elem).text(scope.scripts[i % scope.scripts.length]);
                    sb2.parse(elem);
                    i = i + 1 === scope.scripts.length ? 0 : i + 1;
                    $(elem).fadeIn("slow");
                });
            }, 5000);
        }
    };
};

module.exports = blocks;
