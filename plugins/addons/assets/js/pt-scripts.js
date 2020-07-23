function control_video($video_block, event) {
  var audio = $video_block.find('audio'),
    video = $video_block.find('video');

  if (audio.length > 0) {
    if (event == 'play') {
      audio.get(0).play();
    } else if (event == 'pause') {
      audio.get(0).pause();
    }
  }
  if (video.length > 0) {
    if (event == 'play') {
      video.get(0).play();
    } else if (event == 'pause') {
      video.get(0).pause();
    }
  }
}

jQuery.fn.extend({
  toggleAttr: function (attr, a, b) {
    return this.attr(attr, this.attr(attr) == b ? a : b);
  }
});

function item_animation_delay() {
  var item_top = item_delay = 0;
  jQuery('.blog-item .wrap, .portfolio-block .wpb_animate_when_almost_visible').each(function () {
    var top = jQuery(this).offset().top;

    if (top == item_top) {
      item_delay = item_delay + 300;
    } else {
      item_top = top;
      item_delay = 0
    }

    if (item_delay != 0) {
      jQuery(this).css('animation-delay', item_delay + 'ms');
    }
  });
}

item_animation_delay();

var old_nav = new_nav = '';

if(jQuery('[data-section-nav]').length > 0) {
  old_nav = jQuery('.navigation .menu').html();
  jQuery('.navigation .menu > li').remove();
}

jQuery('[data-section-nav]').each(function(index) {
  var $this = jQuery(this),
      slug = $this.attr('data-section-nav'),
      title = $this.attr('data-section-title'),
      $navigation = jQuery('.navigation .menu');
  
  $navigation.append('<li class="menu-item" data-section-link="'+slug+'"><a href="#"><span>'+title+'</span></a></li>');

  jQuery(window).on('load scroll', function() {
    var scroll_top = parseInt(jQuery(this).scrollTop()+jQuery('header.site-header').outerHeight()),
        top = parseInt($this.offset().top);
    
    if(scroll_top >= top || (top == 0 && scroll_top == jQuery('header.site-header').outerHeight())) {
      $navigation.children('li:eq('+index+')').addClass('current-menu-item').siblings().removeClass('current-menu-item');
    }
  });
}).promise().done( function(){
  new_nav = jQuery('body').find('.navigation .menu').html();
});

jQuery(window).on('load resize', function() {
  if(old_nav) {
    if(jQuery(this).width() <= 991.98) {
      jQuery('.navigation .menu').html(old_nav);
    } else {
      jQuery('.navigation .menu').html(new_nav);
    }
  }
});

jQuery(document).on('click', '[data-section-link]', function() {
  var slug = jQuery(this).attr('data-section-link'),
  top = jQuery('[data-section-nav="'+slug+'"]').offset().top-jQuery('header.site-header').outerHeight();

  jQuery('body, html').animate({ scrollTop: top }, 1100);
  return false;
});

