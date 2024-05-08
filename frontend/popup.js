document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('getTabTitle').addEventListener('click', async function () {
      try {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          const currentTabUrl = tab.url;

          const linkedinUrls = [
              "https://www.linkedin.com/company/girlscriptsoc/",
              "https://www.linkedin.com/in/sandeep-jain-/",
              "https://www.linkedin.com/school/university-of-melbourne/"
          ];

          const profilesData = await Promise.all(linkedinUrls.map(async (url) => {
              try {
                  const response = await fetch(url);
                  const html = await response.text();

                  return {
                      name,
                      location,
                      about,
                      bio,
                      followerCount,
                      connectionCount,
                      bioLine
                  };
              } catch (error) {
                  console.error('Error fetching data from LinkedIn profile:', error);
                  return null;
              }
          }));

          const validProfilesData = profilesData.filter(profile => profile !== null);

          const response = await fetch('http://localhost:3000/api/profiles', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(validProfilesData)
          });

          if (response.ok) {
              const data = await response.json();
              console.log('Data posted successfully:', data);
          } else {
              console.error('Failed to send profile data');
          }
      } catch (error) {
          console.error('Error processing profiles:', error);
      }
  });
});
