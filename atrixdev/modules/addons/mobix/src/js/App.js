(function () {
    "use strict";

    angular.module("modulo_mobix", ['ui.mask', "ui.router", "ngMaterial", "ngMessages"]);

    angular.module("modulo_mobix").constant("CONFIG", {
        URL_MODULE: "../modules/addons/mobix/www/",
        URL_API: "../api-atrix/public/mobix/"
    });

    angular.module("modulo_mobix").config(["$stateProvider", "$urlRouterProvider", "CONFIG", function ($stateProvider, $urlRouterProvider, CONFIG) {

        $urlRouterProvider.otherwise("home"); 

        $stateProvider

            .state("home", {
                url: "/home",
                views: {
                    "conteudo": {
                        templateUrl: CONFIG.URL_MODULE + "views/home.html?v=" + modulo_mobix_version,
                        controller: "homeCtrl",
                        controllerAs: "vm"
                    }
                }
            })

            .state("sobre", {
                url: "/sobre",
                views: {
                    "conteudo": {
                        templateUrl: CONFIG.URL_MODULE + "views/sobre.html?v=" + modulo_mobix_version,
                        controller: "sobreCtrl",
                        controllerAs: "vm"
                    }
                }
            })

            .state("listaDePontos", {
                url: "/listaDePontos",
                views: {
                    "conteudo": {
                        templateUrl: CONFIG.URL_MODULE + "views/listaDePontos.html?v=" + modulo_mobix_version,
                        controller: "listaDePontosCtrl",
                        controllerAs: "vm"
                    }
                }
            })

            .state("testeUsuario", {
                url: "/testeUsuario",
                views: {
                    "conteudo": {
                        templateUrl: CONFIG.URL_MODULE + "views/testeUsuario.html?v=" + modulo_mobix_version,
                        controller: "testeUsuarioCtrl",
                        controllerAs: "vm"
                    }
                }
            });

    }]);

})();