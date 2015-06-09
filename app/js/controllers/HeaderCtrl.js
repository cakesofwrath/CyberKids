"use strict";

var HeaderCtrl = function($scope, $route) {
	$scope.$on("$routeChangeSuccess", function(event, args) {
		if(args.$$route) {
			$scope.pageTab = args.$$route.pageTab;
		}
	});
	/*console.log(Object.keys($route));
	console.log($route)
    $scope.pageTab = $route.current.$$route.pageTab;  */
};

module.exports = HeaderCtrl;
