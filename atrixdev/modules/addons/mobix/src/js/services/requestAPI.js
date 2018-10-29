(function () {
    "use strict";

    angular.module("modulo_mobix").service("requestAPI", ["$http", "CONFIG", function ($http, CONFIG) {

        this.clients = function (params) {
            params = params || "";
            return $http.get(CONFIG.URL_API + "search" + params);
        };

    }]);

})();