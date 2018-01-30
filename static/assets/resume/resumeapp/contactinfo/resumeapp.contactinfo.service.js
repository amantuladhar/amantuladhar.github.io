(function(angular) {
    'use strict';

    angular
        .module("ResumeApp")
        .factory('ContactInfoService', ContactInfoService);

    ContactInfoService.$inject = ['$resource'];

    function ContactInfoService($resource) {
        return $resource('json-data/resume/contact-information.json');
    }
})(window.angular);