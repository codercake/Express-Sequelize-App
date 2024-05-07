const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { Profile } = require('./models');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/profiles', async (req, res) => {
  const { profileUrls } = req.body;

  // Validate input data
  if (!Array.isArray(profileUrls)) {
    return res.status(400).json({ error: 'profileUrls must be an array' });
  }

  try {
    const profilesData = await Promise.all(profileUrls.map(async (url) => {
      // Fetch LinkedIn profile data
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const name = $('h1').text().trim();
      const location = $('.pv-top-card--list.pv-top-card--list-bullet.mt1 li').first().text().trim();
      const about = $('section.pv-about-section .pv-about__summary-text').text().trim();
      const bio = $('section.pv-about-section .pv-about__summary-text').text().trim();
      const followerCount = parseInt($('.pv-top-card--list.pv-top-card--list-bullet.mt1 li').eq(1).text().replace(/[^0-9]/g, ''));
      const connectionCount = parseInt($('.pv-top-card--list.pv-top-card--list-bullet.mt1 li').eq(2).text().replace(/[^0-9]/g, ''));

      return {
        name,
        url,
        about,
        bio,
        location,
        followerCount,
        connectionCount
      };
    }));

    await Profile.bulkCreate(profilesData);

    res.status(201).json({ success: true, message: 'Profiles data saved successfully', data: profilesData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
