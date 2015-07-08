"use strict";

var mls = function(f) {
    return f.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
};

var HomeCtrl = function($scope) {
    $scope.scripts = [
        mls(function() {/*
                when gf clicked
                forever
                   turn cw (15) degrees
                   say [Hello!] for (2) secs
                   if <mouse down?> then
                      change [mouse clicks v] by (1)
                   end
        */}),
        mls(function() {/*
                when [space v] key pressed
                stamp
        */}),
        mls(function() {/*
                when gf clicked
                forever
                   turn cw (30) degrees
                   say [Poooo!] for (18) secs
                   if <mouse up?> then
                      change [mouse clicks v] by (10)
                   end
                   stamp
        */})
    ];
    // console.log($scope.scripts);
};

module.exports = HomeCtrl;
