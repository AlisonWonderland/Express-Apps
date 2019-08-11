# EJSDemo

## Commands needed to run app
```
npm install express/ejs --save
```

## What I learned about
* EJS files: Which are used to generate HTML markup using javascript. Meaning you can add markup to a page directly, using EJS.
* The brackets used to wrap around javascript:
```
<% %>
<%= >
```
The first one is used for conditonal statements and for loops. The second one is used for variables that you'll pass values to when a route is matched.
* res.render(filename, object of values to assign values <em>optional</em>): used when you want a html file to be used based on the url path.
