window.onload=function(){
    $('.nav.js-global-actions').append('<li class="favorites" data-global-action="favorites"><a href="/favorites" class="js-nav js-tooltip" data-component-term="favorites_nav" data-nav="favorites" data-original-title="favorites"><span class="Icon Icon--favorite Icon--large"></span><span class="text">Favorites</span></a></li>');
    function twitter_fav(){
        $('ul.nav.js-global-actions li.profile').removeClass('active');
        $('ul.nav.js-global-actions li.favorites').addClass('active');
    }
    var url='https://twitter.com/favorites';
    function listenHref(){
        var urlCurrent=window.location.href;
        if(urlCurrent==url){
            twitter_fav();
        }
    }
    setInterval(listenHref,500);
};
