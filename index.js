const express = require('express');
const server = express();
const postsRouter = require('./posts-router.js');

server.use(express.json());
server.use("/api/posts", postsRouter);


const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})