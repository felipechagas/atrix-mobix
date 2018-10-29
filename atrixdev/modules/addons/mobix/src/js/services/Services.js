(function () {
    'use strict';

    /**
     * This method is responsible for redirect to URI.
     */
    angular.module('modulo_mobix').service('routerService', [function () {

        var self = this;

        self.redirect = function (url) {
            window.location = url;
        };

    }]);

    /**
     * This method is responsible to show in console the logs.
     */
    angular.module('modulo_mobix').service('debugService', [function () {

        var self = this;
        self.debug = false;

        self.printLog = function (data) {
            if (self.debug) {
                console.log(data);
            }
        };

    }]);

    /**
     * This service provides tools and utilities for development.
     */
    angular.module('modulo_mobix').service('utilsService', [function () {

        var self = this;

        /**
         * This method check if cpf is valid
         * @param cpf 
         */
        self.validarCPF = function (cpf) {

            var add = 0;
            var rev = null;

            cpf = cpf.replace(/[^\d]+/g, '');

            if (cpf == '') {
                return false;
            }

            // Elimina CPFs invalidos conhecidos    
            if (cpf.length != 11 ||
                cpf == "00000000000" ||
                cpf == "11111111111" ||
                cpf == "22222222222" ||
                cpf == "33333333333" ||
                cpf == "44444444444" ||
                cpf == "55555555555" ||
                cpf == "66666666666" ||
                cpf == "77777777777" ||
                cpf == "88888888888" ||
                cpf == "99999999999") {
                return false;
            }

            // Valida 1o digito 
            add = 0;

            for (i = 0; i < 9; i++) {
                add += parseInt(cpf.charAt(i)) * (10 - i);
            }

            rev = 11 - (add % 11);

            if (rev == 10 || rev == 11) {
                rev = 0;
            }

            if (rev != parseInt(cpf.charAt(9))) {
                return false;
            }

            // Valida 2o digito 
            add = 0;
            for (i = 0; i < 10; i++) {
                add += parseInt(cpf.charAt(i)) * (11 - i);
            }

            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11) {
                rev = 0;
            }

            if (rev != parseInt(cpf.charAt(10))) {
                return false;
            }

            return true;
        };

        /**
         * This method check if cnpj is valid
         * @param cnpj 
         */
        self.validarCNPJ = function (cnpj) {

            cnpj = cnpj.replace(/[^\d]+/g, '');

            if (cnpj == '') {
                return false;
            }
            if (cnpj.length != 14) {
                return false;
            }

            // Elimina CNPJs invalidos conhecidos
            if (cnpj == "00000000000000" ||
                cnpj == "11111111111111" ||
                cnpj == "22222222222222" ||
                cnpj == "33333333333333" ||
                cnpj == "44444444444444" ||
                cnpj == "55555555555555" ||
                cnpj == "66666666666666" ||
                cnpj == "77777777777777" ||
                cnpj == "88888888888888" ||
                cnpj == "99999999999999") {
                return false;
            }

            // Valida DVs
            var tamanho = cnpj.length - 2;
            var numeros = cnpj.substring(0, tamanho);
            var digitos = cnpj.substring(tamanho);
            var soma = 0;
            var pos = tamanho - 7;

            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }

            var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

            if (resultado != digitos.charAt(0)) {
                return false;
            }

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;

            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

            if (resultado != digitos.charAt(1)) {
                return false;
            }

            return true;
        };

        /**
         * This method encode base64 and supported unicode character.
         * Use this if you browser suporte btoa.
         *
         * @param str
         * @returns {string}
         * @constructor
         */
        self.Base64encode = function (str) {
            // return window.btoa(window.encodeURIComponent(str));
            return window.btoa(str);
        };

        /**
         * This method decode base64 and supported unicode caracter.
         * Use this if you browser suporte atob.
         *
         * @param str
         * @returns {string}
         * @constructor
         */
        self.Base64decode = function atou(str) {
            // return window.decodeURIComponent(window.atob(str));
            return window.atob(str);
        };

        /**
         *  Secure Hash Algorithm (SHA256)
         *  http://www.webtoolkit.info/
         *
         *  It is a simple impletation of Secure Hash Algorithm (SHA256).
         *
         *  Original code by Angel Marin, Paul Johnston.
         **/
        self.SHA256 = function (s) {
            var chrsz = 8;
            var hexcase = 0;

            function safe_add(x, y) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF);
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            }

            function S(X, n) {
                return (X >>> n) | (X << (32 - n));
            }

            function R(X, n) {
                return (X >>> n);
            }

            function Ch(x, y, z) {
                return ((x & y) ^ ((~x) & z));
            }

            function Maj(x, y, z) {
                return ((x & y) ^ (x & z) ^ (y & z));
            }

            function Sigma0256(x) {
                return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
            }

            function Sigma1256(x) {
                return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
            }

            function Gamma0256(x) {
                return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
            }

            function Gamma1256(x) {
                return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
            }

            function core_sha256(m, l) {
                var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
                var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
                var W = new Array(64);
                var a, b, c, d, e, f, g, h, i, j;
                var T1, T2;
                m[l >> 5] |= 0x80 << (24 - l % 32);
                m[((l + 64 >> 9) << 4) + 15] = l;
                for (i = 0; i < m.length; i += 16) {
                    a = HASH[0];
                    b = HASH[1];
                    c = HASH[2];
                    d = HASH[3];
                    e = HASH[4];
                    f = HASH[5];
                    g = HASH[6];
                    h = HASH[7];
                    for (j = 0; j < 64; j++) {
                        if (j < 16) W[j] = m[j + i];
                        else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
                        T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                        T2 = safe_add(Sigma0256(a), Maj(a, b, c));
                        h = g;
                        g = f;
                        f = e;
                        e = safe_add(d, T1);
                        d = c;
                        c = b;
                        b = a;
                        a = safe_add(T1, T2);
                    }
                    HASH[0] = safe_add(a, HASH[0]);
                    HASH[1] = safe_add(b, HASH[1]);
                    HASH[2] = safe_add(c, HASH[2]);
                    HASH[3] = safe_add(d, HASH[3]);
                    HASH[4] = safe_add(e, HASH[4]);
                    HASH[5] = safe_add(f, HASH[5]);
                    HASH[6] = safe_add(g, HASH[6]);
                    HASH[7] = safe_add(h, HASH[7]);
                }
                return HASH;
            }

            function str2binb(str) {
                var bin = Array();
                var mask = (1 << chrsz) - 1;
                for (var i = 0; i < str.length * chrsz; i += chrsz) {
                    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
                }
                return bin;
            }

            function Utf8Encode(string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                }
                return utftext;
            }

            function binb2hex(binarray) {
                var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
                var str = "";
                for (var i = 0; i < binarray.length * 4; i++) {
                    str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
                }
                return str;
            }

            s = Utf8Encode(s);
            return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
        };

        /**
         * This method encode file to base64
         * @param f this is a file
         * @param lista this is a list to append files
         * @constructor
         */
        self.FileToBase64 = function (f, lista) {
            var reader = new FileReader(),
                file = {};
            file.name = '';
            file.size = 0;
            file.type = '';
            file.checksum = '';
            file.binary = '';
            file.encode = 'Base64';

            reader.onload = function (e) {
                var binary = self.Base64encode(e.target.result);
                file.checksum = self.SHA256(binary);
                file.binary = binary;
                lista.push(file);
            };

            if (typeof f === 'object') {
                file.name = f.name;
                file.size = f.size;
                file.type = f.type;
            }

            reader.readAsBinaryString(f);
        };
    }]);

    /**
     * This method is responsible to send and receive data by AJAX using HTTP methods GET, POST.
     */
    angular.module('modulo_mobix').service('restService', ['$http', 'utilsService', function ($http, utilsService) {

        var self = this;

        self.getData = function (url) {
            return $http({
                method: 'GET',
                url: url
            });
        };

        self.setData = function (dados, tipe, url) {
            var tmp = {};
            tmp.dados = utilsService.Base64encode(JSON.stringify(dados));
            var ContentType = (tipe) ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded';
            var data = (tipe) ? tmp : $.param(tmp);
            return $http({
                method: 'POST',
                url: url,
                data: data,
                headers: {
                    'Content-Type': ContentType
                }
            });
        };

        self.delData = function (dados, tipe, url) {
            var tmp = {};
            tmp.dados = dados; //utilsService.Base64encode(JSON.stringify(dados));
            var ContentType = (tipe) ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded';
            var data = (tipe) ? tmp : $.param(tmp);
            return $http({
                method: 'DELETE',
                url: url,
                data: data,
                headers: {
                    'Content-Type': ContentType
                }
            });
        };

    }]);

    /**
     * This method is responsible to save ang get data in localStorage
     */
    angular.module('modulo_mobix').service('storageService', [function () {

        var self = this;

        self.cacheTime = function (name, interval) {
            var time = new Date(),
                intr = time.getTime() + interval * 60000,
                timeintr = new Date(intr);
            localStorage.setItem(name + '_cache_time', timeintr.getTime());
        };

        self.getData = function (name) {
            var time = new Date(),
                timeintr = localStorage.getItem(name + '_cache_time');
            if (time.getTime() > timeintr) {
                return null;
            }
            return localStorage.getItem(name);
        };

        self.setData = function (name, data, interval) {
            if (!interval) {
                interval = 30;
            }
            self.cacheTime(name, interval);
            return localStorage.setItem(name, data);
        };

    }]);

    angular.module('modulo_mobix').service('apiService', ['APPCONFIG', 'debugService', 'restService',
        function (APPCONFIG, debugService, restService) {

            var self = this;

            self.getUsersDados = function () {
                var dados = null;
                restService.getData(APPCONFIG.URL_API + '/users-informations').then(function (response) {
                    debugService.printLog(response.data);
                    dados = response.data;
                }).catch(function (fallback) {
                    debugService.printLog(fallback.data);
                });
                return dados;
            };

            self.getListaProjetos = function () {
                var dados = null;
                restService.getData(APPCONFIG.URL_API + '/projetos').then(function (response) {
                    debugService.printLog(response.data);
                    return response.data;
                }).catch(function (fallback) {
                    debugService.printLog(fallback.data);
                });
                return dados;
            };

        }
    ]);

    angular.module('modulo_mobix').service('apiUtilService', [function () {

        var self = this;

        self.getProjeto = function (id, dados) {
            for (var s in dados) {
                if (dados[s].id == id) {
                    return dados[s].descricao;
                }
            }
        };

    }]);

})(); // end use strict