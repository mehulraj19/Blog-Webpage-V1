//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");
const ejs = require("ejs");

const homeStartingContent = "This is a Blog webpage that works exactly as it should, you can add new blogs, check all the blogs on this homepage. IMPORTANT NOTE: Once you reload the page, then all the data will be gone since it's Version1 and database has not been used yet.";
const aboutContent = "This has been developed by Mehul Raj. This was a challenge project and thus been developed. New Version with database will surely come!!";
const contactContent = "If you are viewing this, you most probably in my github account and thus feel free to ask as many questions you want, I will be really happy if I am able to answer to any of those queries.";
const posts = [];

const app = express();

app.set('view engine', 'ejs');
// app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// All the get functions
app.get("/",function(req,res){
  res.render("home",{homeContent:homeStartingContent,posts:posts});
});

app.get("/about",function(req,res){
  res.render("about",{aboutcontent: aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent: contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:blogName",function(req,res){

  posts.forEach(function(post){
    if(lodash.lowerCase(post.bTitle) === lodash.lowerCase(req.params.blogName)){
      res.render("post",{bTitle: post.bTitle, bContent: post.bContent});
    }
  });


});

//  the post functions
app.post("/compose",function(req,res){
  const post = {
    bTitle: req.body.blogTitle,
    bContent: req.body.blogContent
  };
  posts.push(post);
  res.redirect("/");
});

// the listen signal
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
