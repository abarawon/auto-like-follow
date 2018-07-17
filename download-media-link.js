/*
created by rafael santos (rafael@widenet.com.br)
https://www.instagram.com/rafadeveloper/
https://twitter.com/rafadeveloper
past this code on the javascript console of page (instagram home feed)
the script run autofollow on feed
*/

var objects_img_list = {
		insta_photo_page: 'main[role="main"] article div[role="button"] img[srcset*=".jpg"]',
		insta_photo_popup: 'div[role="dialog"] article div[role="button"] img[srcset*=".jpg"]',
		instagram_story: 'div[role="dialog"] article div[role="button"] img[srcset*=".jpg"]',
		photo_500px: 'div[role="dialog"] article div[role="button"] img[srcset*=".jpg"]'
	},
	randon_time = function() {
			var fast_time = 3500 + Math.floor((Math.random() * 3000) + 1);
			console.log('(fast timing %s)', fast_time/1000);
			return fast_time;
		},
	set_download_button = function(url, name) {
			$_jq('#download_button_img')
				.attr('href', url)
				.text('Download '+(name || 'link'))
				.removeAttr('disabled')
				.attr('target', '_blank')
				.css('background-color', 'blue');
		},
	check_download_url = function() {
			for (var name in objects_img_list) {
			    if (!objects_img_list.hasOwnProperty(name)) continue;
			    var object_img_syntax = objects_img_list[name];
			    var object_img = $_jq(object_img_syntax);
			    if (object_img.length == 1) {
			    	var img_url = object_img.attr('src');
			    	set_download_button(img_url, name);
			    	break;
			    }
			}
		},
	start_download_button = function() {
			console.log('------------------------');
			if ($_jq('#download_button_img').length == 0) {
				var button_style = [
						'display:block;',
						'position:fixed;',
						'left:0;',
						'top:0;',
						'z-index:999999;',
						'padding:5px 3px;',
						'background-color:grey;',
						'color:white;',
						'font-weight:bold;',
						'font-size:16px;',
					];
				$_jq('body').append('<a href="#" id="download_button_img" style="'+button_style.join(' ')+'" disabled></a>');
			}
			check_download_url();
		};


if ('undefined' == typeof window.jQuery) {
	    window.$_old = window.$;
		window.$_jq = null;

	(function(d, s, id) { 
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s);
		js.id = id;
		js.type = 'text/javascript';
		js.src = "https://code.jquery.com/jquery-2.2.4.js"; 
		js.onload = js.onreadystatechange = function() {
			console.log( 'jq carregado', this );
			setTimeout(function(){
				console.log( 'init origin jq' );
				window.$_jq = window.$;
				window.$ = window.$_old;
				start_download_button();
			}, 6000);
		};
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'jquery'));
}
else {
	start_download_button();
}
