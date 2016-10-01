(function(angular) {
    'use strict';

    angular
        .module("ResumeApp")
        .factory('SoftwareSkillService', SoftwareSkillService);

    SoftwareSkillService.$inject = ['$resource'];

    function SoftwareSkillService($resource) {
        return $resource('json-data/resume/skill/software-skill.json');
    }

})(window.angular);
