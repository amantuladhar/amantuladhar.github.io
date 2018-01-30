(function(angular) {
    angular
        .module("ResumeApp")
        .run(configureNavigationBarBehaviour);

    configureNavigationBarBehaviour.$inject = ['$rootScope', '$timeout'];


    function configureNavigationBarBehaviour($rootScope, $timeout) {

        $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);


        function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
            addBehaviourToState(toState.name);
        }

        function addBehaviourToState(stateName) {
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
                $timeout(function() {
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
        }
    }
})(window.angular);