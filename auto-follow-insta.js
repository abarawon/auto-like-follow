/*
created by rafael santos (rafael@widenet.com.br)
https://www.instagram.com/rafadeveloper/
https://twitter.com/rafadeveloper
past this code on the javascript console of page (instagram home feed)
the script run autofollow on feed
*/


window._autofollow_follow = window._autofollow_follow || confirm('Seguir usuarios?');

if (window._autofollow_follow==true) {

	window._autofollow_count = window._autofollow_count || parseInt(prompt('Você já está seguindo quantos?', 4900));
	window._autofollow_total = 5000;

	window._autofollow_like = window._autofollow_like || confirm('Curtir fotos?');

	if (window._autofollow_like==true) {
		window._autofollow_likeall = window._autofollow_likeall || confirm('Curtir fotos de TODOS? (de novos seguidores e antigos)');
	}
	else {
		window._autofollow_likeall = false;
	}
}
else {
	window._autofollow_like = true;
	window._autofollow_likeall = true;
}

var object_carrega_mais = 'a._1cr2e',
	object_botao_fechar_foto = 'button._dcj9f',
	object_link_foto = 'div._cmdpi div._si7dy',
	object_conteiner_foto = 'div[role="dialog"] article',
	object_botao_seguir = object_conteiner_foto+' header button',
	object_conteiner_like = object_conteiner_foto+' section._hmd6j',
	object_botao_like_vazio = object_conteiner_like+' '+ 'a._eszkz .coreSpriteHeartOpen',
	object_botao_like_cheio = object_conteiner_like+' '+ 'a._eszkz .coreSpriteHeartFull',
// var object_botao_fechar_foto = 'button._3eajp',
// 	object_link_foto = 'div._ovg3g',
// 	object_conteiner_foto = 'article._djxz1',
// 	object_botao_seguir = object_conteiner_foto+' '+ 'header._s6yvg button._ah57t',
// 	object_conteiner_like = object_conteiner_foto+' '+ 'section._jveic',
// 	object_botao_like_vazio = object_conteiner_like+' '+ 'a._ebwb5 .coreSpriteHeartOpen',
// 	object_botao_like_cheio = object_conteiner_like+' '+ 'a._ebwb5 .coreSpriteHeartFull',
	class_botao_seguindo = '_t78yp',
	class_botao_seguir = '_gexxb',
	text_botao_seguindo = 'Seguindo',
	text_botao_seguir = 'Seguir',
	try_open_photo_total = 6,
	try_open_photo_count = 0,
	randon_time = function() {
			return 3500 + Math.floor((Math.random() * 3000) + 1);
		},
	randon_long_time = function() {
			var temp_longtime = 33000 + Math.floor((Math.random() * 9000) + 1);
			//console.log('- aguarda tempo longo '+temp_longtime);
			return temp_longtime;
		},
	check_opened_photo = function() {
			var botao_de_seguir = $_jq(object_botao_seguir);
			if (botao_de_seguir.length == 1) {
				console.log('- foto aberta');
				return true;
			}
			console.log('- foto não aberta');
			return false;
		},
	open_next_photo = function() {
			var link_carrega_mais = $_jq(object_carrega_mais);
			if (link_carrega_mais.length == 1) {
				console.log('[i] - clique botao carrega mais');
				$_jq('body').scrollTop( link_carrega_mais.offset().top );
				//link_carrega_mais.click();
				setTimeout(open_next_photo, randon_time());
				return true;
			}

			console.log('- abrir proxima foto');
			var link_da_vez = $_jq(object_link_foto+':not(.jafoiaberta):first');
			if (link_da_vez.length == 1) {
				$_jq('body').scrollTop( link_da_vez.offset().top );
				link_da_vez.addClass('jafoiaberta').css('border','5px solid #0c0').click();
			}
			else {
				var ultimo_link = $_jq(object_link_foto+':last');
				if (ultimo_link.length == 1) {
					console.log('- carregar mais');
					$_jq('body').scrollTop( ultimo_link.offset().top );
				}
			}
			setTimeout(start_routine_queue, randon_time());
			return true;
		},
	close_this_photo = function() {
			console.log('- fechar foto');
			var botao_de_fechar = $_jq(object_botao_fechar_foto);
			if (botao_de_fechar.length == 1) {
				botao_de_fechar.click();
				setTimeout(scroll_to_last_photo, 1300);
			}
			else {
				console.log('... botao de fechar nao encontrado');
				return false;
			}
			setTimeout(start_routine_queue, randon_time());
			return true;
		},
	scroll_to_last_photo = function() {
		var ultimo_link = $_jq(object_link_foto+'.jafoiaberta:last');
		if (ultimo_link.length == 1) {
			$_jq('body').scrollTop( ultimo_link.offset().top );
		}
	},
	follow_this_user = function() {
			if (window._autofollow_count >= window._autofollow_total) {
				alert('Você já está seguindo '+window._autofollow_count+' pessoas');
				return;
			}
			var botao_de_seguir = $_jq(object_botao_seguir);
			if (window._autofollow_follow==true && botao_de_seguir.length==1 && botao_de_seguir.text()==text_botao_seguir) {
				window._autofollow_count = window._autofollow_count + 1;
				console.log('- seguir usuario ('+window._autofollow_count+' de '+window._autofollow_total+')');
				botao_de_seguir.click();
				if(window._autofollow_like==true) {
					setTimeout(click_like, randon_long_time());
				}
				else {
					setTimeout(close_this_photo, randon_long_time());
				}
			}
			else if (window._autofollow_likeall==true) {
				click_like();
			}
			else {
				close_this_photo();
			}
			return true;
		},
	click_like = function() {
			var botao_de_like = $_jq(object_botao_like_vazio);
			if (botao_de_like.length==1) {
				console.log('- clica em curtir');
				botao_de_like.click();
				setTimeout(close_this_photo, randon_time());
			}
			else {
				if ($_jq(object_botao_like_cheio).length <= 0) {
					console.log('... botao de like nao encontrado');
				}
				else {
					console.log('- foto ja curtida');
				}
				close_this_photo();
			}
			return true;
		},
	start_routine_queue = function() {
			console.log('------------------------');
			if (!check_opened_photo()) {
				return open_next_photo();
			}
			return follow_this_user();
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
				start_routine_queue();
			}, 6000);
		};
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'jquery'));
}
else {
	start_routine_queue();
}
