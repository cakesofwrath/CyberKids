"use strict";

var $ = require("jquery");

var cascade = function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) { //very corny, no need for now
            /*$(elem).children("li").css({
                right: -2000,
                position: "relative"
            }).
            each(function(i) {
                var el = $(this);
                setTimeout(function() {
                    console.log(i);
                    el.animate({
                        left: 0
                    }, 500);
                }, i*500);
            }); */
        }
    }
};

module.exports = cascade;
