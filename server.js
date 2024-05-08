const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
