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

    // Quote Tweet | Timeline
    $('body').on('hover','.js-stream-item',function(){
        if(!$(this).find('ul.tweet-actions.js-actions li').hasClass('action-quote-tweet')) {
           $(this).find('li.action-reply-container').after('<li class="action-quote-tweet"><a class="with-icn js-tooltip" id="QuoteTweet" href="#"><span class="Icon Icon--retweet"></span> <b>Quote Tweet</b></a></li>');
        }
    });

    // Quote Tweet popup
    $('body').on('click','li.action-quote-tweet a',function(eqt){
        eqt.preventDefault();
        var rt_name_itwitter = $(this).parents('.tweet').find('span.username b').html();
        var rt_content_itwitter = $(this).parents('.tweet').find('.js-tweet-text.tweet-text').html();
        $(this).trigger('uiOpenTweetDialog',{draftTweetId:'global'});
        $('#global-tweet-dialog').find('h3.modal-title').text('Quote this to your followers?');
        $('#global-tweet-dialog').find('.tweet-box.rich-editor.notie').html('&nbsp;RT&nbsp;@' + rt_name_itwitter + '&nbsp;' + rt_content_itwitter);
    });

    //Quote Tweet | Permalink Page
    function AddQuoteTweet() {
        if(!$('.permalink ul.tweet-actions.js-actions li').hasClass('action-quote-tweet')) {
            $('.permalink li.action-reply-container').after('<li class="action-quote-tweet"><a class="with-icn js-tooltip" id="QuoteTweet" href="#"><span class="Icon Icon--retweet"></span> <b>Quote Tweet</b></a></li>');
        }
    }

    //Instagram Photo | Timeline
    $('body').on('click','.stream-item',function(){
        var arr = [];
        $(this).find('.js-display-url').each(function() {
            if($(this).text().toLowerCase().match(/instagram\.com\/p\/[a-zA-Z0-9\_\-]{10}\//) || $(this).text().toLowerCase().match(/instagr\.am\/p\/[a-zA-Z0-9\_\-]{10}\//)) {
                arr.push($(this).text());
            }
        });
        if($(this).find('.cards-instagram').length == 0) {
            for(var i=0; i<arr.length; i++) {
                var Instagram_Link_photo = "http://"+arr[i]+"media/?size=l";
                $(this).find('.stream-item-footer').after('<div data-card-url="'+Instagram_Link_photo+'" data-card-type="photo" class="cards-base cards-multimedia cards-instagram" data-element-context="platform_photo_card"><div class="cards-media-container js-media-container"><a href="'+Instagram_Link_photo+'" class="media media-thumbnail twitter-timeline-link media-forward is-preview" data-url="'+Instagram_Link_photo+'" data-resolved-url-large="'+Instagram_Link_photo+'"><div class="is-preview"><img src="'+Instagram_Link_photo+'" width="100%" alt="Embedded image permalink" /></div></a></div></div>');
            }
        }
    });

    //Instagram Link
    $('body').on('click','.twitter-timeline-link',function(InstagramLink){
        if(($(this).children('.js-display-url').text().toLowerCase().match(/instagram\.com\/p\/[a-zA-Z0-9\_\-]{10}\//) || $(this).children('.js-display-url').text().toLowerCase().match(/instagr\.am\/p\/[a-zA-Z0-9\_\-]{10}\//)) && !$(this).closest('.stream-item').hasClass('open')) {
            InstagramLink.preventDefault();
            $(this).parents('.js-stream-tweet').trigger('click');
        }
    });

    //Instagram Photo | Permalink Page
    function InstagramPhotoPermalink() {
        var arr = [];
        $('.permalink-tweet').find('.js-display-url').each(function() {
            if($(this).text().toLowerCase().match(/instagram\.com\/p\/[a-zA-Z0-9\_\-]{10}\//) || $(this).text().toLowerCase().match(/instagr\.am\/p\/[a-zA-Z0-9\_\-]{10}\//)) {
                arr.push($(this).text());
            }
            if($('.permalink-tweet').find('.cards-instagram').length == 0) {
                for(var i=0; i<arr.length; i++) {
                    var Instagram_Link_photo = "http://"+arr[i]+"media/?size=l";
                    $('.permalink-tweet').find('.stream-item-footer').after('<div data-card-url="'+Instagram_Link_photo+'" data-card-type="photo" class="cards-base cards-multimedia cards-instagram" data-element-context="platform_photo_card"><div class="cards-media-container js-media-container"><a href="'+Instagram_Link_photo+'" class="media media-thumbnail twitter-timeline-link media-forward is-preview" data-url="'+Instagram_Link_photo+'" data-resolved-url-large="'+Instagram_Link_photo+'"><div class="is-preview"><img src="'+Instagram_Link_photo+'" width="100%" alt="Embedded image permalink" /></div></a></div></div>');
                }
            }
        });
    }

    //Permalink Page: Quote Tweet & Instagram Photo
    (function (history) {
        var pushState = history.pushState;
        history.pushState = function (state) {
            if (typeof history.onpushstate == "function") {
                history.onpushstate({state: state});
            }
            pushState.apply(history, arguments);
            if(arguments[2].indexOf('/status/') > 0) {
                var times = 0;
                var tt = setInterval(function(){
                    if($('.permalink').length > 0 || times > 10) {
                        clearInterval(tt);
                        AddQuoteTweet();
                        InstagramPhotoPermalink();
                    } else {
                        times++;
                    }
                },500)
            }
        }
    })(window.history);

    var localStr = location.href;
    if(localStr.indexOf('/status/')>0) {
        AddQuoteTweet();
        InstagramPhotoPermalink();
    }

};