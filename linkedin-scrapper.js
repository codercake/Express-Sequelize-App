const axios = require('axios');
const puppeteer = require('puppeteer');

// Function to retrieve profile data from LinkedIn API
const getProfileData = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer <THREE_LEGGED_ACCESS_TOKEN>`, // Replace with your actual access token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from LinkedIn API:', error);
    return null;
  }
};

// LinkedIn profile URLs
const profileUrls = [
  'https://www.linkedin.com/company/girlscriptsoc/',
  'https://www.linkedin.com/in/sandeep-jain-/',
  'https://www.linkedin.com/school/university-of-melbourne/'
];

// Retrieve profile data using LinkedIn API
const extractedData = [];
for (const profileUrl of profileUrls) {
  const profileData = await getProfileData(profileUrl);
  if (profileData) {
    extractedData.push(profileData);
  }
}

// Post data to your API endpoint
const postData = {
  linkedinUrls: profileUrls,
  profilesData: extractedData
};

try {
  const response = await axios.post('http://localhost:3000/api/profiles', postData);
  console.log('Data posted successfully:', response.data);
} catch (error) {
  console.error('Error posting data to API:', error);
}
