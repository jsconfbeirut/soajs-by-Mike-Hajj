"use strict";
var homepageApp = mkplApp.components;

homepageApp.controller('homepageCtrl', ['$scope', 'ngDataApi', function ($scope, ngDataApi) {

	$scope.message = "";

	$scope.getInfo = function () {
		getSendDataFromServer($scope, ngDataApi, {
			'method': 'get',
			'routeName': '/jsconfbeirut/getInfo',
			'params': {
				'email': $scope.email.address
			}
		}, function (error, response) {
			if (error) {
				$scope.$parent.displayAlert('danger', error.message);
			} else {
				$scope.message = response.data;
				var x = $scope.message.split("</h3>");
				x = x[x.length-1];
				$scope.message = $scope.message.replace(x, '');

				x = '<a href="mailto:career@soajs.org">' + x + '</a>';
				x = '<h3>' + x + '</h3>';
				$scope.message += x;
			}
		});
	};
}]);

