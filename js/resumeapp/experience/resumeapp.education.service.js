(function(angular) {
    'use strict';

    angular
        .module("ResumeApp")
        .factory("EducationService", EducationService);

    EducationService.$inject = ['$resource'];

    function EducationService($resource) {
        return $resource('json-data/resume/experience/education.json', {}, {'get': {isArray: true}})
    }


})(window.angular);