//Use Strict Mode
(function ($) {
    "use strict";

//Begin - Window Load
    $(window).load(function () {


        //==============___Page Loader___================

        $('#page-loader').delay(300).fadeOut(400, function () {

        });

        $('#loader-name').addClass('loader-left');
        $('#loader-job').addClass('loader-right');
        $('#loader-animation').addClass('loader-hide');

    });

//Begin - Document Ready
    $(document).ready(function () {

//==============___Page Loader___================
        $('#loading-wraper').fadeIn(300);


// ==============_Lightbox_================
//Nivo Lightbox
        $('a.nivobox').nivoLightbox({effect: 'fade'});


//==============___Scrollbars___================
        $('.section-vcardbody').perfectScrollbar({
            wheelSpeed: 0.9
        });

//==============___Menu & Pages Animation___================

        var linkHome = 0;
        var linkPage = '';

        function pageOn() {
            $('#main-menu').addClass('main-menu-pgactive');
            $('#section-home').addClass('section-vcardbody-pgactive');
            $('.profileActive').removeClass('profileActive');
            $('#profile2').addClass('profileActive');
            $('.section-vcardbody').perfectScrollbar({
                wheelSpeed: 0.9
            });

            linkHome = 1;
        }

        function pageOff() {
            $('.section-page-active').removeClass('section-page-active');
            $('#main-menu').removeClass('main-menu-pgactive');
            $('#section-home').removeClass('section-vcardbody-pgactive');
            $('.profileActive').removeClass('profileActive');
            $('#profile1').addClass('profileActive');
            linkHome = 0;
        }


        $(".link-page").on('click', function (event) {
            // event.preventDefault();
            var x = this;
            window.setTimeout(function(){
                var linkPage = '#' + $(x).attr('ui-sref');
                $('.menuActive').removeClass('menuActive');
                $(x).addClass('menuActive');
                $('.section-page-active').removeClass('section-page-active');
                $(linkPage).addClass('section-page-active');
                pageOn();
            },200)

        });


        $(".link-home").on('click', function (event) {
            // event.preventDefault();

            if (linkHome == 0) {
                //pageOn();
            }
            else if (linkHome == 1) {
                $('.menuActive').removeClass('menuActive');
                $(this).addClass('menuActive');
                pageOff();
            }
        });

//==============___Blog - Ajax___================
        function loadPost() {
            $.ajax({
                url: 'single.html', // URL HERE
                type: 'GET',
                success: function (html) {

                    var $lis = $(html).find('#blogPost'); // Loads the content inside #blogPost div

                    $("#postHere").html($lis);
                }
            });
        }

        $(".loadPost").on('click', function (event) {
            event.preventDefault();
            //$("#postHere").html('loading...');
            $('.section-page-active').removeClass('section-page-active');
            $('#page-blog-single').addClass('section-page-active');
            pageOn();
            loadPost();
        });

//End - Document Ready
    });

//End - Use Strict mode
})(jQuery);