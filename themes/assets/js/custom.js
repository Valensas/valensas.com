/*******************************************************************************
 * 01. JQUERY DOCUMENT
*******************************************************************************/
jQuery(document).ready(function(){

		//EXTERNAL LINKS
		jQuery('a[rel*=external]').click( function() {
			window.open(this.href);
			return false;
		});

		//IMAGE FADE HOVER
		jQuery(".thumb-fade .fade-hover").hover(function(){
		jQuery(this).fadeTo(300, 0.3); // This should set the opacity to 100% on hover
		},function(){
		jQuery(this).fadeTo(500, 0); // This should set the opacity back to 60% on mouseout
		}).fadeTo(0, 0);

		//PRETTY PHOTO
		jQuery("a[rel^='tag']").prettyPhoto({
			animationSpeed:'fast',
			slideshow:3000,
			show_title:false,
			deeplinking: false,
			opacity: 0.5
		});

		//ADD REL FOR FLICKR
		jQuery('.flickr_badge_image a').each(function(i){
		var src = jQuery(this).find('img').attr('src');
		var title = jQuery(this).find('img').attr('title');
		var src2 = src.replace(/_s.jpg/g, '.jpg');
		jQuery(this).removeAttr('href');
			jQuery(this).attr({
				href: src2,
				title: title,
				rel: 'tag[Flickr]'
			});
		});

		//PRETTY PHOTO FOR FLICKR
		jQuery(".flickr_badge_image a[rel^='tag']").prettyPhoto({
			animationSpeed:'fast',
			slideshow:3000,
			autoplay_slideshow: true,
			show_title:false,
			deeplinking: false,
			opacity: 0.5
		});

});



/*******************************************************************************
 * 02. IMAGE PRELOADER
*******************************************************************************/
jQuery(function(){
	var $imgContainerClass = '.thumb-preloader';
	var $images = jQuery($imgContainerClass+' a img');
	var $max = $images.length;
	jQuery('a.preloader').each(function(){
		jQuery('<span class="image-loading" />').prependTo(jQuery(this));
	});
	$images.remove();
	if ($max > 0){
		LoadImage(0, $max);
	}
	function LoadImage(index, $max){
		if (index < $max){
			jQuery('<span id="img'+(index+1)+'" />').each(function(){
				jQuery(this).prependTo(jQuery('a.preloader .image-loading').eq(index));
			});
			var $img = new Image();
			var $curr = jQuery('#img'+(index+1));
			jQuery($img).load(function(){
				jQuery(this).css({display: 'none', opacity: 0});
				jQuery($curr).append(this);
				jQuery(this).css({display: 'block'}).animate({opacity: 1}, 300, function(){
					jQuery(this).parent().css({backgroundImage: 'none'});
					if (index == ($max-1)){
					} else {
						LoadImage(index+1, $max);
					}
				});
			}).error(function(){
				jQuery($curr).remove();
				LoadImage(index+1, $max);
			}).attr({
				src: jQuery($images[index]).attr('src'), 
				title: jQuery($images[index]).attr('title'), 
				alt: jQuery($images[index]).attr('alt')
			}).addClass(jQuery($images[index]).attr('class'));
		}
	}
});



/*******************************************************************************
 * 03. PORTFOLIO FILTER & PLACEHOLDER
*******************************************************************************/
jQuery.fn.rdy = function(func) {
	this.length && func.apply(this);
	return this;
};


function getParameterByName(name, hash) {
	var url = hash ? window.location.hash.replace('#', '?') : window.location.search;
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


jQuery.fn.placeHolder = function(default_value) {
	var el = jQuery(this);
	default_value = default_value || el.attr('placeholder');
	
	if(default_value && default_value.length) {
		el.focus(function() {
			if(el.val() == el.data('default_value')) el.val('').removeClass('empty');
		});

		el.blur(function() {
			if(!el.val().length) el.val(el.data('default_value')).addClass('empty');
		});

		el.closest('form').submit(function() {
			if(el.val() == el.data('default_value')) el.val('');
		});

		el.data('default_value', default_value).attr('title', default_value).trigger('blur');
	}
	
	return this;
};


jQuery(function($) {

	//PORTFOLIO FILTERS
	jQuery('.portfolio-filters').rdy(function() {
		var $list = $('.portfolio-list');
		var $data = $list.clone();

		jQuery('.portfolio-sortable a').click(function() {
			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');

			href = $(this).attr('href').replace('#category=', '');

			var filtered_data = (href == 'all') ? $data.find('.portfolio-item') : $data.find('.portfolio-item.' + href);
			$list.quicksand(filtered_data, {duration: 250});

		});

		if(getParameterByName('category', true) && getParameterByName('category', true) != 'all') {
			jQuery('.portfolio-sortable a[href="#category=' + getParameterByName('category', true) + '"]').trigger('click');
		}
	});

	//PLACEHOLDERS
	jQuery('[placeholder]').each(function(i, el) {
		jQuery(el).placeHolder();
	});

});