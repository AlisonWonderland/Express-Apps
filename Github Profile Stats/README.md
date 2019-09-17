# Github stats

Node.js app that displays data about your Github profile using Github's API.

## Screenshots
Current look 9/1/2019 1:00pm
![screenshot](https://i.imgur.com/qu9gOvw.png)

## Important articles I used
* https://medium.com/flawless-app-stories/everything-you-need-to-know-about-loading-animations-10db7f9b61e


## Todo
* RENAME WELCOME.JS AND RELATED. Remove WELCOME from user entered search
* After that think about adding loading animations. To do this send amount of repos(repos.length) and then create that amount of divs and then add to those divs as you get the info.
* Add stylings to login page
* Add links to repo titles.
* Add other stats. 
* Order by button for repos(title, size, language number)
* BIG ONE: Make sure that on refresh pages stay the same.
* OBviously, refactor.

## Timeline of the project
First it started with me wanting to learn about how to integrate Oauth into a project. Didn't find a lot of useful resources until I found [this article](https://www.sohamkamani.com/blog/javascript/2018-06-24-oauth-with-node-js/).

Then I decided to expand on it by fetching more info using the api. In the process I learned about how making requests with my client info gives me a larger limit rate. 

After this I had to venture off and pause the progress on the project because of an issue. This issue was that after clicking the link to initiate the Oauth sign-in and accepting, the user would have to wait until all the data was fetched to see the webpage. Since this takes around 5-10 seconds and there is no instant visual response that proves that the sign-in was noticed, one would think that their internet connection isn't working or that the website can't fetch data. So to fix this I had to learn about...

## What I learned
