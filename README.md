# Figma Plugin DS
A small lightweight design system for use in [Figma Plugins](https://www.figma.com/plugin-docs/). Built with html, css, and js without any dependencies or frameworks. My goal is to make it easier for someome to build their first Figma plugin with familiar languages.

## To use:
Include the contents of `figma-plugin-ds.min.css` inline within the `<style>` tag in `ui.html` of your plugin

Include the contents of `figma-plugin-ds.min.js` inline within the `<script>` tag in `ui.html` of your plugin

HTML markup can be found in the [docs](https://thomas-lowry.github.io/figma-plugin-ds/)

## To customize:
To customize any of the CSS or optimize for performance, you can fork and modify the `figma-plugin-ds.scss` file to remove the parts that you don't need. Pay particular attention to the icons which have separate SCSS files so that it is easy to eliminate the icons you don't need in your plugin. The SCSS source map has also been provided.

---

### Additional help
Open to anyone willing to help or help me get this into a more npm-able format.


### Roadmap
* Tooltips
* Option strips

---

Design of components and icons © [Figma](https://www.figma.com). The goal of this kit is to make UI components that mirror those found in the Figma UI available for use when creating plugins. This is not an official implementation of the Figma components.

---

Ongoing WIP :)
