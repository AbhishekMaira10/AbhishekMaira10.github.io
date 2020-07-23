jQuery(function(jQuery) {

  jQuery('body').on('click', '.zilla-likes a', function() {
    var link = jQuery(this);
    if (link.parent().hasClass('active')) return false;

    if(jQuery(this).hasClass('like')) {
      var type = 'like';
    } else {
      var type = 'dislike';
    }

    var id = jQuery(this).parent().attr('id');

    jQuery.ajax({
      type: 'POST',
      url: zilla_likes.ajaxurl,
      data: {
        action: 'zilla-likes', 
        likes_id: id,
        type: type,
      },
      xhrFields: { 
        withCredentials: true, 
      },
      success: function(data) {
        data = jQuery.parseJSON(data);
        link.addClass('active').find('span').html(data[type]).parents('.zilla-likes').addClass('active');
      },
    })

    return false;
  });

  if (jQuery('body.ajax-zilla-likes').length) {
    jQuery('.zilla-likes').each(function() {
      var id = jQuery(this).attr('id');
      jQuery(this).load(zilla_likes.ajaxurl, {
        action: 'zilla-likes', 
        post_id: id,
      });
    });
  }
});
