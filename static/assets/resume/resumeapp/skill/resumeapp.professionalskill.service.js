(function(angular) {
    'use strict';

    angular
        .module("ResumeApp")
        .factory('ProfessionalSkillService', ProfessionalSkillService);

    ProfessionalSkillService.$inject = ['$resource'];

    function ProfessionalSkillService($resource) {
        return $resource('json-data/resume/skill/professional-skill.json');
    }
})(window.angular);