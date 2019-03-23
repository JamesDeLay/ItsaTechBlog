---
title: "What's this *React* thing?"
cover: img/react.png
author: James DeLay
date: "2018-12-05"
tags: ["Front End"]
draft: false
---

## Introduction

Hello! Thanks for stopping by and taking time to read our blog; we appreciate you! This article is for total newcomers to React. It aims to explain how React works, how to install the `create-react-app` CLI, and how to develop a basic application with a few components. If you have any questions, comments, recommendations, or concerns please email or Tweet us! Hope you enjoy!

## React

React was created by Jordan Welke, a software engineer at Facebook, and first used on Facebook's newsfeed page in 2011. Welke created React after being "influenced by XHP which is an HTML component framework for PHP". I've never used XHP, or PHP for that matter, so I can't speak to how those technologies work but I have used React and Mr. Welke was on to something. React applications are built using reusable components; these components are the building blocks that, when combined, form the application. I like to think of these components as Legos on steroids. You can take a whole bunch of Lego bricks, put them together, and build the Batmobile, a castle, the Empire State building, or anything else your mind can imagine. But I think we've all had the experience of building a Lego set and wishing we had just one or two more soldiers to complete the set. Well with React you don't have to worry! You can code a component once and use it as many times as you'd like anywhere inside of your application. That means if you create a cool data table you can use it all over your application.

![Lego Soldier!](/legoSoldier.jpg)

## Hello World

Alrighty, so now that we know a little bit about React I want to start off with the classic and timeless Hello World example so we can see the simplest form of a React application. From there we will create few simple component to demonstrate what I like to call *The Lego Effect!* (dramatic and corny I know...) and learn about how React works. Let's begin!

### Installing the React CLI Tool

Getting started with a React project has been made effortless thanks to the `create-react-app` command line tool. Let's get ourselves up and running so we can see how React works!

Fire up your favorite terminal and type in the following: `npm -i -g create-react-app` or `yarn global add create-react-app` if you're a `yarn` dude or dudette. This will install the `create-react-app` command line tool which will allow you to easily install boilerplate code and start a new React project. The `create-react-app` CLI is really awesome so if you'd like to learn more about it [click here](https://github.com/facebookincubator/create-react-app). 

After you have installed the CLI tool navigate to a directory where you'd like to start your project. In our case you can enter the following in your terminal: `cd /Documents && create-react-app hello-world-react`. This will create a folder called `hello-world-react` in your Documents directory. Now navigate into the `hello-world-react` directory and install all the dependencies using `npm i` or `yarn install`. After the dependencies are installed run the following command in your terminal (make sure you're still in the `hello-world-react` folder): `npm run start`. This will build the app and open your internet browser. If all went according to plan you should see the image below.


![Hello World React](/react-hello-world.png)

## React and The DOM

For the purpose of the next two sections we'll only be concerned with the following files:

- `index.html` in the public folder
- `App.js` in the src folder
- `index.js` in the src folder

The `index.html` you may be familiar with; it's the skeleton of any web application. Notice the `<div id="root">`, this is where the magic begins to happen. Now take a look at the `index.js` file, specifically the line of code that reads `ReactDOM.render(<App />, document.getElementById('root'));`. This ReactDOM render function is a special React function that takes your `<App />` component and tells the DOM to append it to the `<div id="root">` and render it. 

Under the hood React is converting your component logic and JSX into JavaScript and HTML code which the DOM can understand. It is also creating a Virtual DOM, or V-DOM, which is a node tree just like the real DOM. The major difference is that the V-DOM node tree will respond to mutations in data and trigger a re-rendering of components to reflect changes in said data. If you'd like to learn more about the V-DOM check out [this post](https://reactjs.org/docs/faq-internals.html) from the React site.

## Templating in React

So far we know how to install React and how it's working with the DOM. Now let's check out how cool stuff displays on the page. Open up the `App.js` file and check out line 5. Due to the awesomeness of JavaScript's object inheritance model we can make a new object that inherits the properties and values of a parent object. In our case we are creating an object called `App` whose parent is `Component`. This means our `App` class will have some special functionality like the `render()` method that it inherits from the React codebase. The `render()` method allows us to template our HTML using a pseudo-HTML like syntax called JSX. JSX is a preprocessor that adds XML syntax to JavaScript. This means our JSX tags can have tag names, like `<div>`, attributes, like `className`, and children, like more JSX tags. When our component renders, the `render()` method will convert these tags into a React component and *BOOM!* we get cool stuff displayed on our page. Go ahead and add some more JSX tags! You can write them like you would HTML (with a few differences which I'll mention later).

## Programmatically Rendering Data

Alright, so we got some new and awesome things rendering in our application, great work! Now let's do something really cool. If you go to the [Itsa Tech Blog GitHub page](https://github.com/Itsa-Tech-Blog) you can clone our `Intro-to-React` repository and follow along; the rest of the article will refer to this codebase. I've named each directory in the code repository after each section of the article that will serve as its guide. Let's open the `programmatically-render-data` directory and check out the file structure. I've added a `components` and `SideBar` directory to the `src` directory along with some files. This is how I like to organize all of my components; feel free to do whatever makes you most comfortable. I've gone ahead and created a `<SideBar />` component which will render a side bar menu. It looks like this:

![programatically-render-data](/progrenderdata.png)

Take a look at the `SideBar.js` file and you may notice something different from the `App.js` file; we used JavaScript to render `<li>` elements. We have an array of menu items and we map over them to return a list element for each entry which has an on click function as well as a text value.

