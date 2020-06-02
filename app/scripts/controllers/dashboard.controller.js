(function () {
    'use strict';
    cdmApp.controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$state', '$stateParams', '$scope'];

    function DashboardController($state, $stateParams, $scope) {
        var ctrl = this;
        console.log($stateParams);
        ctrl.name = $stateParams.name;
    }
})();