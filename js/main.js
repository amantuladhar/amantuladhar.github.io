(function($) {
    "use strict";

    $(window).load(function() {
        //==============___Page Loader___================
        $('#page-loader').delay(300).fadeOut(400, function() {
        });
        $('#loader-name').addClass('loader-left');
        $('#loader-job').addClass('loader-right');
        $('#loader-animation').addClass('loader-hide');
    });
    $(document).ready(function() {
        $('#loading-wraper').fadeIn(300);
        $('.section-vcardbody').perfectScrollbar({
            wheelSpeed: 0.9
        });
    });

})(window.jQuery);
