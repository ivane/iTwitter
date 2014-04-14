window.onload = function () {

    // Add the favorites link on nav bar
    $('.nav.js-global-actions').append('<li class="favorites" data-global-action="favorites"><a href="/favorites" class="js-nav js-tooltip" data-component-term="favorites_nav" data-nav="favorites" data-original-title="favorites"><span class="Icon Icon--favorite Icon--large"></span><span class="text">Favorites</span></a></li>');

    // Add the favorites link active style on nav bar
    function TwitterFav() {
        $('ul.nav.js-global-actions li.profile').removeClass('active');
        $('ul.nav.js-global-actions li.favorites').addClass('active');
    }

    var url = 'https://twitter.com/favorites';

    function ListenHref() {
        var urlCurrent = window.location.href;
        if (urlCurrent == url) {
            TwitterFav();
        }
    }

    setInterval(ListenHref, 500);

    // Quote Tweet | Timeline
    $('body').on('hover', '.js-stream-item', function () {
        if (!$(this).find('ul.tweet-actions.js-actions li').hasClass('action-quote-tweet')) {
            $(this).find('li.action-reply-container').after('<li class="action-quote-tweet"><a class="with-icn js-tooltip" id="QuoteTweet" href="#"><span class="Icon Icon--retweet"></span> <b>Quote Tweet</b></a></li>');
        }
    });

    $('body').on('focus', '.js-stream-item', function () {
        if (!$(this).find('ul.tweet-actions.js-actions li').hasClass('action-quote-tweet')) {
            $(this).find('li.action-reply-container').after('<li class="action-quote-tweet"><a class="with-icn js-tooltip" id="QuoteTweet" href="#"><span class="Icon Icon--retweet"></span> <b>Quote Tweet</b></a></li>');
        }
    });

    // Quote Tweet | Shortcut
    // Timeline
    if ($('.wrapper').length > 0) {
        $('body').on('keydown', 'ol.stream-items li', function (QTShortCut) {
            if (($(this).hasClass('selected-stream-item') || $(this).hasClass('open')) && $('#global-tweet-dialog').is(':hidden') && !$('.tweet-box.rich-editor').is(':focus')) {
                switch (QTShortCut.which) {
                    case(81):
                        var rt_name_itwitter = $(this).find('.stream-item-header .username b').html();
                        var rt_content_itwitter = $(this).find('.js-tweet-text.tweet-text').html();
                        if (rt_name_itwitter.length > 0 && rt_content_itwitter.length > 0) {
                            QTShortCut.preventDefault();
                            $(this).trigger('uiOpenTweetDialog', {draftTweetId: 'global'});
                            $('#global-tweet-dialog').find('h3.modal-title').text('Quote this to your followers?');
                            $('#global-tweet-dialog').find('.tweet-box.rich-editor.notie').html('&nbsp;RT&nbsp;@' + rt_name_itwitter + '&nbsp;' + rt_content_itwitter);
                        }
                        break;
                }
            }
        });
    }

    // Permalink
    function QTPermalink() {
        $(document).keydown(function (QTShortCut) {
            if ($('#global-tweet-dialog').is(':hidden')) {
                switch (QTShortCut.which) {
                    case(81):
                        QTShortCut.preventDefault();
                        var rt_name_itwitter = $(this).find('.stream-item-header .username b').html();
                        var rt_content_itwitter = $(this).find('.js-tweet-text.tweet-text').html();
                        $(this).trigger('uiOpenTweetDialog', {draftTweetId: 'global'});
                        $('#global-tweet-dialog').find('h3.modal-title').text('Quote this to your followers?');
                        $('#global-tweet-dialog').find('.tweet-box.rich-editor.notie').html('&nbsp;RT&nbsp;@' + rt_name_itwitter + '&nbsp;' + rt_content_itwitter);
                        break;
                }
            }
        });
    }

    // Quote Tweet popup
    $('body').on('click', 'li.action-quote-tweet a', function (eqt) {
        eqt.preventDefault();
        var rt_name_itwitter = $(this).parents('.tweet').find('.stream-item-header .username b').html();
        var rt_content_itwitter = $(this).parents('.tweet').find('.js-tweet-text.tweet-text').html();
        $(this).trigger('uiOpenTweetDialog', {draftTweetId: 'global'});
        $('#global-tweet-dialog').find('h3.modal-title').text('Quote this to your followers?');
        $('#global-tweet-dialog').find('.tweet-box.rich-editor.notie').html('&nbsp;RT&nbsp;@' + rt_name_itwitter + '&nbsp;' + rt_content_itwitter);
    });

    // Quote Tweet | Permalink Page
    function AddQuoteTweet() {
        if (!$('.permalink ul.tweet-actions.js-actions li').hasClass('action-quote-tweet')) {
            $('.permalink li.action-reply-container').after('<li class="action-quote-tweet"><a class="with-icn js-tooltip" id="QuoteTweet" href="#"><span class="Icon Icon--retweet"></span> <b>Quote Tweet</b></a></li>');
        }
    }

    // Quote Tweet | Help tips
    $(document).keydown(function (QTHelpTips) {
        if (QTHelpTips.shiftKey && QTHelpTips.keyCode == 191) {
            $('#keyboard-shortcut-dialog-dialog').find('.modal-table tr').eq(3).after('<tr><td class="shortcut"><b class="sc-key">q</b></td><td class="shortcut-label">Quote Tweet</td></tr>')
        }
    });

    //Instagram Link
    $('body').on('click', '.stream-items .twitter-timeline-link', function (InstagramLink) {
        if (($(this).children('.js-display-url').text().toLowerCase().match(/instagram\.com\/p\/[a-zA-Z0-9\_\-]{10}\//) || $(this).children('.js-display-url').text().toLowerCase().match(/instagr\.am\/p\/[a-zA-Z0-9\_\-]{10}\//)) && !$(this).closest('.stream-item').hasClass('open')) {
            InstagramLink.preventDefault();
            $(this).parents('.js-stream-tweet').trigger('click');
        }
    });

    function SteamItemClick() {
        //Instagram Photo | Timeline
        $('#timeline .stream-container').unbind('click').on('click', '.js-stream-item', function () {
            console.log('js-stream-item click');
            var arr = [];
            $(this).find('.js-display-url').each(function () {
                if ($(this).text().toLowerCase().match(/instagram\.com\/p\/[a-zA-Z0-9\_\-]{10}\//) || $(this).text().toLowerCase().match(/instagr\.am\/p\/[a-zA-Z0-9\_\-]{10}\//)) {
                    arr.push($(this).text());
                }
            });
            if ($(this).find('.cards-instagram').length == 0) {
                for (var i = 0; i < arr.length; i++) {
                    var Instagram_Link_photo = "http://" + arr[i] + "media/?size=l";
                    $(this).find('.stream-item-footer').eq(0).after('<div data-card-url="' + Instagram_Link_photo + '" data-card-type="photo" class="cards-base cards-multimedia cards-instagram" data-element-context="platform_photo_card"><div class="cards-media-container js-media-container"><a href="' + Instagram_Link_photo + '" class="media media-thumbnail twitter-timeline-link media-forward is-preview" data-url="' + Instagram_Link_photo + '" data-resolved-url-large="' + Instagram_Link_photo + '"><div class="is-preview"><img src="' + Instagram_Link_photo + '" width="100%" alt="Embedded image permalink" /></div></a></div></div>');
                }
            }
        });
    }

    SteamItemClick();

    //Instagram Photo | Permalink Page
    function InstagramPhotoPermalink() {
        var arr = [];
        $('.permalink-tweet-container .js-tweet-text').eq(0).find('.js-display-url').each(function () {
            if ($(this).text().toLowerCase().match(/instagram\.com\/p\/[a-zA-Z0-9\_\-]{10}\//) || $(this).text().toLowerCase().match(/instagr\.am\/p\/[a-zA-Z0-9\_\-]{10}\//)) {
                arr.push($(this).text());
            }
        });
        if ($('.cards-instagram').length == 0) {
            for (var i = 0; i < arr.length; i++) {
                var Instagram_Link_photo = "http://" + arr[i] + "media/?size=l";
                $('.permalink-tweet').find('.stream-item-footer').after('<div data-card-url="' + Instagram_Link_photo + '" data-card-type="photo" class="cards-base cards-multimedia cards-instagram" data-element-context="platform_photo_card"><div class="cards-media-container js-media-container"><a href="' + Instagram_Link_photo + '" class="media media-thumbnail twitter-timeline-link media-forward is-preview" data-url="' + Instagram_Link_photo + '" data-resolved-url-large="' + Instagram_Link_photo + '"><div class="is-preview"><img src="' + Instagram_Link_photo + '" width="100%" alt="Embedded image permalink" /></div></a></div></div>');
            }
        }
    }

    //Permalink Page: Quote Tweet & Instagram Photo & Quote Tweet Shortcut
    (function (history) {
        var pushState = history.pushState;
        history.pushState = function (state) {
            if (typeof history.onpushstate == "function") {
                history.onpushstate({state: state});
            }
            pushState.apply(history, arguments);
            if (arguments[2].indexOf('/status/') > 0) {
                var times = 0;
                var tt = setInterval(function () {
                    if ($('.permalink').length > 0 || times > 10) {
                        clearInterval(tt);
                        AddQuoteTweet();
                        InstagramPhotoPermalink();
                        QTPermalink();
                        times = 0;
                    } else {
                        times++;
                    }
                }, 500)
            } else if (arguments[2] === '/') {
                var times = 0;
                var tt = setInterval(function () {
                    if ($('#timeline>.stream-container').length > 0 || times > 10) {
                        SteamItemClick();
                        times = 0;
                    } else {
                        times++;
                    }
                }, 500);
            }

        }
    })(window.history);

    var localStr = location.href;
    if (localStr.indexOf('/status/') > 0) {
        AddQuoteTweet();
        InstagramPhotoPermalink();
        QTPermalink();
    }

    //iTwitter Notice
    function setFlag() {
        localStorage.flag = 1;
    }

    function getFlag() {
        if (localStorage.hasOwnProperty('flag')) {
            return localStorage.flag;
        } else {
            return false;
        }
    }

    if (!getFlag()) {
        $('.global-nav .container').append('<div class="itwitter-notice itwitter-animation-block"><p>Can not find the <strong>New Tweet Button</strong> ?</p><p>Try to press the <strong>"n" key</strong> on your keyboard, enjoy!</p><p class="itwitter-notice-cn-line">找不到发新推的按钮？</p><p>试试按下键盘的“n”键，是不是方便很多，嘻嘻！</p><p class="itwitter-notice-cn-line"><a href="##" class="btn primary-btn itwitter-notice-close">I got it. 嗯啊~</a></p><span class="icon close itwitter-notice-close" aria-hidden="true"><span class="visuallyhidden">Close</span></span></div>');
    }

    $('.itwitter-notice-close').click(function () {
        setFlag();
        $(this).parents('.itwitter-notice').addClass('itwitter-animation-hidden').delay(1000).fadeOut('100');
    });


};

var objList = [
    {
        fileName: 'macpro',
        xxx: 'xxx',
        release: [
            {

            },
            {

            }
        ]
    }   ,
    {
        fileName: 'macpro',
        xxx: 'xxx',
        release: [
            {

            },
            {

            }
        ]
    }
];
