(function () {
    'use strict';
    cdmApp.controller('AuthController', AuthController);

    AuthController.$inject = ['$state', '$stateParams', '$scope'];

    function AuthController($state, $stateParams, $scope) {
     var ctrl = this;
     ctrl.name = $stateParams.name;
    }
})();