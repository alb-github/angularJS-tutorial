(function () {
'use strict';

angular
    .module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
		    $scope.resultMessage = "";
        $scope.messageColor = "black";

        $scope.checkFood = function () {
          var myLunch = $scope.lunch || "";
          var parts = myLunch.split(",");

          if (myLunch == "") {
            $scope.resultMessage = "Please, enter data first";
            $scope.messageColor = "red";
            return;
          }

          $scope.messageColor = "green";
          var nonEmptyPartsCounter = countNonEmptyParts( parts );
          if ( nonEmptyPartsCounter <= 3) {
              $scope.resultMessage = "Enjoy!";
          } else {
              $scope.resultMessage = "Too much";
          };
        };

        function countNonEmptyParts(parts) {
          var count = 0;
          for(var i in parts) {
            if ( ! parts[i].trim() == "") {
              count++;
            }
          }
          return count;
        }

    }

})();
