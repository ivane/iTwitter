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

    //Instagram Photo | Timeline
    function InstagramLink() {
        $('.stream-item').click(function() {
            var Instagram_Link = $(this).find('.js-display-url').text();
            if (Instagram_Link.match(/instagram\.com\/p\/\w{10}\//) && $(this).find('.cards-instagram').length == 0) {
                var Instagram_Link_photo = "http://"+Instagram_Link+"media/?size=l";
                $(this).find('.stream-item-footer').after('<div data-card-url="'+Instagram_Link_photo+'" data-card-type="photo" class="cards-base cards-multimedia cards-instagram" data-element-context="platform_photo_card"><div class="cards-media-container js-media-container"><a href="'+Instagram_Link_photo+'" class="media media-thumbnail twitter-timeline-link media-forward is-preview" data-url="'+Instagram_Link_photo+'" data-resolved-url-large="'+Instagram_Link_photo+'"><div class="is-preview"><img src="'+Instagram_Link_photo+'" width="100%" alt="Embedded image permalink" /></div></a></div></div>');
            }
        });
    }
    setInterval(InstagramLink,500);

    //Instagram Photo | Single Permalink
    $(document).ready(function () {
        var Instagram_Link = $('.wrapper-permalink .tweet-text').find('.js-display-url').eq(0).text();
        if (Instagram_Link.match(/instagram\.com\/p\/\w{10}\//) && $('.wrapper-permalink .tweet-text').eq(0).find('.cards-instagram').length == 0) {
            var Instagram_Link_photo = "http://"+Instagram_Link+"media/?size=l";
            $('.wrapper-permalink .permalink-tweet').eq(0).find('.stream-item-footer').after('<div data-card-url="'+Instagram_Link_photo+'" data-card-type="photo" class="cards-base cards-multimedia cards-instagram" data-element-context="platform_photo_card"><div class="cards-media-container js-media-container"><a href="'+Instagram_Link_photo+'" class="media media-thumbnail twitter-timeline-link media-forward is-preview" data-url="'+Instagram_Link_photo+'" data-resolved-url-large="'+Instagram_Link_photo+'"><div class="is-preview"><img src="'+Instagram_Link_photo+'" width="100%" alt="Embedded image permalink" /></div></a></div></div>');
        }
    });

    //Quote Tweet
//    var ulLength = 0;
//    setInterval(function(){
//        if ($('li.stream-item').length > ulLensgth) {
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
