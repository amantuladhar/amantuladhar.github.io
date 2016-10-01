(function(angular) {
    'use strict';

    angular
        .module("ResumeApp")
        .factory("WorkExperienceService", WorkExperienceService);

    WorkExperienceService.$inject = ['$resource'];

    function WorkExperienceService($resource) {
        return $resource('json-data/resume/experience/work.json', {}, {'get': {isArray: true}})
    }

})(window.angular);