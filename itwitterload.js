var iHead = document.getElementsByTagName('head').item(0);
var iScript = document.createElement('script');
iScript.type = 'text/javascript';
iScript.src = chrome.extension.getURL('itwitter.js');
iHead.appendChild(iScript);

