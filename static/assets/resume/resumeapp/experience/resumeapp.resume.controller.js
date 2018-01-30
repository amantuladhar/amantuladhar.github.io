(function(angular) {
    'use strict';

    angular
        .module("ResumeApp")
        .controller('ResumeController', ResumeController);

    ResumeController.$inject = ['EducationService', 'WorkExperienceService'];

    function ResumeController(EducationService, WorkExperienceService) {
        var vm = this;

        EducationService.get().$promise.then(function(response) {
            vm.education = response;
        });

        WorkExperienceService.get().$promise.then(function(response) {
            vm.workExperience = response;
        });

        vm.quote = {
            message: "Your Future is Created by What You Do Today not Tomorrow",
            from: "Someone"
        };
    }


})(window.angular);