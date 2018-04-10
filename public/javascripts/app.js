var app = angular.module('benchmark',['ngSanitize']);
app.controller('benchCtrl', function($scope, $http) {
    $scope.sortType     = 'screen'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchBench   = '';     // set the default search/filter term

    $scope.data = [];
    var request = $http.get('/data');    
    request.success(function(data) {
        console.log(data);
        $scope.data = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });

    $scope.data = [];  

   // recherche
	$scope.razRecherche = function() {
		$scope.searchBench = null;
    }
    
    // tri
	$scope.champTri = null;
	$scope.triDescendant = false;
	$scope.triBenchs = function(champ) {
		if ($scope.champTri == champ) {
			$scope.triDescendant = !$scope.triDescendant;
		} else {
			$scope.champTri = champ;
			$scope.triDescendant = false;
		}	
    }
    
    $scope.cssChevronsTri = function(champ) {
		return {
			glyphicon: $scope.champTri == champ,
			'glyphicon-chevron-up' : $scope.champTri == champ && !$scope.triDescendant,
			'glyphicon-chevron-down' : $scope.champTri == champ && $scope.triDescendant 
		};
    }
    
    // PDF
    $scope.generatePdf = function() {
        var requestpdf = $http.get('/pdf');    
        requestpdf.success(function(data) {
            console.log(data);            
        });
        requestpdf.error(function(data){
            console.log('Error: ' + data);
        });
    };
    
    

});