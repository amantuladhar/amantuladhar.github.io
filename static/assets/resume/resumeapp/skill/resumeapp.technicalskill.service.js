(function(angular) {
    'use strict';

    angular
        .module("ResumeApp")
        .factory('TechnicalSkillService', TechnicalSkillService);

    TechnicalSkillService.$inject = ['$resource'];

    function TechnicalSkillService($resource) {
        return $resource('json-data/resume/skill/technical-skill.json');
    }
})(window.angular);