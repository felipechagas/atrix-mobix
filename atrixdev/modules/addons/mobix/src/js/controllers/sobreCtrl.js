(function () {
    "use strict";

    angular.module("modulo_mobix").controller("sobreCtrl", ["CONFIG", function (CONFIG) {

        var vm = this;
        vm.cliente = {};
        vm.cliente.nome = CONFIG.ISAEL;

        console.log(CONFIG.ISAEL );

    }]);

})();