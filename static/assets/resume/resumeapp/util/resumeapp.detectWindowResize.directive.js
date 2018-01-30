(function(angular) {
    'use strict';

    angular
        .module("ResumeApp")
        .directive('detectWindowResize', detectWindowResize);

    detectWindowResize.$inject = ['$window', '$state'];

    function detectWindowResize($window, $state) {
        return {
            link: link,
            restrict: 'E',
            template: '{{changeState()}}'
        };

        function link(scope, element, attrs) {
            scope.resizeProp = {};
            scope.resizeProp.width = $window.innerWidth;
            scope.resizeProp.changed = false;

            angular.element($window).bind('resize', function() {


                scope.resizeProp.width = $window.innerWidth;
                scope.resizeProp.changed = false;
                // manuall $digest required as resize event
                // is outside of angular
                scope.$digest();
            });

            scope.changeState = function() {
                if (scope.resizeProp.width <= 991 && !scope.resizeProp.changed) {
                    $state.go("page-all");
                    scope.resizeProp.changed = true;
                } else if (!scope.resizeProp.changed && scope.resizeProp.width > 991) {
                    $state.go("section-home");
                    scope.resizeProp.changed = true;
                }
            };

        }
    }
})(window.angular);