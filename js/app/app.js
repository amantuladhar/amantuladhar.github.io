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
            ;
        }])
        .filter('percentage', function () {
            var random = function (start, range) {
                var r = Math.floor(Math.random() * range) + start;
                return r + '%';
            };
            return function (input) {
                switch (input) {
                    case 'Confident':
                        return random(65, 15)
                    case 'Very Good':
                        return random(45, 15);
                    case 'Good':
                        return random(20, 25);
                    default:
                        return random(45, 15);
                        ;
                }
            };
        })

        .controller('SkillController', [function () {
            var SkillController = this;
            SkillController.bg = function () {
                return '#' + Math.floor(Math.random() * 16777215).toString(16);
            };
            SkillController.skills = [
                {
                    title: 'Code Skill',
                    data: [
                        {
                            title: "Java",
                            level: 'Confident'
                        },
                        {
                            title: 'Spring Framework',
                            level: 'Confident'
                        },
                        {
                            title: 'Spring Boot',
                            level: 'Confident'
                        },
                        {
                            title: 'Git',
                            level: 'Confident'
                        },
                        {
                            title: 'Maven & Gradle',
                            level: 'Confident'
                        },
                        {
                            title: 'Hibernate',
                            level: 'Very Good'
                        },
                        {
                            title: 'TestNG & JUnit',
                            level: 'Confident'
                        },
                        {
                            title: 'GulpJS',
                            level: 'Good'
                        },
                        {
                            title: 'GruntJS',
                            level: 'Good'
                        },
                        {
                            title: 'MySQL',
                            level: 'Confident'
                        },
                        {
                            title: 'Selenium',
                            level: 'Confident'
                        },
                        {
                            title: 'Javascript',
                            level: 'Confident'
                        },
                        {
                            title: 'JQuery',
                            level: 'Confident'
                        },
                        {
                            title: 'Android Programming',
                            level: 'Good'
                        },
                        {
                            title: 'Mercurial',
                            level: 'Good'
                        },
                        {
                            title: 'C and C++',
                            level: 'Very Good'
                        },
                        {
                            title: 'AngularJS 1.x',
                            level: 'Very Good'
                        },
                        {
                            title: 'NPM and Bower',
                            level: 'Very Good'
                        }
                    ]
                },
                {
                    title: 'Software Skills',
                    data: [
                        {
                            title: "IntelliJ IDEA",
                            level: 'Confident'
                        },
                        {
                            title: "Sublime",
                            level: 'Very Good'
                        },
                        {
                            title: 'Microsoft Office',
                            level: 'Very Good'
                        },
                        {
                            title: 'Smart Git & Source Tree',
                            level: 'Confident'
                        },
                        {
                            title: 'Linux',
                            level: 'Very Good'
                        },
                        {
                            title: 'SqlYog and WorkBench',
                            level: 'Very Good'
                        },
                        {
                            title: 'Adobe Photoshop',
                            level: 'Good'
                        },
                        {
                            title: 'Windows',
                            level: 'Very Good'
                        },
                        {
                            title: 'Bash And Zsh',
                            level: 'Good'
                        }
                    ]
                },

                {
                    title: 'Professional Skill',
                    data: [
                        {
                            title: "Communication",
                            level: 'Confident'
                        },
                        {
                            title: 'Leadership',
                            level: 'Good'
                        },
                        {
                            title: 'Confidence',
                            level: 'Very Good'
                        }
                    ]
                },
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
                    detail: "Studied at National College of Computer Studies. Passes with overall average GPA 3.5+"
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
                message: "Your Future is Created by What You Do Toady not Tomorrow",
                from: "Someone"
            };
        }])

        .controller('ContactController', [function () {
            var ContactController = this;
            ContactController.contact = {
                social: {
                    instagram: "instagram",
                    facebook: "facebook",
                    twitter: "twitter",
                    linkedin: "linkedin",
                    github: "github"
                },
                firstName: "Aman",
                lastName: "Tuladhar",
                jobTitle: "Java Developer / Programmer",
                objective: "Seeking a competitive and challenging environment where I can serve your organization and establish an enjoyable career for myself.",
                email: "atuladhar.aman@gmail.com",
                address: "Wotu Tole, Ward 24 Kathmandu - Nepal",
                phone: "+977 9841963787"
            };
        }]);

})(angular);