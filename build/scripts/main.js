'use strict';

/**
* Check scroll-bar width
* exemple ->   let scroll = $.scrollbarWidth();
*/
$.scrollbarWidth = function () {
    var a, b, c;if (c === undefined) {
        a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b = a.children();c = b.innerWidth() - b.height(99).innerWidth();a.remove();
    }return c;
};

/**
* Scroll to the block
* @param {block} str - For what we click
* @param {targetBlock} str - to what we should scroll
*/
function scrollUp(block, targetBlock) {
    $(block).click(function (e) {
        var target = $(targetBlock).offset().top;

        $('body,html').stop().animate({ scrollTop: target }, 800);
        return false;

        e.preventDefault();
    });
}

/**
* Scroll animation
* @param {item} jquery obj - Wrapper for class 'animate-it';
*/
function animationBlock(item) {

    $(window).scroll(function () {
        checkForAnimate();
    });

    function checkForAnimate() {
        var bottomCheck = $(window).height() + $(window).scrollTop();
        var windowTop = $(window).scrollTop() + $(window).height() / 1.5;
        item.each(function () {
            if (windowTop > $(this).offset().top || bottomCheck > $('body').height() * 0.98) {

                var itemSect = $(this);
                var point = 0;
                itemSect.find('.animate-it').addClass('animated');

                var timer = setInterval(function () {
                    itemSect.find('.animate-delay').eq(point).addClass('animated');
                    point++;
                    if (itemSect.find('.animate-delay').length == point) {
                        clearInterval(timer);
                    }
                }, 200);
            }
        });
    }
    checkForAnimate();
}

/**
* GO TO href (smooth)
*/
function goTo() {
    $('.header-menu a').click(function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var target = $(href).offset().top - 65;
        $('body,html').animate({ scrollTop: target }, 500);
    });
}

/**
* Cut text script
* (Add to  div class "cut-text" width data-attr "data-cut"(length letters to show) )
*/
function cutText() {
    var filler = '...';
    var filler_length = filler.length;
    $('.cut-text').each(function () {
        var value = $(this).data('cut') - filler_length;
        var text = $.trim($(this).text());
        if (text.length > value && value > 0) {
            var newText = text.substring(0, value) + filler;
            $(this).text(newText);
        }
    });
};

/**
* Functional header butter
* @param {menuMobile} jquery obj - For what we click
* @param {toggleMenu} jquery obj - to what menu we will slideToggle
*/
function headeButer(menuMobile, toggleMenu) {
    if (menuMobile) {
        menuMobile.click(function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                $(this).toggleClass('active');
                toggleMenu.stop().slideToggle();
            }
        });

        $(document).on('click touchstart', function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0) {
                    toggleMenu.slideUp();
                    menuMobile.removeClass('active');
                }
            }
        });
    }
}

/**
* Expresion for numbers with spaces
* @param {x} number
* @return {string}
*/
function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

$(document).ready(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());

    goTo();
});

$(window).resize(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());
});
'use strict';

$(document).ready(function () {
	$('.el-radio input').styler();
	$('.el-select').styler();

	$('.header .language .lang').click(function (e) {
		e.preventDefault();
		$(this).next('ul').toggleClass('active');
		return false;
	});

	$('.accounting-wrap .button').click(function (e) {
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
			$('body,html').animate({ scrollTop: target }, 500);

			$(this).closest('.form').addClass('hide_btn');
			$(this).closest('.form').find('.form-info .err-text').remove();
			$(this).closest('.form').find('.city').removeClass('error');

			var name = $(this).closest('.form').find('.jq-radio.checked input').attr('data-name');
			var city = $(this).closest('.form').find('.form-info .city').val();

			if ($('.accounting').find('.' + name).css('display') == 'block') {
				return false;
			} else {
				$('.accounting .acc-form').slideUp().removeClass('active');
				$('.accounting').find('.' + name).slideDown().addClass('active');
				$('.acc-form.active .city input').val(city);
				$('.acc-form.active .el-radio').eq(0).find('.jq-radio').addClass('checked');
			}
		}
	});

	$('.form-info .city').change(function () {
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

	$('.accounting-wrap .form-info .el-radio input').change(function () {
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
			$('.acc-form.active input').each(function () {
				$(this).val('');
			});
			$('.acc-form.active .el-radio').each(function () {
				$(this).find('.jq-radio').removeClass('checked');
			});
			$('.acc-form.active textarea').each(function () {
				$(this).val('');
			});
			$('.acc-form.active .el-select').each(function () {
				$(this).find('.jq-selectbox__dropdown li').removeClass('sel selected');
				$(this).find('.jq-selectbox__dropdown li').eq(0).addClass('sel selected');
				var text = $(this).find('.jq-selectbox__dropdown li').eq(0).text();
				$(this).find('.jq-selectbox__select-text').text(text);
			});

			var name = $(this).attr('data-name');
			$('.accounting .acc-form').slideUp().removeClass('active');
			$('.accounting').find('.' + name).slideDown().addClass('active');

			var city = $(this).closest('.form').find('.form-info .city').val();
			$('.acc-form.active .city input').val(city);

			$('.acc-form.active .el-radio').eq(0).find('.jq-radio').addClass('checked');
		}
	});

	$('.close_form').click(function (e) {
		e.preventDefault();
		$('.acc-form.active input').each(function () {
			$(this).val('');
		});
		$('.acc-form.active .el-radio').each(function () {
			$(this).find('.jq-radio').removeClass('checked');
		});
		$('.acc-form .el-radio').eq(0).find('.jq-radio').addClass('checked');
		$('.acc-form.active textarea').each(function () {
			$(this).val('');
		});
		$('.acc-form.active .el-select').each(function () {
			$(this).find('.jq-selectbox__dropdown li').removeClass('sel selected');
			$(this).find('.jq-selectbox__dropdown li').eq(0).addClass('sel selected');
			var text = $(this).find('.jq-selectbox__dropdown li').eq(0).text();
			$(this).find('.jq-selectbox__select-text').text(text);
		});

		$('.accounting .acc-form').slideUp().removeClass('active');

		$(this).closest('.accounting').find('.main-acc .form').removeClass('hide_btn');
	});

	$('.burger').click(function (e) {
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

$(window).load(function () {});

$(window).resize(function () {});
'use strict';

$(document).ready(function () {
  $('.show-more').click(function (e) {
    e.preventDefault();

    var info = {};
    info['action'] = $(this).attr('data-action');
    info['page'] = $(this).attr('data-page');
    info['per_page'] = $(this).attr('data-per-page');

    $('.preload').show();
    $(this).closest('li').remove();

    $.ajax({
      url: '/ajax-test.php',
      data: info,
      method: 'POST',
      success: function success(data) {
        if (data === undefined) {
          alert('no data');
        } else {
          $('.gallery-list').append(data);
          $('.preload').hide();
        }
      }
    });
  });

  $('.show-text').click(function (e) {
    e.preventDefault();
    $(this).parent('.button-wrap').remove();
    $('.about-inner').addClass('active');
  });
});

$(window).load(function () {});

$(window).resize(function () {});