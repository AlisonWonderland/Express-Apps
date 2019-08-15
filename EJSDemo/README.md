# EJSDemo

## Commands needed to run app
```
npm install express/ejs --save
```

## What I learned about/notes
* EJS files: Which are used to generate HTML markup using javascript. Meaning you can add markup to a page directly, using EJS.
* The brackets used to wrap around javascript:
```
<% %>
<%= >
```
The first one is used for conditonal statements and for loops. The second one is used for variables that you'll pass values to when a route is matched.
* res.render(filename, object of values to assign values <em>optional</em>): used when you want a html file to be used based on the url path.
* Including styles in ejs files. This can be done a couple of ways, including a style tag in a ejs file or creating a style sheet and linking it with the link tag in the ejs file. Note that linking the file only requires the file name if you specify the subfolder that its in using 'app.use(express.static("folder_name"));
* Partials: Templates that allow you the include/add the same code to multiple ejs files. One example would be to add the html boilerplate to all our ejs files.
