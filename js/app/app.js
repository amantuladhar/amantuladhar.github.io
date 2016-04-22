(function (angular) {
    'use strict';

    angular.module("ResumeApp", ['ui.router', 'ngAnimate'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

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
                            templateUrl: 'template/section-all-template.html',
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
        }])
        .run(['$rootScope', '$timeout', '$window', function ($rootScope, $timeout, $window) {


            var addBehaviourToState = function (stateName) {
                // debugger;

                var $element = $('a[ui-sref=' + stateName + ']');

                if (stateName === 'section-home' || stateName === 'page-all') {

                    $('.menuActive').removeClass('menuActive');
                    $($element).addClass('menuActive');
                    $('.section-page-active').removeClass('section-page-active');
                    $('#main-menu').removeClass('main-menu-pgactive');
                    $('#section-home').removeClass('section-vcardbody-pgactive');
                    $('.profileActive').removeClass('profileActive');
                    $('#profile1').addClass('profileActive');

                } else {

                    $timeout(function () {
                        var linkPage = '#' + $($element).attr('ui-sref');
                        $('.menuActive').removeClass('menuActive');
                        $($element).addClass('menuActive');
                        $('.section-page-active').removeClass('section-page-active');
                        $(linkPage).addClass('section-page-active');

                        $('#main-menu').addClass('main-menu-pgactive');
                        $('#section-home').addClass('section-vcardbody-pgactive');
                        $('.profileActive').removeClass('profileActive');
                        $('#profile2').addClass('profileActive');
                        $('.section-vcardbody').perfectScrollbar({
                            wheelSpeed: 0.9
                        });
                    }, 300);

                }
            };

            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    addBehaviourToState(toState.name);
                })
        }])
        .filter('percentage', function () {
            var random = function (start, range) {
                var r = Math.floor(Math.random() * range) + start;
                return r + '%';
            };
            return function (input) {
                switch (input) {
                    case 'PROFICIENT':
                        return random(70, 10);
                    case 'FAMILIAR':
                        return random(50, 10);
                    case 'BEGINNER':
                        return random(25, 10);
                    default:
                        return random(50, 10);
                }
                ;
            }
        })

        .controller('SkillController', ['percentageFilter', function (percentageFilter) {
            var SkillController = this;

            SkillController.bg = function () {
                return '#' + Math.floor(Math.random() * 16777215).toString(16);
            };

            SkillController.skills = [
                {
                    title: 'Technical Skills',
                    data: [
                        {
                            title: "Java",
                            level: 'PROFICIENT',
                            background: SkillController.bg(),
                            percentage: percentageFilter('PROFICIENT')
                        },
                        {
                            title: 'Spring Framework',
                            level: 'PROFICIENT',
                            background: SkillController.bg(),
                            percentage: percentageFilter('PROFICIENT')
                        },
                        {
                            title: 'Spring Boot',
                            level: 'PROFICIENT',
                            background: SkillController.bg(),
                            percentage: percentageFilter('PROFICIENT')
                        },
                        {
                            title: 'Git',
                            level: 'PROFICIENT',
                            background: SkillController.bg(),
                            percentage: percentageFilter('PROFICIENT')
                        },
                        {
                            title: 'Maven & Gradle',
                            level: 'PROFICIENT',
                            background: SkillController.bg(),
                            percentage: percentageFilter('PROFICIENT')
                        },
                        {
                            title: 'Hibernate',
                            level: 'FAMILIAR',
                            background: SkillController.bg(),
                            percentage: percentageFilter('FAMILIAR')
                        },
                        {
                            title: 'TestNG & JUnit',
                            level: 'PROFICIENT',
                            background: SkillController.bg(),
                            percentage: percentageFilter('PROFICIENT')
                        },
                        {
                            title: 'GulpJS',
                            level: 'BEGINNER',
                            background: SkillController.bg(),
                            percentage: percentageFilter('BEGINNER')
                        },
                        {
                            title: 'GruntJS',
                            level: 'BEGINNER',
                            background: SkillController.bg(),
                            percentage: percentageFilter('BEGINNER')
                        },
                        {
                            title: 'MySQL',
                            level: 'PROFICIENT',
                            background: SkillController.bg(),
                            percentage: percentageFilter('PROFICIENT')
                        },
                        {
                            title: 'Selenium',
                            level: 'PROFICIENT',
                            background: SkillController.bg(),
                            percentage: percentageFilter('PROFICIENT')
                        },
                        {
                            title: 'Javascript',
                            level: 'PROFICIENT',
                            background: SkillController.bg(),
                            percentage: percentageFilter('PROFICIENT')
                        },
                        {
                            title: 'JQuery',
                            level: 'PROFICIENT',
                            background: SkillController.bg(),
                            percentage: percentageFilter('PROFICIENT')
                        },
                        {
                            title: 'Android Programming',
                            level: 'BEGINNER',
                            background: SkillController.bg(),
                            percentage: percentageFilter('BEGINNER')
                        },
                        {
                            title: 'Mercurial',
                            level: 'BEGINNER',
                            background: SkillController.bg(),
                            percentage: percentageFilter('BEGINNER')
                        },
                        {
                            title: 'C and C++',
                            level: 'FAMILIAR',
                            background: SkillController.bg(),
                            percentage: percentageFilter('FAMILIAR')
                        },
                        {
                            title: 'AngularJS 1.x',
                            level: 'FAMILIAR',
                            background: SkillController.bg(),
                            percentage: percentageFilter('FAMILIAR')
                        },
                        {
                            title: 'NPM and Bower',
                            level: 'FAMILIAR',
                            background: SkillController.bg(),
                            percentage: percentageFilter('FAMILIAR')
                        },
                        {
                            title: 'Scala',
                            level: 'FAMILIAR',
                            background: SkillController.bg(),
                            percentage: percentageFilter('FAMILIAR')
                        },
                        {
                            title: 'Play Framework 2.x',
                            level: 'BEGINNER',
                            background: SkillController.bg(),
                            percentage: percentageFilter('BEGINNER')
                        },
                        {
                            title: 'JPA 2.x',
                            level: 'FAMILIAR',
                            background: SkillController.bg(),
                            percentage: percentageFilter('FAMILIAR')
                        },
                        {
                            title: 'Spring Data JPA',
                            level: 'FAMILIAR',
                            background: SkillController.bg(),
                            percentage: percentageFilter('FAMILIAR')
                        }
                    ]
                },
                {
                    title: 'Software Skills',
                    data: [
                        {
                            title: "IntelliJ IDEA",
                            level: 'PROFICIENT',
                            background: SkillController.bg(),
                            percentage: percentageFilter('PROFICIENT')
                        },
                        {
                            title: "Sublime",
                            level: 'FAMILIAR',
                            background: SkillController.bg(),
                            percentage: percentageFilter('FAMILIAR')
                        },
                        {
                            title: 'Microsoft Office',
                            level: 'FAMILIAR',
                            background: SkillController.bg(),
                            percentage: percentageFilter('FAMILIAR')
                        },
                        {
                            title: 'Smart Git & Source Tree',
                            level: 'PROFICIENT',
                            background: SkillController.bg(),
                            percentage: percentageFilter('PROFICIENT')
                        },
                        {
                            title: 'Linux',
                            level: 'FAMILIAR',
                            background: SkillController.bg(),
                            percentage: percentageFilter('FAMILIAR')
                        },
                        {
                            title: 'SQLyog and MySQL Workbench',
                            level: 'FAMILIAR',
                            background: SkillController.bg(),
                            percentage: percentageFilter('FAMILIAR')
                        },
                        {
                            title: 'Adobe Photoshop',
                            level: 'BEGINNER',
                            background: SkillController.bg(),
                            percentage: percentageFilter('BEGINNER')
                        },
                        {
                            title: 'Windows',
                            level: 'FAMILIAR',
                            background: SkillController.bg(),
                            percentage: percentageFilter('FAMILIAR')
                        },
                        {
                            title: 'Bash And Zsh',
                            level: 'BEGINNER',
                            background: SkillController.bg(),
                            percentage: percentageFilter('BEGINNER')
                        }
                    ]
                },

                {
                    title: 'Professional Skill',
                    data: [
                        {
                            title: "Communication",
                            level: 'PROFICIENT',
                            background: SkillController.bg(),
                            percentage: percentageFilter('PROFICIENT')
                        },
                        {
                            title: 'Leadership',
                            level: 'BEGINNER',
                            background: SkillController.bg(),
                            percentage: percentageFilter('BEGINNER')
                        },
                        {
                            title: 'Confidence',
                            level: 'FAMILIAR',
                            background: SkillController.bg(),
                            percentage: percentageFilter('FAMILIAR')
                        }
                    ]
                }
            ];
        }])

        .controller('ResumeController', [function () {

            var ResumeController = this;
            ResumeController.education = [
                {
                    title: "Bachelor In Information Management",
                    university: "Tribhuvan University",
                    courseLength: "4 years",
                    graduationDay: "October 2015",
                    detail: "Studied at National College of Computer Studies. Passes with overall average GPA 3.7+"
                },
                {
                    title: "Higher Secondary School",
                    university: "Higher Secondary Education Board",
                    courseLength: "2 years",
                    graduationDay: "2011",
                    detail: "Studied at National College of Computer Studies. Passes with First Division"
                }
            ];

            ResumeController.workExperience = [
                {
                    company: "PointClickCare",
                    title: "Java Developer",
                    from: "June 2015",
                    to: "Current",
                    description: ["Develop, Maintain and Enhance the Existing Web Application using Java, Spring, Hibernate, Javascript, AngularJs and many more.."]
                },
                {
                    company: "Smart Data Solutions",
                    title: "Java Developer Intern",
                    from: "April 2015",
                    to: "June 2015",
                    description: [
                        "Developed the structure for Automated test case using Selenium.",
                        "Develop, Maintain and Enhance the Existing Web Application using Java, Spring, Hibernate, Javascript, AngularJs and many more.."
                    ]
                }
            ];
            ResumeController.quote = {
                message: "Your Future is Created by What You Do Today not Tomorrow",
                from: "Someone"
            };
        }])

        .controller('ContactController', ['$scope', '$window', function ($scope, $window) {
            var ContactController = this;
            ContactController.contact = {
                social: {
                    instagram: "https://www.instagram.com/atuladhar.aman/",
                    facebook: "https://www.facebook.com/atuladhar.aman",
                    twitter: "https://twitter.com/atuladhar_aman",
                    linkedin: "https://www.linkedin.com/in/aman-tuladhar-572878ba?trk=hp-identity-name",
                    github: "https://github.com/atuladhar-aman/"
                },
                firstName: "Aman",
                lastName: "Tuladhar",
                jobTitle: "Java Developer / Programmer",
                objective: "Seeking a Competitive and Enjoyable Environment where I'm constantly challenged and given a chance to learn new things",
                email: "atuladhar.aman@gmail.com",
                address: "Wotu Tole, Ward 24 Kathmandu - Nepal",
                phone: "+977 9841963787"
            };
        }])
        .directive('detectWindowResize', ['$window', '$state', function ($window, $state) {

            return {
                link: link,
                restrict: 'E',
                template: '{{changeState()}}'
            };

            function link(scope, element, attrs) {
                scope.resizeProp = {};
                scope.resizeProp.width = $window.innerWidth;
                scope.resizeProp.changed = false;

                angular.element($window).bind('resize', function () {


                    scope.resizeProp.width = $window.innerWidth;
                    scope.resizeProp.changed = false;
                    // manuall $digest required as resize event
                    // is outside of angular
                    scope.$digest();
                });

                scope.changeState = function () {
                    if (scope.resizeProp.width <= 991 && !scope.resizeProp.changed) {
                        $state.go("page-all");
                        scope.resizeProp.changed = true;
                    } else if (!scope.resizeProp.changed && scope.resizeProp.width > 991) {
                        $state.go("section-home");
                        scope.resizeProp.changed = true;
                    }
                };

            }

        }]);
})(angular);