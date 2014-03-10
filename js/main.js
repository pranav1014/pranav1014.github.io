var app = angular.module('myApp', []);
app.run(function($rootScope) {
	$rootScope.name="Pranav Manem";
	});
	
app.controller('MyController', function($scope) {
	$scope.person= {
		name: "Pranav Manem"
		};
	var updateClock = function() {
		$scope.clock = new Date();
	};
	var timer = setInterval(function() {
		$scope.$apply(updateClock);
		}, 1000);
		updateClock;
	});

app.controller('ParentController', function($scope) {
	$scope.person = {greeted: false};
});

app.controller('ChildController', function($scope) {
	$scope.sayHello = function() {
	$scope.person.greeted = true;
	}
});



app.controller('PlayerController', ['$scope', function($scope) {
	$scope.playing = false;
	$scope.audio = document.createElement('audio');
	$scope.audio.src = '/media/npr.mp4';
	$scope.play = function() {
		$scope.playing= true;
	};
	$scope.stop = function() {
		$scope.audio.pause();
		$scope.playing = false;
	};
	$scope.audio.addEventListener('ended', function() {
		$scope.$apply(function() {
			$scope.stop()
		});
	});
}]);

app.controller('RelatedController', ['$scope', function($scope) {
}]);

app.controller('DemoController', function($scope) {
	$scope.counter = 0;
	$scope.add = function(amount) { $scope.counter += amount; };
	$scope.subtract = function(amount) { $scope.counter -= amount; };
	$scope.reset = function(amount) { $scope.counter -= $scope.counter; };
});

var apiKey = 'MDEzMzI5MDQyMDEzOTQwNDk1NDg3NGQ2Mw001',
	nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';
var programs;

app.controller('PlayerController2', function($scope, $http) {

	$http({
	method: 'JSONP',
	url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
	}).success(function(data,status) {
	
		$scope.programs = data.list.story;
		
	}).error(function(data,status) {
	
	});
});
	