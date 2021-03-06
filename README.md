# Natural Language Processor App

A simple webpage app that will analyse the language of any article or webpage with a url.

This is a full stack solution that uses a front end client with HTML, CSS and Javascript. With a backend solution using Node and Express that is responsible for making calls to a third party API [Meaning Cloud](https://https://www.meaningcloud.com/) that analyses the articles or webpages.

To purpose of this project was to get the developer familiar with Webpack, SASS and Jest. A production and development Webpack configuration were set up and multiple Webpack plugins and loaders were utilized. A basic service worker using the Webpack WorkboxPlugin was also used.

## How to Use

The analyse of the article or webpaged entered by the user is performed using a third party API [Meaning Cloud](https://https://www.meaningcloud.com/). Therefore an API key is needed for the project to run. This can be acquired by signing up to the meaning cloud services for free.

Once an API key is acquired, download the project files and create a .env file in the root of the project, then enter the following. Replacing the X's with your API key.

```
API_KEY = 'XXXXXXX'
```

Using a command line program go to the root directory of the project:

- Install all the project dependencies using `npm install`
- You then have several options:
  - `npm start:dev` to run the development server
  - `npm run build-dev` to build the project in the development configuration then `npm start` to start the server
  - `npm run build-prod` to build the project in the production configuration then `npm start` to start the server
- Visit http://localhost:8080/ in your browser to see the webpage interface
