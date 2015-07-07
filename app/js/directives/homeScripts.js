"use strict";

var $ = require("jquery");
var sb2 = require("../scratchblocks2");

var homeScripts = function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) { 
            /*
            setInterval(function switchScript() {
    $("pre.blocks").fadeOut("slow", function fOut() {
        $("pre.blocks").empty();
        $("pre.blocks").text(scripts[i % scripts.length]);
        scratchblocks2.parse("pre.blocks");
        i++;
        $("pre.blocks").fadeIn("slow");
    });
}, 3500);*/
            /*$(elem).slick({
                dots: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2500,
                // speed: 750,
                // fade: true,
                cssEase: "linear"
            });*/
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
    };
};

module.exports = homeScripts;
