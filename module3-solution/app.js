(function () {
'use strict';

angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(service) {
      var controller = this;
	  
	  controller.key = "";
	  controller.found = [];
	  
	  controller.remove = function(index) {
		  controller.found.splice(index, 1);
	  }
	  
	  controller.findMenuItems = function() {
		  service.getMatchedMenuItems( controller.key )
				 .then( function (items) {
					controller.found = items;
				 });
	  }
	
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http){
      var service = this;

	  service.getMatchedMenuItems = function(searchTerm) {
		return $http.get("https://davids-restaurant.herokuapp.com/menu_items.json")
			.then(function (result) {
				// process result and only keep items that match
				var foundItems = [];
				var items = result.data.menu_items;
				for(var i = 0; i < items.length; i++) {
					var item = items[i];
					if ( item.description.includes( searchTerm )) {
						foundItems.push( item );
					}
				}

				return foundItems;
			});
	  }
    }
	
	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			restrict: 'E',
			scope: {
				items: '<foundItems',
				remove: '&onRemove'
			},
			controller: FoundItemsDirectiveController,
			controllerAs: 'ctrl',
			bindToController: true
		};
		
		return ddo;
	}
	
	function FoundItemsDirectiveController() {
		var ctrl = this;
		
		this.isEmpty = function() {
			return ctrl.items.length === 0;
		}
	}

})();
