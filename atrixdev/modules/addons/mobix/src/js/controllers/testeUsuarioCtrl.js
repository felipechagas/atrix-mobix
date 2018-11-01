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

        function modalsController($modal) { 
 
            vm.hide = function() { 
                $modal.hide();
            };

            vm.cancel = function() {
                $modal.cancel();
            }; 

            vm.answer = function(answer) { 
                $modal.hide(answer);
            };
        }
        
    }]);

})();