(function () {

    angular.module("modulo_mobix").controller("testeUsuarioCtrl", ["CONFIG", "$mdDialog", function (CONFIG, $mdDialog) {

        var vm = this;

        vm.enderecoModals = "views/modals/testeUsuario/";
        vm.customFullscreen = false;

        vm.showFacilidades = function(ev) {
            $mdDialog.show({
                controller: ["$mdDialog", facilidadesController],
                template: window.faciliadadesModal,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
            });
        };

        vm.showSSID = function(ev) {
            $mdDialog.show({
                controller: ["$mdDialog", SSIDController],
                template: window.SSIDModal,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
            });
        };

        function SSIDController($ssid) { 
 
            vm.hide = function() { 
                $ssid.hide();
            };

            vm.cancel = function() {
                $ssid.cancel();
            }; 

            vm.answer = function(answer) { 
                $ssid.hide(answer);
            };
        }
        
    }]);

})();