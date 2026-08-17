export default defineBackground(() => {
    chrome.runtime.onInstalled.addListener(()=>{
          chrome.contextMenus.create({
            id: "post",
            title:"Post Insights",
            contexts: ["all"]
          });
          chrome.contextMenus.create({
            id: "comment",
            title:"Comment Insights",
            contexts: ["all"]
          });
    });
    console.log("CONTENT SCRIPT LOADED");

    chrome.runtime.onMessage.addListener((message) => {
      console.log("Received:", message);
    });
    chrome.contextMenus.onClicked.addListener((info,tab)=>{
      console.log("Menu clicked:", info.menuItemId);
        if(info.menuItemId === "post"){
          if(!tab?.id) return;
            chrome.tabs.sendMessage(tab?.id!,{
                action:"post"
            });
        }
        else if(info.menuItemId === "comment"){
            if(!tab?.id) return;
            chrome.tabs.sendMessage(tab?.id!,{
                action:"comment"
            });
        }
    });
});
