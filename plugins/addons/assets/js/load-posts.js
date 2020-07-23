jQuery(document).ready(function ($) {
  "use strict";

  jQuery('.loadmore-button').each(function () {
    var pageNum = parseInt(jQuery(this).attr('data-start-page')) + 1,
      max = parseInt(jQuery(this).attr('data-max')),
      nextLink = jQuery(this).attr('data-next-link'),
      load_wrap = jQuery(jQuery(this).attr('data-wrap')),
      type = 'other',
      item_tag = 'article';

    jQuery(this).on('click', function () {
      jQuery(this).parent().after('<div class="load-items-area load-items-' + pageNum + '"></div>');

      var button = jQuery(this);
      button.addClass('loading');
      jQuery('#mouse-cursor .mc-b').addClass('loading');

      if (load_wrap.hasClass('portfolio-type-justified')) {
        type = 'justified';
      } else if (load_wrap.hasClass('products')) {
        type = 'product';
        item_tag = 'li';
      }

      jQuery('.load-items-' + pageNum).load(nextLink + ' ' + jQuery(this).attr('data-wrap') + ' ' +item_tag,
        function () {
          var $html = jQuery(this).find(item_tag);
          var load_s = jQuery(this);
          
          load_s.imagesLoaded(function () {
            load_wrap.append($html);
            load_s.remove();
            if (type == 'justified') {
              load_wrap.justifiedGallery('norewind').on('jg.rowflush', function (e) {
                jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)").each(function () {
                  var $el = jQuery(this);
                  $el.vcwaypoint(function () {
                    $el.addClass("wpb_start_animation animated")
                  }, {
                    offset: "85%"
                  });
                })
              });
            } else {
              load_wrap.isotope('appended', $html);
            }
            button.removeClass('loading');
            jQuery('#mouse-cursor .mc-b').removeClass('loading');
            jQuery(window).trigger('resize').trigger('scroll');
            jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)").each(function () {
              var $el = jQuery(this);
              $el.vcwaypoint(function () {
                $el.addClass("wpb_start_animation animated")
              }, {
                offset: "85%"
              })
            });
            item_animation_delay();
          });

          pageNum++;
          nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/' + pageNum);
        }
      );

      if (pageNum >= max) {
        jQuery(this).parent().fadeOut();
      }

      setTimeout(function () {
        jQuery(window).trigger('resize').trigger('scroll');
      }, 500);

      return false;
    });
  });
});