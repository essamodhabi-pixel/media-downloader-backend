const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for Firebase Hosting frontend
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend Server is running smoothly' });
});

// Download API endpoint
app.post('/download', (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'يرجى تقديم رابط صالح' });
    }
    
    // Process download logic here
    res.json({ message: 'جاري معالجة الطلب بنجاح', url });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'حدث خطأ داخلي في الخادم' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
