function twitterlink() {
    chrome.tabs.create({
        url:"https://twitter.com/"
    });
}
chrome.browserAction.onClicked.addListener(twitterlink);