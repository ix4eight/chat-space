$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="main__message">
            <div class="main__message__box">
              <div class="main__message__box--username">
                ${message.user_name}
            </div>
              <div class="main__message__box--time">
                ${message.created_at}
              </div>
          </div>
          <div class="main__message__text">
            <p class="main__message__text__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
      `<div class="main__message">
        <div class="main__message__box">
          <div class="main__message__box--username">
            ${message.user_name}
          </div>
          <div class="main__message__box--time">
            ${message.created_at}
          </div>
        </div>
        <div class="main__message__text">
          <p class="main__message__text__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.main_messages').append(html);
    $('.main_messages').animate({ scrollTop: $('.main_messages')[0].scrollHeight});
    $('submit')[0].reset();
  })
  .fail(function(){
    alert('エラー');
  })
  .always(function() {
    $('form__message__submit').prop('disabled', false);
  });
});
});