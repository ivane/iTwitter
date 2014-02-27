window.onload = function() {

    // Add the favorites link on nav bar
    $('.nav.js-global-actions').append('<li class="favorites" data-global-action="favorites"><a href="/favorites" class="js-nav js-tooltip" data-component-term="favorites_nav" data-nav="favorites" data-original-title="favorites"><span class="Icon Icon--favorite Icon--large"></span><span class="text">Favorites</span></a></li>');

    // Add the favorites link active style on nav bar
    function TwitterFav() {
        $('ul.nav.js-global-actions li.profile').removeClass('active');
        $('ul.nav.js-global-actions li.favorites').addClass('active');
    }
    var url='https://twitter.com/favorites';
    function ListenHref() {
        var urlCurrent=window.location.href;
        if(urlCurrent==url){
            TwitterFav();
        }
    }
    setInterval(ListenHref,500);

    // Quote Tweet
    function ListenQuoteTweet() {
        $('ul.tweet-actions.js-actions').each(function() {
           if($(this).find('li').hasClass('action-quote-tweet')) {} else {

               // Add Quote Tweet link
               $(this).find('li.action-reply-container').after('<li class="action-quote-tweet"><a class="with-icn js-tooltip" id="QuoteTweet" href="#"><span class="Icon Icon--retweet"></span> <b>Quote Tweet</b></a></li>');

               // Quote Tweet popup
               $('ul.tweet-actions').on('click','li.action-quote-tweet a',function(eqt) {
                   eqt.preventDefault();
                   var rt_name_itwitter = $(this).parents('.tweet').find('span.username b').html();
                   var rt_content_itwitter = $(this).parents('.tweet').find('.js-tweet-text.tweet-text').html();
                   $(this).trigger('uiOpenTweetDialog',{draftTweetId:'global'});
                   $('#global-tweet-dialog').find('h3.modal-title').text('Quote this to your followers?');
                   $('#global-tweet-dialog').find('.tweet-box.rich-editor.notie').html('&nbsp;RT&nbsp;@' + rt_name_itwitter + '&nbsp;' + rt_content_itwitter);
               });

            }
        });
    }
    setInterval(ListenQuoteTweet,500);

    //Quote Tweet
//    var ulLength = 0;
//    setInterval(function(){
//        if ($('li.stream-item').length > ulLength) {
//            if($(this).find('li').hasClass('action-quote-tweet')) {} else {
//                $(this).find('li.action-reply-container').after('<li class="action-quote-tweet"><a class="with-icn js-tooltip" id="QuoteTweet" href="#"><span class="Icon Icon--retweet"></span> <b>Quote Tweet</b></a></li>');
//            }
//        }
//    }, 500);

//    function ListenQuoteTweet() {
//        var ulList = $('li.stream-item');
//        for(var i = ulLength; i < ulList.length; i++) {}
//    }

};
