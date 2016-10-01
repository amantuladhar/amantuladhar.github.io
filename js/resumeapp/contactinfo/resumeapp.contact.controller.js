(function(angular) {
    'use strict';

    angular
        .module("ResumeApp")
        .factory('ContactInfoService', function($resource) {
            return $resource('json-data/resume/contact-information.json');
        })
        .controller('ContactController', ContactController);

    ContactController.$inject = ["ContactInfoService"];

    function ContactController(ContactInfoService) {
        var ContactController = this;

        ContactInfoService.get().$promise.then(function(response) {
            ContactController.contact = response;
        });
    }
})(window.angular);