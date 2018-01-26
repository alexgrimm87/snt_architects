$(document).ready(function(){
	$('.el-radio input').styler();
	$('.el-select').styler();

	$('.header .language .lang').click(function(e) {
		e.preventDefault();
		$(this).next('ul').toggleClass('active');
		return false;
	});

	$('.accounting-wrap .button').click(function(e) {
		e.preventDefault();
		if ($(this).closest('.form').find('.city').val() <= 0) {

			$(this).closest('.form').find('.city').addClass('error');

			if (!$(this).closest('.form').find('.jq-radio.checked').length) {
				$(this).closest('.form').find('.form-info').append('<div class="err-text"><p>Выберите один из пунктов</p></div>');
			} else {
				$(this).closest('.form').find('.form-info .err-text').remove();
			}

		} else if (!$(this).closest('.form').find('.jq-radio.checked').length) {

			$(this).closest('.form').find('.form-info').append('<div class="err-text"><p>Выберите один из пунктов</p></div>');

			if ($(this).closest('.form').find('.city').val() <= 0) {
				$(this).closest('.form').find('.city').addClass('error');
			} else {
				$(this).closest('.form').find('.city').removeClass('error');
			}

		} else {

	        var target = $(this).closest('.accounting').offset().top;
	        $('body,html').animate({scrollTop:target},500);

			$(this).closest('.form').addClass('hide_btn');
			$(this).closest('.form').find('.form-info .err-text').remove();
			$(this).closest('.form').find('.city').removeClass('error');

			var name = $(this).closest('.form').find('.jq-radio.checked input').attr('data-name');
			var city = $(this).closest('.form').find('.form-info .city').val();

			if ($('.accounting').find('.'+name).css('display') == 'block') {
				return false;
			} else {
				$('.accounting .acc-form').slideUp().removeClass('active');
				$('.accounting').find('.'+name).slideDown().addClass('active');
				$('.acc-form.active .city input').val(city);
				$('.acc-form.active .el-radio').eq(0).find('.jq-radio').addClass('checked');
			}
		}
	});

	$('.form-info .city').change(function() {
		if (!$(this).closest('.form').find('.jq-radio.checked').length && !$('.err-text').length) {
			$(this).closest('.form').find('.form-info').append('<div class="err-text"><p>Выберите один из пунктов</p></div>');
		} else if ($(this).closest('.form').find('.jq-radio.checked').length && $('.err-text').length) {
			$(this).closest('.form').find('.form-info .err-text').remove();
		}

		if ($(this).val() <= 0) {
			$(this).addClass('error');
		} else {
			$(this).removeClass('error');
		}
	});

	$('.accounting-wrap .form-info .el-radio input').change(function() {
		if (!$(this).closest('.form').hasClass('hide_btn')) {
			if ($(this).closest('.form').find('.city').val() <= 0) {
				$(this).closest('.form').find('.city').addClass('error');
			} else {
				$(this).closest('.form').find('.city').removeClass('error');
			}

			if (!$(this).closest('.form').find('.jq-radio.checked').length) {
				$(this).closest('.form').find('.form-info').append('<div class="err-text"><p>Выберите один из пунктов</p></div>');
			} else {
				$(this).closest('.form').find('.form-info .err-text').remove();
			}
		} else {
			$('.acc-form.active input').each(function() {
				$(this).val('');
			});
			$('.acc-form.active .el-radio').each(function() {
				$(this).find('.jq-radio').removeClass('checked');
			});
			$('.acc-form.active textarea').each(function() {
				$(this).val('');
			});
			$('.acc-form.active .el-select').each(function() {
				$(this).find('.jq-selectbox__dropdown li').removeClass('sel selected');
				$(this).find('.jq-selectbox__dropdown li').eq(0).addClass('sel selected');
				var text = $(this).find('.jq-selectbox__dropdown li').eq(0).text();
				$(this).find('.jq-selectbox__select-text').text(text);
			});

			var name = $(this).attr('data-name');
			$('.accounting .acc-form').slideUp().removeClass('active');
			$('.accounting').find('.'+name).slideDown().addClass('active');

			var city = $(this).closest('.form').find('.form-info .city').val();
			$('.acc-form.active .city input').val(city);

			$('.acc-form.active .el-radio').eq(0).find('.jq-radio').addClass('checked');
		}
	});

	$('.close_form').click(function(e) {
		e.preventDefault();
		$('.acc-form.active input').each(function() {
			$(this).val('');
		});
		$('.acc-form.active .el-radio').each(function() {
			$(this).find('.jq-radio').removeClass('checked');
		});
		$('.acc-form .el-radio').eq(0).find('.jq-radio').addClass('checked');
		$('.acc-form.active textarea').each(function() {
			$(this).val('');
		});
		$('.acc-form.active .el-select').each(function() {
			$(this).find('.jq-selectbox__dropdown li').removeClass('sel selected');
			$(this).find('.jq-selectbox__dropdown li').eq(0).addClass('sel selected');
			var text = $(this).find('.jq-selectbox__dropdown li').eq(0).text();
			$(this).find('.jq-selectbox__select-text').text(text);
		});

		$('.accounting .acc-form').slideUp().removeClass('active');

		$(this).closest('.accounting').find('.main-acc .form').removeClass('hide_btn');
	});

	$('.burger').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.header-content .adapt-wrap').slideToggle('fast');
    });
});

jQuery(document).click(function (event) {
  if ($(event.target).closest(".language .lang").length) return;
  jQuery(".language ul").removeClass("active");

  event.stopPropagation();
});

$(window).load(function(){

});

$(window).resize(function(){

});