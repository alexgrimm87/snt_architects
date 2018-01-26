$(document).ready(function(){
  $('.show-more').click(function(e){
    e.preventDefault();

    var info = {};
    info['action'] = $(this).attr('data-action');
    info['page'] = $(this).attr('data-page');
    info['per_page'] = $(this).attr('data-per-page');

    $('.preload').show();
    $(this).closest('li').remove();

    $.ajax({
        url : '/ajax-test.php',
        data: info,
        method:'POST',
        success : function(data){
          if (data === undefined) {
            alert('no data')
          } else {
            $('.gallery-list').append(data);
            $('.preload').hide();
          }
        }
    });
  });

  $('.show-text').click(function(e){
    e.preventDefault();
    $(this).parent('.button-wrap').remove();
    $('.about-inner').addClass('active');
  });

});

$(window).load(function(){

});

$(window).resize(function(){

});