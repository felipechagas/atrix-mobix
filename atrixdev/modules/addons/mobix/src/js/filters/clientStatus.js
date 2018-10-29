(function () {
    "use strict";

    angular.module("modulo_mobix").filter("clientStatus", [function () {
        return function (str) {
            if (str == "Active") return "Ativo";
            if (str == "Inactive") return "Inativo";
            if (str == "Closed") return "Fechado";
        };
    }]);

})();