jQuery(document).ready(function ($) {
  "use strict";

  jQuery('.bg-overlay [data-parallax="true"]').each(function () {
    var $this = jQuery(this),
      url = $this.data('image-src');

    $this.parallax({
      imageSrc: url,
      mirrorContainer: $this.parent(),
      overScrollFix: true
    });
  });

  /* Document On Click */

  jQuery(document)
    /* Filter Buttons */
    .on('click', '.filter-buttons .button:not(.current)', function () {
      var $grid = jQuery(this).parents('.filter-buttons').next('.isotope');

      if ($grid.length == 0) return;

      jQuery(this).addClass('current').siblings().removeClass('current');

      var filterValue = jQuery(this).attr('data-filter');
      $grid.isotope({
        filter: filterValue
      });

      jQuery(window).trigger('resize').trigger('scroll');
    })
    /* BG Overlay Video */
    .on('click', '.bg-overlay a[data-video="true"]', function (e) {
      e.preventDefault();
      var $video = jQuery(this).parent().find('.video'),
        url = $video.attr('data-video-url'),
        type = $video.attr('data-video-type'),
        video = jQuery('<video />', {
          id: 'video',
          src: url,
          type: type,
          playsinline: true,
          autoplay: true,
          muted: true,
          loop: true
        });

      $video.find('video').get(0).play();
      $video.parents('.banner-area').addClass('plaing-video');
    })
    .on('click', '.bg-overlay .close', function () {
      e.preventDefault();
      var $video = jQuery(this).parent().find('.video');

      $video.find('video').fadeOut(400, function () {
        jQuery(this).remove();
      });
      $video.parents('.banner-area').removeClass('plaing-video');
    });

  jQuery(window).scroll(num_scr);

  jQuery(window).on('load resize', function () {
    jQuery('.heading-block-on-side').each(function () {
      var $parent = jQuery(this).parent(),
        left_offset = $parent.offset().left,
        right_offset = jQuery(window).width() - left_offset - jQuery(this).parent().outerWidth() + jQuery(this).outerWidth();

      if (jQuery(this).hasClass('on-right')) {
        jQuery(this).css('right', -right_offset);
      } else {
        jQuery(this).css('left', -left_offset);
      }
    });

    jQuery('.side-img-container').each(function() {
      var $this = jQuery(this),
          lo = $this.offset().left-$this.parents('.main-container').offset().left,
          ro = $this.parents('.main-container').width()-lo-$this.width();
      if($this.hasClass('align-left')) {
        $this.find('.sic-img div').css('left', -lo);
      } else {
        $this.find('.sic-img div').css('right', -ro);
      }
    });
  });

  jQuery(window).on('load resize scroll mousewheel', function() {
    jQuery('.side-img-container.sticky-block').each(function() {
      var $this = jQuery(this),
          $block = $this.find('.sic-img div'),
          wh = jQuery(window).height(),
          scrollTop = jQuery(window).scrollTop(),
          to = $this.offset().top,
          bo = to+$this.height();
          
      $block.css('max-height', wh);

      if(scrollTop >= to && scrollTop+wh < bo) {
        $block.stop().removeClass('fixed bottom').addClass('fixed').css('transform', 'translateY('+(scrollTop-to)+'px)');
      } else if(scrollTop+wh >= bo) {
        $block.stop().css('transform', 'translateY('+(bo-wh-to)+'px)');
      } else {
        $block.stop().css('transform', 'translateY(0px)');
      }
    });
  });

  jQuery(window).on('load scroll', function () {
    var scroll_top = jQuery(window).scrollTop(),
      window_height = jQuery(window).height();

    jQuery('.bg-overlay .video').each(function () {
      var top_offset = parseInt(jQuery(this).offset().top),
        height = parseInt(jQuery(this).height()),
        mediaVideo = jQuery(this).find('video').get(0),
        mediaAudio = jQuery(this).find('audio');

      if (scroll_top + window_height >= top_offset && scroll_top <= top_offset + height) {
        if (!jQuery(this).parent().parent().hasClass('banner-item') && !jQuery(this).parent().parent().parent().hasClass('fn-bgs')) {
          jQuery(this).addClass('is-playing');
          mediaVideo.play();
          if (mediaAudio) {
            mediaAudio.trigger('play');
          }
        }
      } else {
        jQuery(this).removeClass('is-playing');
        mediaVideo.pause();
        if (mediaAudio) {
          mediaAudio.trigger('pause');
        }
      }
    });

    jQuery('.rate-line div').each(function() {
      var el_top = jQuery(this).offset().top;

      if(scroll_top + window_height >= el_top) {
        jQuery(this).css('width', jQuery(this).attr('data-percent'));
      }
    });
  });

  function num_scr() {
    jQuery('.num-box .number').each(function () {
      var top = jQuery(document).scrollTop() + jQuery(window).height();
      var pos_top = jQuery(this).offset().top;
      if (top > pos_top) {
        var number = parseInt(jQuery(this).html());
        if (!jQuery(this).hasClass('animated')) {
          jQuery(this).addClass('animated').prop('Counter', 0).animate({
            Counter: number
          }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
              jQuery(this).html(function (i, txt) {
                return txt.replace(/\d+/, Math.ceil(now));
              });
            }
          });
        }
      }
    });
  }

  jQuery(document).on('click', '.video-controls .pause, .play-video:not([data-type])', function () {
    var $this = jQuery(this),
      $video_block = $this.parents('.bg-overlay').find('.video'),
      mediaVideo = $this.parents('.bg-overlay').find('video').get(0),
      mediaAudio = '',
      c_time = mediaVideo.currentTime;

    if ($this.hasClass('play-video')) {
      var strings = $this.attr('data-strings').split('||');
      $video_block.addClass('show');
      $this.toggleAttr('data-magic-cursor-text', strings[0], strings[1]);
      $this.parents('.bg-overlay').find('.video-controls').removeClass('hide');

      if (!mediaVideo.paused && $video_block.hasClass('show')) {
        mediaVideo.pause();
        if (mediaAudio = $this.parents('.bg-overlay').find('audio').get(0)) {
          mediaAudio.pause();
        }
      }
    }

    if (mediaAudio = $this.parents('.bg-overlay').find('audio').get(0)) {
      if (mediaVideo.paused) {
        mediaAudio.currentTime = c_time;
        mediaAudio.play();
      } else {
        mediaAudio.pause();
      }
    }

    if (mediaVideo.paused) {
      mediaVideo.play();
      $this.removeClass('active');
      $video_block.addClass('is-playing');
    } else {
      mediaVideo.pause();
      $this.addClass('active');
      $video_block.removeClass('is-playing');
    }
  }).on('click', '.video-controls .mute', function () {
    var $this = jQuery(this),
      mediaVideo = $this.parents('.bg-overlay').find('video').get(0),
      mediaAudio = $this.parents('.bg-overlay').find('audio').get(0),
      c_time = mediaVideo.currentTime;

    if (mediaAudio) {
      if (mediaAudio.muted) {
        mediaAudio.currentTime = c_time;
        mediaAudio.muted = false;
        if (!mediaVideo.paused) {
          mediaAudio.play();
        }
        $this.addClass('active');
      } else {
        mediaAudio.muted = true;
        $this.removeClass('active');
      }
    } else {
      if (mediaVideo.muted) {
        mediaVideo.muted = false;
        $this.addClass('active');
      } else {
        mediaVideo.muted = true;
        $this.removeClass('active');
      }
    }
  });

  jQuery(document).on('click', '.popup-gallery .popup-item a, .single-popup-item', function (event) {
    if (jQuery(document).find('.pswp').length == 0) {
      jQuery(document).find('#page').append('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"> <div class="pswp__bg"></div><div class="pswp__scroll-wrap"> <div class="pswp__container"> <div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"> <div class="pswp__top-bar"> <div class="pswp__counter"></div><button class="pswp__button pswp__button--close" data-magic-cursor="link-small" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" data-magic-cursor="link-small" title="Share"></button> <button class="pswp__button pswp__button--fs" data-magic-cursor="link-small" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" data-magic-cursor="link-small" title="Zoom in/out"></button> <div class="pswp__preloader"> <div class="pswp__preloader__icn"> <div class="pswp__preloader__cut"> <div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> <div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" data-magic-cursor="link-small" title="Previous (arrow left)"> </button> <button class="pswp__button pswp__button--arrow--right" data-magic-cursor="link-small" title="Next (arrow right)"> </button> <div class="pswp__caption"> <div class="pswp__caption__center"></div></div></div></div></div>');
    }

    var $pswp = jQuery(document).find('.pswp')[0];
    var image = [];

    if (!jQuery(this).hasClass('permalink')) {

      event.preventDefault();

      var image = [];
      if (jQuery(this).hasClass('single-popup-item')) {
        var $pic = jQuery(this);
      } else {
        var $pic = jQuery(this).parents('.popup-gallery');
      }

      var getItems = function () {
        var items = [],
          $el = '';
        if ($pic.hasClass('owl-carousel')) {
          $el = $pic.find('.owl-item:not(.cloned) .popup-item');
        } else if ($pic.find('.swiper-container').length > 0) {
          $el = $pic.find('.popup-item:not(.swiper-slide-duplicate)');
        } else if ($pic.hasClass('single-popup-item')) {
          $el = $pic;
        } else {
          $el = $pic.find('.popup-item');
        }

        $el.each(function () {
          var $el = jQuery(this).find('a:not(.permalink)');
          if (jQuery(this).hasClass('single-popup-item')) {
            $el = jQuery(this);
          }
          var $href = $el.attr('href'),
            $size = $el.attr('data-size').split('x'),
            $width = $size[0],
            $height = $size[1];

          if ($el.attr('data-type') == 'video') {
            var item = {
              html: $el.attr('data-video')
            };
          } else {
            var item = {
              src: $href,
              w: $width,
              h: $height
            }
          }

          items.push(item);
        });
        return items;
      }

      var items = getItems();

      jQuery.each(items, function (index, value) {
        image[index] = new Image();
        if (value['src']) {
          image[index].src = value['src'];
        }
      });

      var $index = jQuery(this).parents('.popup-item').index();

      if (jQuery(this).hasClass('single-popup-item')) {
        $index = 1;
      }
      if (jQuery(this).parent().hasClass('thumbnails')) {
        $index++;
      }
      if (jQuery(this).parents('.popup-gallery').find('.grid-sizer').length > 0) {
        $index = $index - 1;
        if (jQuery(this).parents('.popup-gallery').find('.grid-sizer + .hidden').length > 0) {
          $index = $index - 1;
        }
      }
      if ($pic.hasClass('owl-carousel') || $pic.hasClass('.portfolio-items') || jQuery(this).data('id')) {
        $index = jQuery(this).data('id') - 1;
      }
      var options = {
        index: $index,
        bgOpacity: 0.7,
        showHideOpacity: true
      }

      var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
      lightBox.init();

      lightBox.listen('beforeChange', function () {
        var currItem = jQuery(lightBox.currItem.container);
        jQuery('.pswp__item .pswp__video').removeClass('active');
        var currItemIframe = currItem.find('.pswp__video').addClass('active');
        jQuery('.pswp__item .pswp__video').each(function () {
          if (!jQuery(this).hasClass('active')) {
            jQuery(this).attr('src', jQuery(this).attr('src'));
          }
        });
      });

      lightBox.listen('close', function () {
        jQuery('.pswp__item .pswp__zoom-wrap').remove();
      });
    }
  });
});