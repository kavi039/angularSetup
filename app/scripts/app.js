var cdmApp = angular.module("cdmApp",
    ['ui.router']);

function cdmAppConfig($stateProvider, $urlRouterProvider, $locationProvider, $provide) {

    $locationProvider.html5Mode(true);
    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: 'views/auth/auth.html',
            controller: 'AuthController',
            controllerAs: 'authCtrl',
            authentication: false
        });
    $stateProvider
        .state('user', {
            url: '/user',
            template: '<ui-view></ui-view>',
            authentication: true
        })
        .state('user.dashboard', {
            url: '/dashboard?name',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dashboardCtrl',
            authentication: true
        });

    $urlRouterProvider.otherwise("/login");

    $provide.decorator('$exceptionHandler', ['$delegate', '$window', function ($delegate, $window) {
        return function (exception, cause) {
        };
    }]);

}

cdmApp.factory('networkInterceptor', ["$rootScope", function ($rootScope) {

    function isTemplateCall(config) {
        return config.url.lastIndexOf(".html") !== -1;
    }

    return {
        request: function (config) {
            if (isTemplateCall(config)) {
                alert("tempt call");
            }
            return config;
        },
        response: function (response) {
            return response;
        },
        responseError: function (response) {
            if (response.status === 403 && response.data.status === 'INVALID_REQUEST_ORIGIN') {
                window.location.href = "/login";
            }
            return response;
        }
    };
}]);

cdmApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$provide', cdmAppConfig]);

cdmApp.run(function ($rootScope, $state) {
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {
        if (!toState.authentication) {
            $state.transitionTo(toState.name, toParams);
            event.preventDefault();
        }
        if(toState.authentication){
            $state.transitionTo("user.dashboard", toParams);
            event.preventDefault();
        }
    });
});