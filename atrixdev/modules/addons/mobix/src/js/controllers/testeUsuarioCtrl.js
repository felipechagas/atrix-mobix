(function () {

    angular.module("modulo_mobix").controller("testeUsuarioCtrl", ["CONFIG", "$mdDialog", function (CONFIG, $mdDialog) {

        var vm = this;

        

        vm.enderecoModals = "views/modals/testeUsuario/";
        vm.customFullscreen = false;

        vm.showFacilidades = function(ev) {
            $mdDialog.show({
                controller: ["$mdDialog", modalsController],
                template: window.faciliadadesModal,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: vm.customFullscreen
            });
        };

        vm.showSSID = function(ev) {
            $mdDialog.show({
                controller: ["$mdDialog", modalsController],
                template: window.SSIDModal,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: vm.customFullscreen
            });
        };

        function modalsController($mdDialog) { 
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