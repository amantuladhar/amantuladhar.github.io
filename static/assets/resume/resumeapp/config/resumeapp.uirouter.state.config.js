(function(angular) {
    'use strict';

    angular
        .module("ResumeApp")
        .config(uiRouterStateConfiguration);

    uiRouterStateConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function uiRouterStateConfiguration($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('section-home');

        $stateProvider
            .state('section-home', {
                url: '/section-home',
                templateUrl: 'template/section-resume-template.html'
            })
            .state('page-resume', {
                url: '/page-resume',
                templateUrl: 'template/section-resume-template.html',
                controller: 'ResumeController',
                controllerAs: 'rc'
            })
            .state('page-skills', {
                url: '/page-skills',
                templateUrl: 'template/section-skill-template.html',
                controller: 'SkillController',
                controllerAs: 'sc'
            })
            .state('page-blog', {
                url: '/page-blog',
                templateUrl: 'template/section-blog-template.html'
            })
            .state('page-contact', {
                url: '/page-contact',
                templateUrl: 'template/section-contact-template.html',
                controller: 'ContactController',
                controllerAs: 'cc'
            })
            .state('page-all', {
                url: '/page-all',
                views: {
                    '': {
                        templateUrl: 'template/section-all-template.html'
                    },
                    'resume@page-all': {
                        templateUrl: 'template/section-resume-template.html',
                        controller: 'ResumeController',
                        controllerAs: 'rc'
                    },
                    'skill@page-all': {
                        templateUrl: 'template/section-skill-template.html',
                        controller: 'SkillController',
                        controllerAs: 'sc'
                    },
                    'contact@page-all': {
                        templateUrl: 'template/section-contact-template.html',
                        controller: 'ContactController',
                        controllerAs: 'cc'
                    }
                }
            })
        ;
    }


})(window.angular);
