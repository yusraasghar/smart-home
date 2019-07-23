(function ($) {
    "use strict";
    
    // // Preloader
    $(window).on('load', function () {
      if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
          $(this).remove();
        });
      }
    });
  
    // Back to top button
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });
    $('.back-to-top').click(function(){
      $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
      return false;
    });
    
      // $(document).ready(function() {
      //   $('.toggle-nav').click(function(e) {
      //     $(this).toggleClass('active');
      //     $('.navbar ul').toggleClass('active');
      
      //     e.preventDefault();
      //   });
      // });

      /*--/ Floor plan /--*/
      $('#carousel').owlCarousel({
          loop: true,
          margin: -1,
          items: 1,
          nav: true,
          navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true
      });
  
  })(jQuery);
 