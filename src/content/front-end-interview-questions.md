---
title: "Front End Developer Interview Questions"
cover: img/recursion.jpg
author: James DeLay
tags: ["Front End"]
image: img/recursion.jpg
date: "2019-09-23"
draft: true
---

## Introduction

Hello!

## Table of Contents

1. [React](#React)
   1. [What is React?](#what-is-react)
   2. [What is the Virtual DOM?](#what-is-the-virtual-dom)
   3. [What is JSX?](#what-is-jsx)
   4. [What are some disadvantages to React?](#what-are-some-disadvantages-to-react)
   5. [What is the difference between state and props?](#what-is-the-difference-between-state-and-props)
   6. [What is the second argument that can optionally be passed to setState and what is its purpose?](#what-is-the-second-argument-that-can-optionally-be-passed-to-setstate-and-what-is-its-purpose)
2. [JavaScript](#JavaScript)
3. [CSS](#CSS)
4. [HTML](#HTML)
5. [Sources and Further Reading](#Sources)

## React

### General React Questions

#### What is React?

React is an open source JavaScript framework built by Facebook and first released in 2013. It utilizes an easy to use syntax similar to HTML (JSX) to create reusable components that are rendered in a Virtual DOM and are reactive, meaning they will re-render when the application state changes. A key feature of React is that you learn it once and can easily create web applications, mobile applications (using React Native), and desktop applications (using React with tools like Electron). React is very easy to test thanks to the VDOM.

#### What is the Virtual DOM?

React and other front end frameworks like Angular and Vue use a Virtual DOM. The VDOM is an abstraction of the real DOM tree that sits in memory. It's much more light weight than the real DOM and allows React to watch for changes in the application state and re-render components accordingly. When state change React runs a diffing algorithm to flag the components that should be re-rendered. React then uses the ReactDOM library to run a reconciliation process on these flagged components to sync them with the real DOM. The real DOM has an all-or-nothing update pattern so if our components are constantly changing due to changing state our application would come to a crawl if not for the VDOM.

#### What is JSX?

JSX is an HTML/XML like syntax used by React. It allows you to write all of your code (business logic and HTML markup) in one file. JSX utilizes a transpiler like Babel to convert this code into standard JavaScript objects that the browser's JavaScript engine will parse and convert into DOM elements.

#### What are some disadvantages to React?

There is a relatively steep learning curve and integration with a traditional MVC framework is tricky.

#### What is the difference between state and props?

##### State

State is the data structure used to initialize a component is used to track a user's interaction with the application/component. For example, if you have an input element that expects a user to enter an email your initial state could look like:

```js
this.state = {
    email: ""
}
```

As a user interacts with the application you would update the state to keep track of the user's email. State should always be updating using `setState` so and example for our email scenario could be: 

```js
// evt is short for the DOM Event

handleChange(evt) {
    // Prevent DOM from reloading or executing default functions
    evt.preventDefault()
    this.setState({email: evt.target.value})
}
/*
We initialize the input with the value of our state (empty string)
As a users types the input will be captured and saved to the email state using our handleChange function
*/
<input type='text' value={this.state.email} name='email' onChange={this.handleChange} />
```

##### Props

Props are our component's way to communicate with each other. They are passed from a parent component to a child component, **and only from parent to child** in order to maintain a unidirectional flow of data. Props are immutable and cannot be changed by the component using them (child). Props are kind of like a configuration file. Using our email example we can render a welcome banner using props:

```js
//...our form component
render (
    <WelcomeBanner email={this.state.email}/>
)

// Our Welcome Banner component

function WelcomeBanner(props) {
    return (
        <h1>Welcome, {props.email}</h1>
    )
}
```

In the above example we took our email state (that the user entered) and passed it to a completely different component (WelcomeBanner) using props. This will then render a big ole' welcome sign to our new user.

##### TLDR

State is the data structure used to initialize a component and track user interaction
Props are a component's configuration options received from their parent component; used for component communication.
State is mutable whereas props are immutable.

#### What is the second argument that can optionally be passed to setState and what is its purpose?

A callback function can be passed to `setState` that is called once `setState` has finished executing and the component is re-rendered. It is recommended to use other life-cycle hooks instead of this optional callback.

#### What is a lifecycle method? 

A React component has three different phases: the initial rendering phase, the updating phase, and the unmounting phase.
Lifecycle methods are functions that are called at different times during these three phases.

#### Name some important lifecycle methods.

##### componentWillMount()

Executed just before rendering takes place both on the client as well as server-side.

##### componentDidMount()

Executed on the client side only after the first render.

##### componentWillReceiveProps()

Invoked as soon as the props are received from the parent class and before another render is called.

##### shouldComponentUpdate()

Returns true or false value based on certain conditions. If you want your component to update, return true else return false. By default, it returns false.

##### componentWillUpdate()

Called just before rendering takes place in the DOM.

##### componentDidUpdate()

Called immediately after rendering takes place.

##### componentWillUnmount()

Called after the component is unmounted from the DOM. It is used to clear up the memory spaces.

### React Router

### React Redux

## General JavaScript

## CSS

## HTML

# Sources and Further Reading

- [What is React?](https://reactjs.org/)
- [What is the Virutal DOM?](https://reactjs.org/docs/faq-internals.html#targetText=The%20virtual%20DOM%20(VDOM)%20is,This%20process%20is%20called%20reconciliation.&targetText=They%20may%20also%20be%20considered,virtual%20DOM%E2%80%9D%20implementation%20in%20React.)