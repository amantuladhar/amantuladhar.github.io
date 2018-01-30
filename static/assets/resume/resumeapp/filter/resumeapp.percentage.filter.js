(function(angular) {
    'use strict';

    angular
        .module("ResumeApp")
        .filter('percentage', percentageFilter);

    function percentageFilter() {

        return calculateRandomPercentage;

        //~-----------------------------------------------

        function calculateRandomPercentage(input) {
            switch (input) {
            case 'Proficient':
                return randomNumberInRange(70, 10);
            case 'Familiar':
                return randomNumberInRange(50, 10);
            case 'Beginner':
                return randomNumberInRange(25, 10);
            default:
                return randomNumberInRange(50, 10);
            }
        }

        function randomNumberInRange(start, range) {
            var r = Math.floor(Math.random() * range) + start;
            return r + '%';
        }
    }
})(window.angular);