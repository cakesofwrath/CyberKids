"use strict";

var $ = require("jquery");
require("slick-carousel");

var carousel = function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) { //very corny, no need for now
            $(elem).slick({
                dots: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2500,
                // speed: 750,
                // fade: true,
                cssEase: "linear"
            });
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

module.exports = carousel;
