(function () {
    "use strict";

    angular.module("modulo_mobix").controller("listaDePontosCtrl", ["CONFIG", function (CONFIG) {

        var vm = this;

        vm.ordenarServico     = 'servico';
        vm.ordenarServicoReverter  = false;
        vm.filterServico   = '';

        vm.ordenarProtocolo     = 'data';
        vm.ordenarProtocoloReverter  = false;
        vm.filterProtocolo   = '';

         
        vm.servicos = [
            { servico: 'Unifor', endereco: 'Washinton Soares', status: 'Ativo', id: '' },
            { servico: 'Uni7', endereco: 'Washinton Soares', status: 'Ativo', id: '' },
            { servico: 'Mobtelecom', endereco: 'Abolição', status: 'Desativo', id: '' },
            { servico: 'OSF', endereco: 'Teste', status: 'Ativo', id: '' }
        ];

        vm.protocolos = [
            { protocolo: '873483798292', data: '22 Dez 2018', id: '' },
            { protocolo: '1734837982r2', data: '10 Out 2018', id: '' },
            { protocolo: '333d83798292', data: '8 Fev 2018', id: '' }
        ];
    }]);

})();