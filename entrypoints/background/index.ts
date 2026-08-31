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
    console.log("BACKGROUND SCRIPT LOADED");

    chrome.runtime.onMessage.addListener((message) => {
      console.log("Received:", message);
    });

    chrome.contextMenus.onClicked.addListener((info,tab)=>{
      console.log("Menu clicked:", info.menuItemId);

      if(!tab?.id) return;

      if(info.menuItemId === "post"){
          chrome.tabs.sendMessage(tab.id,{
              action:"post"
          }).catch((err) => {
              console.warn("[WordScope] Could not reach content script - reload the page and try again:", err.message);
          });
      }
      else if(info.menuItemId === "comment"){
          chrome.tabs.sendMessage(tab.id,{
              action:"comment"
          }).catch((err) => {
              console.warn("[WordScope] Could not reach content script - reload the page and try again:", err.message);
          });
      }
    });
});