
# Figma Plugin DS

A lightweight UI library for creating Figma plugins.

## Contents



## Intro

This package contains CSS and Javascript to closely match the look, feel and function of those found in Figma. It has been created without any frameworks (like React, Vue, etc.) and only leverages (native) javascript for components not possible without.


## Getting started

If you want to get started with a basic plugin (and are new to NPM packages), I recommend checking out my companion project called [Figma Plugin Boilerplate](https://github.com/thomas-lowry/figma-plugin-boilerplate/). This starter project makes development simpler if you just want to write HTML, CSS, and Javascript (without any frameworks). This library comes pre-configured and ready to go. 

You can also install this package as a dependecy on your own project: `npm install figma-plugin-ds`

To use the styles, you can use them via a link tag, or import them like a module using a CSS loader.
```HTML
<!-- Standard link tag-->
<link rel="stylesheet" href="../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css">
```

```Javascript
//or import
import styles from 'figma-plugin-ds/dist/figma-plugin-ds.css'
```

To use the Select menu or Disclosure components, you will need to import the Javascript files as well. This package supports both standard IIFEs and ES6 Modules. There are a number of ways to get started.

Hosted IIFE (quick and easy, I don't want to mess with npm packages):
```HTML
<script src="https://cdn.jsdelivr.net/gh/thomas-lowry/figma-plugin-ds/dist/iife/figma-plugin-ds.js"></script>
<script>
    selectMenu.init(); //initiates the select menu component
    disclosure.init(); //initiates the disclosure component
<script>
```

IIFE 
```HTML
<!-- Standard link tag-->
<script src="../node_modules/figma-plugin-ds/dist/iife/figma-plugin-ds.js"></script> 
```

Modules
```Javascript
import { selectMenu, disclosure } from 'figma-plugin-ds'
```

## Roadmap
- New documentation website in progress
- Improved support for keyboard nav in the select menu
- Slider component

---

# Components

### Button