/*
created by rafael santos (rafael@widenet.com.br)
https://www.instagram.com/rafadeveloper/
https://twitter.com/rafadeveloper
past this code on the javascript console of page (instagram home feed)
the script run autolike on feed
change var window._autolike_onlyfollow to true for only followed photos
*/

window._autolike_onlyfollow = window._autolike_onlyfollow || false;

var object_botao_fechar_foto = 'button._3eajp'
	object_link_foto = 'div._ovg3g',
	object_conteiner_foto = 'article._55zw1',
	object_botao_seguir = object_conteiner_foto+' header button',
	text_botao_seguindo = 'Seguindo',
	text_botao_seguir = 'Seguir',
	object_conteiner_like = object_conteiner_foto+' section._ghat4',
	object_botao_like_vazio = object_conteiner_like+' '+ 'a._tk4ba .coreSpriteLikeHeartOpen',
	object_botao_like_cheio = object_conteiner_like+' '+ 'a._tk4ba .coreSpriteLikeHeartFull',
	try_open_photo_total = 6,
	try_open_photo_count = 0,
	randon_time = function() {
			return 3000 + Math.floor((Math.random() * 3000) + 1);
		},
	check_opened_photo = function() {
			var botao_de_seguir = $_jq(object_botao_seguir);
			if (botao_de_seguir.length == 1) {
				return true;
			}
			return false;
		},
	open_next_photo = function() {
			console.log('open next photo... and wait six sec to continue...');
			var link_da_vez = $_jq(object_link_foto+':not(.jafoiaberta):first');
			if (link_da_vez.length == 1) {
				$_jq('body').scrollTop( link_da_vez.offset().top );
				link_da_vez.addClass('jafoiaberta').css('border','5px solid #0c0').click();
			}
			setTimeout(start_like_routine, randon_time());
			return true;
		},
	close_this_photo = function() {
			console.log('close this photo');
			var botao_de_fechar = $_jq(object_botao_fechar_foto);
			if (botao_de_fechar.length == 1) {
				botao_de_fechar.click();
				setTimeout(scroll_to_last_photo, 1000);
			}
			else {
				console.log('...AND close button not found');
				return false;
			}
			setTimeout(start_like_routine, randon_time());
			return true;
		},
	scroll_to_last_photo = function() {
		var ultimo_link = $_jq(object_link_foto+'.jafoiaberta:last');
		if (ultimo_link.length == 1) {
			$_jq('body').scrollTop( ultimo_link.offset().top );
		}
	},
	check_followed = function() {
			if (window._autolike_onlyfollow != true) {
				return true;
			}
			var botao_de_seguir = $_jq(object_botao_seguir);
			if (botao_de_seguir.length<=0 || botao_de_seguir.text()!=text_botao_seguindo) {
				console.log('check followed is FALSE');
				if(!botao_de_seguir.text()!=text_botao_seguir) {
					console.log('...AND follow button not found');
				}
				return false;
			}
			return true;
		},
	click_like = function() {
			var botao_de_like = $_jq(object_botao_like_vazio);
			if (botao_de_like.length==1) {
				console.log('click on the like');
				botao_de_like.click();
				setTimeout(close_this_photo, randon_time());
			}
			else {
				console.log('photo is liked');
				if ($_jq(object_botao_like_cheio).length <= 0) {
					console.log('...AND like button not found');
				}
				close_this_photo();
			}
			return true;
		},
	start_like_routine = function() {
			console.log('------ start like routine');
			if (!check_opened_photo()) {
				return open_next_photo();
			}
			if (check_followed()) {
				return click_like();
			}
			return close_this_photo();
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
				start_like_routine();
			}, 6000);
		};
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'jquery'));
}
else {
	start_like_routine();
}
