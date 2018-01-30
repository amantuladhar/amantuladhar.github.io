(function(angular) {
    'use strict';

    angular
        .module("ResumeApp")
        .controller('SkillController', SkillController);


    SkillController.$inject = ['percentageFilter', 'TechnicalSkillService', 'SoftwareSkillService', 'ProfessionalSkillService'];
    

    function SkillController(percentageFilter, TechnicalSkillService, SoftwareSkillService, ProfessionalSkillService) {
        var vm = this;
        vm.skills = [];
        vm.bg = getRandomBackgroundColor;
        vm.percentage = getPercentageInRange;

        //~------------------------------------------------------------

        TechnicalSkillService.get().$promise.then(function(response) {
            vm.skills[0] = response;
        });
        SoftwareSkillService.get().$promise.then(function(response) {
            vm.skills[1] = response;
        });
        ProfessionalSkillService.get().$promise.then(function(response) {
            vm.skills[2] = response;
        });

        function getRandomBackgroundColor() {
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
        }

        function getPercentageInRange(level) {
            return percentageFilter(level);
        }


    }
})(window.angular);