```jsx
<ul>
    {menuItems.map((menuItem) => {
        return (
            <li key={menuItem} onClick={() => alert(`You clicked ${menuItem}!`)}>{menuItem}</li>
        )
    })}
</ul>
```

We have this ability because React interprets our component using the `render()` method and compiles it into JavaScript. This allows us to programmatically render data using JavaScript functions. To do this we must first add curly braces inside our `<ul>` tag to let React know that we are going to use JavaScript. We can then `menuItem.map((menuItem) =>{})` over each menu item in our array and return data. This functionality makes fetching and rendering API data a breeze.

I mentioned above that JSX is a preprocessor that adds XML functionality to JavaScript and that we can use tag attributes to do stuff; that's how our `onClick={}` function works. React is nice to us and makes adding attributes similar to how we would add them in HTML code. This means we can give our JSX elements all the functionality of HTML elements, including onClick and className functionality. These attribute names can be a little different than HTML attributes, as you may have noticed, so it takes some getting used to.

## Props and State

If you're still with me you rock! This will be the last topic we cover in this article and it's my favorite: using props and state to manage logic and data flow in our components. We'll be using the `props-and-state` code example in this section. Let's start with state!

State gives us the ability to store information inside of our component and have it re-render when that information changes. Let's look at the `Form.js` file in the `props-and-state/src/components/Form` directory. I've made a simple text input that allows a user to input a message and have it render to the page as the person types. Note the `constructor(props){...}` and the `super(props)` methods. The [React `constructor`](https://reactjs.org/docs/react-component.html#constructor) method is called before the component is mounted and is where we declare our state and bind event handlers to the component instance. I'll discuss how the `constructor` and `super` methods work below. For now let's walk through what's going on when a user interacts with the text input.

```js
this.state = {
    formInput: ''
}
this.handleChange = this.handleChange.bind(this)
```
```js
handleChange(event) {
    event.preventDefault()
    let message = event.target.value
    this.setState({formInput: message})
}
```
```html
<p>{this.state.formInput}</p>
<input type="text" placeholder='Type a message..'
value={this.state.formInput} onChange={this.handleChange} />
```

As a user types into our input field our `handleChange()` function is triggered. The initial value of our input field is set equal to `this.state.formInput`, which is an empty string, but as a user types the `handleChange()` function takes in this new value and set's `this.state.formInput` equal to the new value. When our component sees that our state has been updated it will trigger a re-render to reflect these changes on the page. Go ahead and type a message and see what happens! State is great for handling user input and submitting data to an API. Now let's learn about the `constructor` and  `super` methods and how they relate to `props`.

As I mentioned above, all classes in JavaScript have a [constructor method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor) which is either the default Object constructor method built into JavaScript or the parent class's constructor method.

```js
class Polygon {
  constructor(length, width) {
    this.length = length
    this.width = width;
  }
  calcArea() {
    let area = this.width * this.length
    return area
  }
}

let poly = new Polygon()

class Square extends Polygon {
  constructor(length, width, name) {
    super(length, width);
    this.name = name;
  }
}

let sq = new Square(5, 7, 'Tim the Square')
```

Above is a [small code example](https://repl.it/@JimboDeLay/Constructor-Example) of how the `constructor` and `super` methods work. The `constructor` method tells the class what arguments are needed when a new instance of the class is created. In our `Polygon` example, every time we create a `new Polygon` we should pass a length and a width. In our `Square` example, every time we create a `new Square` we should pass a length, a width, and a name. The `super` method in our `Square` example indicates that the `Square` will inherit properties and methods from the `Polygon` class. This gives us access to properties like `length` and `width` as well as methods like `calcArea()` without having to re-declare or re-define these properties and methods in `Square`.

"How the hell does all that relate to props!?" you may ask. Well, props are a way to pass data from one component to the next without having to re-declare or re-calculate information. If you remember from *waaaay* above React manages the V-DOM like a tree with the root being our `<App />` component. This means when we call the `<Form />` component inside of the `<App />` component we can pass the `<Form />` component some information called `props` because it's included in the `<Form />` component's `super` method parameters. Below is an example from the codebase of how to create props.

```jsx
<Form fromApp={'woohoo, I am passing data from the App component!'}/>
```
```html
<p>{this.props.messageFromApp}</p>
```

And that' it! Understanding how props work is important as to avoid data flow issues which can be a pain to debug. It's definitely not necessary to understand the whole `constructor`/`super` thing but the key takeaway is this: in order to use props in a component they must come from a parent component. If we had another component in our codebase called `<HeaderMenu />` and you wanted to pass props from `<HeaderMenu />` to `<Form />` you'd have to call `<Form />` inside of `<HeaderMenu />` otherwise you'd be unable to pass props to `<Form />`. This concept can get very convoluted as your application grows but luckily tools like Redux exist to help you manage your state and data flow.

## Closing Statements

We hope you enjoyed this article! If you'd like to play around with the code from this article you can head to our [GitHub page](https://github.com/itsatechblog), fork or clone the repository to your local machine, and have some fun!

Keep a look out for our future post about advanced React topics such as React life cycle hooks, React Routing, and React Redux: coming soon!

## Resources

- [React Vue Cover Image](https://jelvix.com/images/blog/5a98507190fe4.jpg)
- [React History Wikipedia](https://en.wikipedia.org/wiki/React_(JavaScript_library)#History)
- [`create-react-app`](https://github.com/facebookincubator/create-react-app)
- [Itsa Tech Blog Code Examples](https://github.com/Itsa-Tech-Blog)
- [Object Constructors in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
- [React Constructor](https://reactjs.org/docs/react-component.html#constructor)
- [Constructor code example in Repl.it](https://repl.it/@JimboDeLay/Constructor-Example)
