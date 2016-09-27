(function () {
'use strict';

angular
    .module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var controller = this;

      controller.isEmpty = function () {
        return ShoppingListCheckOffService.allItemsSold();
      }

      controller.buyAnItem = function (index) {
        ShoppingListCheckOffService.buyAnItem(index);
      }

      controller.items = function () {
        return ShoppingListCheckOffService.getToBuy();
      }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var controller = this;

      controller.isEmpty = function () {
        return ShoppingListCheckOffService.noItemsBought();
      }

      controller.items = function () {
        return ShoppingListCheckOffService.getAlreadyBought();
      }

    }

    function ShoppingListCheckOffService(){
      var service = this;

      var alreadyBoughtItems = [];
      var availableItems = [
        {
          name: "Peras",
          quantity: "1 Kg"
        },
        {
          name: "Manzanas",
          quantity: "1 Kg"
        },
        {
          name: "Platanos",
          quantity: "5 Kg"
        },
        {
          name: "Ciruelas",
          quantity: "3 Kg"
        },
        {
          name: "Naranjas",
          quantity: "4 Kg"
        }
      ];

      service.buyAnItem = function (index) {
        var item = availableItems[index];
        availableItems.splice(index, 1);
        alreadyBoughtItems.push(item);
      }

      service.allItemsSold = function () {
        return availableItems.length == 0;
      }

      service.noItemsBought = function () {
        return alreadyBoughtItems.length == 0;
      }

      service.getToBuy = function () {
        return availableItems.slice();  // clones the array
      }

      service.getAlreadyBought = function () {
        return alreadyBoughtItems.slice(); // clones the array
      }

    }

})();
