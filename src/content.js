
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request && request.action == "refresh-spammers") {
    refresh_spammers();
  }
});


function refresh_spammers() {
  chrome.storage.sync.get("spammerList", function(data){ 
    //console.log("data from storage: ", data);
    if (data.spammerList) {
      $.each(data.spammerList, function(index, spammer_id) {
        remove_comments_for(spammer_id);
      });
    }
  });
}

function remove_comments_for(spammer_id) {
  $(document).find('a[href="profile.asp?u='+spammer_id+'"').closest('div.commentreply').remove();
}

refresh_spammers();