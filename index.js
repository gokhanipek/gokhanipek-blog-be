require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

console.log('running');

router.get('/api/ghost/posts', (req, res) => {
    const getPosts = async () => {
        try {
            const response = await axios.get(
                'http://localhost:2368/ghost/api/v3/content/posts', 
            {
                params: {
                    key: process.env.GHOST_CONTENT_API_KEY
                }
            })
            res.json({posts: response.data.posts})
        }
        catch(err) {
            console.log(err);
        }
    }
    getPosts();
});

router.get('/api/ghost/posts/:id', (req, res) => {
    const getPostsById = async () => {
        try {
            const response = await axios.get(
                `http://localhost:2368/ghost/api/v3/content/posts/${req.params.id}`, 
            {
                params: {
                    key: process.env.GHOST_CONTENT_API_KEY
                }
            })
            res.json({posts: response.data.posts})
        }
        catch(err) {
            console.log(err);
        }
    }
    getPostsById();
});

const app = express();

app.use(express.json());
app.use('/', router);
app.listen(5000);

console.warn('server is ready to listen to port 5000');