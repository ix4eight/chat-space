$(function(){
  last_message_id = $('.message:last').data("message-id");
  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class=".main__message__box">` +
          `<div class="main__message__box--username">` +
            message.user_name +
          `</div>` +
          `<div class=".main__message__box--time">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class=".main__message__text">` +
          `<p class="main__message__text__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="main__message__text__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="main__message__box">` +
          `<div class="main__message__box--username">` +
            message.user_name +
          `</div>` +
          `<div class=".main__message__box--time">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class=".main__message__text">` +
          `<p class="main__message__text__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class=".main__message__box">` +
          `<div class="main__message__box--username">` +
            message.user_name +
          `</div>` +
          `<div class=".main__message__box--time">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class=".main__message__text">` +
          `<img src="` + message.image + `" class="main__message__text__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/main_messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.main_messages').append(insertHTML);
        $('.main_messages').animate({ scrollTop: $('.main_messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
});

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
