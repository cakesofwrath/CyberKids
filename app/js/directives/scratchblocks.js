"use strict";

var $ = require("jquery");
var sb2 = require("../scratchblocks2.min");
// console.log($, sb2);
var scratchblocks = function() {
    console.log("I am running: blocks");
    return {
        restrict: "A",
        link: function(scope, elem, attrs) { 
            // console.log(scope, elem, attrs);
            // console.log($("pre.blocks"));
            $(window).load(function() {
                sb2.parse("pre.blocks");
            });
        }
    };
};

module.exports = scratchblocks;
