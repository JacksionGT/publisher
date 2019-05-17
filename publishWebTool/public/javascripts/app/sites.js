(function () {
    'use strict';
    angular
        .module('toolKit',[]).config(['$interpolateProvider',function($interpolateProvider) {
            // Swig uses {{}} for variables which makes it clash with the use of {{}} in AngularJS.
            // Replaced use of {{}} with [[]] in AngularJS to make it work with Swig.
            $interpolateProvider.startSymbol('__');
            $interpolateProvider.endSymbol('__');
        }
    ])
        .controller('SiteController', SiteController);

        // SiteController.$inject = ['SweetAlert', 'ngDialog', '$scope', 'toaster', '$rootScope', '$timeout', '$state', '$window','$templateCache'];
         SiteController.$inject = ['$scope', '$q','$http'];
    
    function SiteController($scope,$q,$http) {
        console.log("测试页面加载了");
        var vm = this;
        vm.siteStatus = {
            "Stopped":"已停止",
            "Started":"运行中......"
        }
        vm.siteList = [];
        

        $http({ method: 'GET', url: '/sites/allsites' }).success(function(data){
            console.log(data);
            vm.siteList = data || [];
        })        
    }

})();
