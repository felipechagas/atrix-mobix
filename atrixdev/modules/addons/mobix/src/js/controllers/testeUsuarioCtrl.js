(function () {

    angular.module("modulo_mobix").controller("testeUsuarioCtrl", ["CONFIG", function (CONFIG) {

        var vm = this;

        vm.customFullscreen = false;

        vm.showAdvanced = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'teste',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
            })
        };

        function DialogController($mdDialog) {
            vm.hide = function() {
                $mdDialog.hide();
            };

            vm.cancel = function() {
                $mdDialog.cancel();
            };

            vm.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
        
    }]);

})();