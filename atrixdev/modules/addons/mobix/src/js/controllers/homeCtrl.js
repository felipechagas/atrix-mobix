(function () {
    "use strict";

    angular.module("modulo_mobix").controller("homeCtrl", ["CONFIG", function (CONFIG) {

        var vm = this;
        vm.cliente = {}; 
        vm.search = "";

        vm.pesquisarCliente = function () {
            /*requestAPI.clients("?filter=" + vm.search + page).then(function (res) {
                vm.clients = res.data;
            });*/

            window.location = '?module=mobix#!/listaDePontos';

            console.log(vm.search);
        };
    }]);

})();