/* !stack ------------------------------------------------------------------- */
jQuery(document).ready(function($) {
	modal();
	logIO();
	gnaviCurrent();
	fixedHeader();
});

/* !isUA -------------------------------------------------------------------- */
var isUA = (function(){
	var ua = navigator.userAgent.toLowerCase();
	indexOfKey = function(key){ return (ua.indexOf(key) != -1)? true: false;}
	var o = {};
	o.ie      = function(){ return indexOfKey("msie"); }
	o.fx      = function(){ return indexOfKey("firefox"); }
	o.chrome  = function(){ return indexOfKey("chrome"); }
	o.opera   = function(){ return indexOfKey("opera"); }
	o.android = function(){ return indexOfKey("android"); }
	o.ipad    = function(){ return indexOfKey("ipad"); }
	o.ipod    = function(){ return indexOfKey("ipod"); }
	o.iphone  = function(){ return indexOfKey("iphone"); }
	return o;
})();

/* modal */
var modal = function() {
    //open
    $('[data-trigger="modalOpen"]').on('click', function() {
        var href = $(this).attr('href');
        var el = '<div class="modal" data-target="modal"></div>';
        $('body').append(el);
        $('[data-target="modal"]').load(href);
        $('html , body').attr('aria-hidden' , 'true');
        return false;
    });
    //close
    $(document).on('click', '[data-trigger="modalClose"]', function() {
        $.when(
            $(this).parents('[data-target="modal"]').fadeOut(200)
        ).done(function(){
            $(this).parents('[data-target="modal"]').remove();
            $('html , body').removeAttr('aria-hidden');
        });
        return false;
    });
}

/* !logIn/logOut ---------------------------------------------------------------- */
var logIO = function(){
	$().ready(function(){
		var rlLogin = false;
		var name = "rllogin=";
		var ca = document.cookie.split('; ');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			if (c.indexOf(name) != -1) {
				rlLogin = c.substring(name.length, c.length);
				break;
			}
		}
		if(rlLogin) {
			$("#logIO").removeClass('ioDisabled');
		} else {
			$("#logIO").addClass('ioDisabled');
		}
	});
};

/* !gnaviCurrent ---------------------------------------------------------------- */
var gnaviCurrent = function() {
	var dirName = location.pathname.split('/')[1],
		href = dirName && dirName !== 'index.html' ? '/' + dirName + '/' : '/';
		$('.jsGnavCurrent').find('a[href="'+ href +'"]').parent('li').addClass('current');
};

/* !fixedHeader ---------------------------------------------------------------- */
var fixedHeader = function() {
	var unFixed = isUA.android() || isUA.ipad() || isUA.iphone() || isUA.ipod() || $('body').hasClass('unFixedHeader');
	if(!unFixed) {
		var $window = $(window),
			$el = $('.jsAddFixedBar'),
			$parts = $el.find($('.jsFixedParts')),
			startHeight = 400,
			speed = 200,
			$fixed, isFixed;
		$el.append('<div class="rc-h-fixed-bar" aria-hidden="true"><div class="rc-h-inner"></div></div>');
		$fixed = $el.find($('.rc-h-fixed-bar'));
		$parts.clone(true).appendTo($fixed.children($('.rc-h-inner')));
		$fixed.find($('.rc-h-action-btn')).wrap('<div class="rc-h-action-nav"></div>');
		$fixed.hide().css('top', - $fixed.outerHeight() - 5);
		$window.on('scroll', function() {
			if($window.scrollTop() >= startHeight) {
				if(!isFixed) {
					$fixed.show(0, function() {
						$fixed.animate({'top' : 0}, speed);
					});
					isFixed = true;
				}
			} else {
				if(isFixed) {
					$fixed.animate({'top' : - $fixed.outerHeight() - 5}, speed, function() {
						$fixed.hide();
					});
					isFixed = false;
				}
			}
		});
		$window.trigger('scroll');
	}
};
