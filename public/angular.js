var app = angular.module('DNAtoAA', []);

app.controller('bC', ['$scope', '$http', function($scope, $http){
	$scope.blat = 'Convert DNA to Protein!';

	$scope.rekt = false;
	$scope.fill = false;
	$scope.prtnSeq;

	$scope.convert = function() {
		
	
			$http.post('http://localhost:5000/prtn', {
		    	arg: $scope.dna
			}).success(function(data){
				$scope.prtnSeq = data.output;
				$scope.rekt = true;
				$scope.fill = true;
			})
		
	
	};

	$scope.seqs = {};
		

	$scope.getPrtn = function() {

		$http.get('http://localhost:5000/aas').success(
			function(data) {
				$scope.seqs = data;
			})
	}

	
	$scope.clear = function(){
		$scope.dna = '';
		$scope.fill = false;
		$scope.rekt = false;
	};
}]);


