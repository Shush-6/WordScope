import "../popup/style.css";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",
  async main(ctx){
    chrome.runtime.onMessage.addListener(async (message)=>{
      console.log("WordScope Content Script Loaded");
      switch(message.action){
          case "post":
          console.log("Post menu clicked");
          break;
          case "comment":
          console.log("Comment menu clicked");
          break;
          default:
          console.log("Unknown action");
          break;
      }
    });
  },
});
