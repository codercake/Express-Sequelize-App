document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getTabTitle').addEventListener('click', function () {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentTab = tabs[0];
        document.getElementById('tabTitle').innerText = currentTab.title;
      });
    });
  });
  