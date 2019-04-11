---
title: "Introduction to Express.js"
cover: img/express.png
author: James DeLay
tags: ["Back End"]
image: img/express.png
date: "2019-04-10"
draft: true
---

## Introduction

Hello all you wonderful techies!

Today I will be writing about one of my favorite JavaScript web frameworks: Express.js. As per the Express.js webpage: Express lets JavaScript developers build "fast, unopinionated, minimalist web frameworks" based on Node.js. Express.js is an extremely popular and widely used web framework. It has 41.9 thousand stars on GitHub and according to the amazing people behind the [State of JavaScript](https://stateofjs.com/) out of 20,000 developers surveyed 12,764 developers have used Express (and would use it again) & 3,216 developers want to learn Express. If those statistics aren't enough to peak your interest [check out this list](https://expressjs.com/en/resources/companies-using-express.html) of awesome companies who are currently using Express. **Spoiler Alert** the list includes IBM, Fox Sports, and Uber.

*Alright, alright, alriiiight*, so now that we got the introduction out of the way let's check out the game plan. I want to walk you guys through how to setup a basic Express server from scratch using a JavaScript object as our pseudo-database. Throughout the process I'll introduce, to the best of my knowledge, the basics of HTTP protocol, APIs, and RESTful routing. We'll also learn how to create GET, POST, PUT, and DELETE requests; learn about query strings & request parameters, and learn about middleware functions.

Let's get started!

## The Internet and HTTP Protocol

The Internet is a truly marvelous thing. If you don't already know (which is odd because you're most likely reading this on the internet) it's a worldwide connection of computers. Each computer, smart phone, tablet, smart watch, or what-have-you that's connected to this gargantuan network has the ability to both send and receive data to and from other devices. Much like human communication, when devices that are connected to this network want to talk to each other they use a certain method to communicate. This method is called HTTP protocol; it's a certain standard that most, if not all, devices use to communicate. This protocol follows a *request ⇆ response* cycle; the client makes a request for data and the server responds with that information.

HTTP protocol is designed to be simple, extensible, and stateless. HTTP requests and responses are meant to be easily read and understood by humans. The HTTP protocol is extensible in the fact that it allows us to easily grow/scale our API in the future when further requirements and specifications are uncovered. This simplicity and extensibility allows us to easily develop complex APIs to serve data to our clients.

The request and response objects sent via HTTP contain the following information:

- Method: **GET, POST, PUT, DELETE,** HEAD, CONNECT, OPTIONS, TRACE
- Path: ex. /api/dogs/spot
- Status Code: 200, 404, 500, etc..
- Body: contains data
- Headers: additional information (Date, Encoding, Compression, etc)

## Getting Started with Express

Express is a web framework, built on Node.js, that enables us to create a server that will listen for incoming HTTP requests and respond accordingly. Express is very easy to get up and running but it requires some boilerplate code to get started; so let's start building our Express server, shall we?

First you'll need to have Node and npm installed on your computer. Check out [this video](https://www.youtube.com/watch?v=wREima9e6vk) to get up and running if you haven't done so already. Once that is done you can head to [our GitHub page](https://github.com/Itsa-Tech-Blog/Introduction-to-Express) to clone and view the server we will be building. Feel free to play around with the server and checkout the project's file structure.

Now let's get building! First fire up your terminal and create a new directory somewhere on your machine. Once that is done `cd` into that directory using your terminal. Next type in the command `npm init -y` which will make this directory a node module (the `-y` flag does this using default settings). This allows us to easily install & use other node modules (Express) in our code. Now copy and paste the following command in the terminal: `npm i express morgan && npm i nodemon --save-dev` to install the necessary node modules for our server. Now create an `index.js` file and a `dogs.js` file and open up the project in your code editor of choice.

## Boilerplate Code

Now that we have the necessary tools and file structure let's configure the boilerplate code for our server. First head into the `package.json` file of your project. This file holds metadata and scripts relevant to the project and is also used to identify the project (if published to npm) as well as handle the project's dependencies. Look for the section titled `scripts`; you should see one already there labeled `test`. Right under test we are going to create a new one called `dev` which will allow us to start our server easily via the command line. Copy and paste the following on the line below `test`:

`"dev": "nodemon index.js",`

Nodemon is a very handle module for server development. Once we run the command `npm run dev` nodemon will start our `index.js` and watch for updates in our codebase. If we make any changes nodemon will automagically restart our server without us having to do anything. Great right!?

Now that we have our script configured let's start coding for realsies this time. Let's start by importing the necessary modules. Please copy and paste the following into the top of your `index.js` file:

```js
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;
```

Ignore the `PORT` constant for just a moment and focus your attention on the three imports right above it. First we import Express, which is the web framework we will be using, and secondly we import Morgan. Morgan is a nifty little node module that will log the incoming requests in our server's terminal. This let's us easily identify if an error occurs. Thirdly we instantiate an instance of Express in our `app` constant. This will give us access to all the awesome methods Express provides us. You can theoretically instantiate Express using whatever variable name you choose but for the sake of this post we will instantiate it as `app`.

**Pop quiz:** What does a server do?

Yes! It serves data to a client! But how does it know who to serve the data to? It knows who to serve because it's **listening**, *it's always listening...* Our server will listen on a port and each port on our computer has an identification number, just like actual boat ports. If my friend invited me to hangout on her boat but never told me which dock slip to go to I'd get lost and she'd be waiting for hours. The same occurs with computers. A client needs to know where to go to request the data it needs and a server will serve data to anyone who comes to their port with said properly formatted request. In order for us to get our server operational we have to make it listen. We do that in Express with the following code snippet:

```js
app.listen(PORT, () => {
  console.log('I am currently listening on Port # 3000!');
})
```

This bit of code will get our server listening on port 3000 and log out the above message to the console once the server is ready to handle requests. Remember that `PORT` constant from before? You could just plug the port number directly into the `app.listen` method but I like to save it as a constant. This is handy if you have a very large server file and need to change the port number if conflicts arise. You can just head to the top of your file and change it.

Now that we are listening for requests let's setup up our Morgan logger and body parsing middleware. I'll cover middleware later on in this article so don't be intimidated if your think to yourself "DAWG, **WTF** IS MIDDLEWARE"; that's totally normal. However it's important to know that a body parser allows us to inspect incoming requests before they hit our middleware functions and request endpoints. Since the requests are coming from the client we need to validate the request before we process it. The user can either have malicious intent or they might not know what they're doing. Either way we can prevent a lot of headaches by using a body parser. Lucky for us [Express has got one](https://expressjs.com/en/api.html) built right in. Let's configure Morgan and our body parser using the following code snippet:

```js
// Will interpret the request body as JSON
app.use(express.json());
// The body parser
app.use(express.urlencoded({extended: true}));
// Morgan request logger
app.use(morgan('dev'));
```

Now that we are up and running let's get into the thick of things!

<!-- Mention Top Down Nature of Express (JS executes line by line) -->
## The Basic Methods

    ### GET

        #### Query Strings

    ### POST

        #### Request Parameters

    ### PUT

    ### DELETE

## Middleware

## Error Handling

## RESTful Routing

## Conclusion

## Sources

- [Express.js](https://expressjs.com/)
- [The State of JavaScript 2018](https://stateofjs.com/)
- [Companies using Express](https://expressjs.com/en/resources/companies-using-express.html)
- [Installing Node and `npm`](https://www.youtube.com/watch?v=wREima9e6vk)
- [Body Parser](https://expressjs.com/en/api.html)
