document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('getTabTitle').addEventListener('click', function () {
      var linkedinProfiles = [
          "https://www.linkedin.com/company/girlscriptsoc/",
          "https://www.linkedin.com/in/sandeep-jain-/",
          "https://www.linkedin.com/school/university-of-melbourne/"
      ];

      // Loop through each LinkedIn profile URL
      linkedinProfiles.forEach(function (profileUrl) {
          // Open each LinkedIn profile URL in a new tab
          chrome.tabs.create({ url: profileUrl }, function (newTab) {
          });
      });
  });
});
