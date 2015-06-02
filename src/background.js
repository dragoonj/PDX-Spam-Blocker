
var context_menu_id = chrome.contextMenus.create({
  "title": "Block this Spammer", 
  "contexts":["link"],
  "targetUrlPatterns": ['*://www.puzzledragonx.com/en/profile.asp?u=*'],
  "onclick": blockHandler
});


function blockHandler(data, tab) {
  //do something with data.linkUrl
  var profile = data.linkUrl.match(/profile\.asp\?u\=(\d+)/);
  if (typeof profile[1] != 'undefined') {
    addSpammerToBlockList(profile[1], function(){
      chrome.tabs.sendMessage(tab.id, {action:"refresh-spammers"});
    });
  }
  
}

function addSpammerToBlockList(spammer_profile_id, callback) {
  //console.log('adding '+spammer_profile_id+'to blocked list');
  chrome.storage.sync.get("spammerList", function(data){
    //console.log(data);
    if (data && data.spammerList && data.spammerList.push) {
      spammerList.push(spammer_profile_id);
    } else {
      spammerList = [spammer_profile_id];
    }
      
    chrome.storage.sync.set({'spammerList': spammerList}, callback);
  });
}
