const express = require('express');


const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded( {extended: false }));


//BLOGS TO WORK ON
let blogs = [
    {
        id: 1,
        title: "A bad man",
        body: "Working on first blog"
    },
    {
        id: 2,
        title: "Many good men",
        body: "Working on second blog"
    },
    {
        id: 3,
        title: "I am out of title",
        body: "Working on third blog"
    }
]

//Route to get all blogs
app.get('/blogs', (req, res) => {
    res.json(blogs);
});


//Route to get single blog
app.get('/blogs/:id', (req, res) => {
    const blog = blogs.find((blog) => blog.id == req.params.id);
    if (blog) {
        res.status(200).json(blog);
    } else {
        res.status(404).json({msg: "error getting blog"})
    }
    
});


//Route to create a new blog
app.post('/blogs', (req, res) => {
    const {title, body} = req.body;
    const newBlog = {
        id: blogs.length + 1,
        title: title,
        body: body
    }
    blogs.push(newBlog);

    if (newBlog) {
        res.status(201).json(blogs);
    } else {
        res.status(404).json({msg: "error adding new blog"})
    }
});


//Route to update blog
app.put('/blogs/:id', (req, res) => {
    const blog = blogs.find((blog) => blog.id == req.params.id);

    if (blog) {
        const {title, body} = req.body;
        blog.title = title;
        blog.body = body;
        res.status(200).json(blogs);
    } else {
        res.status(404).json({msg: "error updating blog"})
    } 
});


//Route to delete blog
app.delete('/blogs/:id', (req, res) => {
    const blog = blogs.find((singleBlog) => singleBlog.id == req.params.id);
    
    if (blog) {
     blogs = blogs.filter((filterBlog)=> filterBlog.id !== blog.id);
     res.status(200).json(blogs); 
    } else {
        res.status(404).json({msg: "error deleting blog"})
    } 
});





app.listen(4000);