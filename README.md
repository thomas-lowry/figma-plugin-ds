# Figma Plugin DS

A lightweight UI library for creating Figma plugins.

## Contents

  * [Contents](#contents)
  * [Intro](#intro)
  * [Getting started](#getting-started)
  * [Roadmap](#roadmap)
  * [Components](#components)
    + [Button](#button)
    + [Checkbox](#checkbox)
    + [Disclosure](#disclosure)
    + [Icon](#icon)
    + [Icon button](#icon-button)
    + [Input](#input)
    + [Labels and sections](#labels-and-sections)
    + [Onboarding tip](#onboarding-tip)
    + [Radio button](#radio-button)
    + [Select menu](#select-menu)
    + [Switch](#switch)
    + [Textarea](#textarea)
    + [Type](#type)


## Intro

This package contains CSS and Javascript to closely match the look, feel and function of those found in Figma. It has been created without any frameworks (like React, Vue, etc.) and only leverages (native) javascript for components not possible without.


## Getting started

If you want to get started with a basic plugin (and are new to NPM packages), I recommend checking out my companion project called [Figma Plugin Boilerplate](https://github.com/thomas-lowry/figma-plugin-boilerplate/). This starter project makes development simpler if you just want to write HTML, CSS, and Javascript (without any frameworks). This library comes pre-configured and ready to go. 

You can also install this package as a dependecy on your own project: `npm install figma-plugin-ds`


**Styles**
To use the styles, you can use them via a link tag, or import them like a module using a CSS loader.
```HTML
<!-- Standard link tag-->
<link rel="stylesheet" href="../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css">
```

```Javascript
//You could also inport the css via a CSS Loader in your JS environment
import styles from 'figma-plugin-ds/dist/figma-plugin-ds.css'
```

To use the Select menu or Disclosure components, you will need to import the Javascript files as well. This package supports both standard IIFE (Immediately Invoked Function Expressions) and ES6 Modules. There are a number of ways to get started.

**Scripts: IIFE hosted on CDN (quick and easy, I don't want to mess with npm packages)**
```HTML
<script src="https://cdn.jsdelivr.net/gh/thomas-lowry/figma-plugin-ds/dist/iife/figma-plugin-ds.js"></script>
<script>
    selectMenu.init(); //initiates the select menu component
    disclosure.init(); //initiates the disclosure component
<script>
```

**Scripts: IIFE**
```HTML
<!-- Standard link tag-->
<script src="../node_modules/figma-plugin-ds/dist/iife/figma-plugin-ds.js"></script> 
```

**Scripts: ES6 Modules**
```Javascript
import { selectMenu, disclosure } from 'figma-plugin-ds';
```


## Roadmap
- New documentation website 
- Improved support for keyboard nav in the select menu
- Slider component


---

# Components

### Button

To use the button, use the following HTML markup. Each button has a destructive option. Teritary buttons are styled like hyperlinks.

```HTML
<!-- Primary -->
<button class='button button--primary'>Label</button> 
<button class='button button--primary-destructive'>Label</button>
<button class='button button--primary' disabled>Label</button> 

<!-- Secondary -->
<button class='button button--secondary'>Label</button>
<button class='button button--secondary-destructive'>Label</button>
<button class='button button--secondary' disabled>Label</button>

<!-- Tertirary (Hyperlink style button) -->
<button class='button button--tertiary'>Label</button>
<button class='button button--tertiary-destructive'>Label</button>
<button class='button button--tertiary' disabled>Label</button>
```

**Modifiers**

| Modifier class                       | Description                                                                                     |
|--------------------------------------|-------------------------------------------------------------------------------------------------|
| `button--primary`                    | Primary button                                                                                  |
| `button--primary-destructive`        | Primary button with red destructive variant for actions such as deleting something              |
| `button--secondary`                  | Secondary button with outline style                                                             |
| `button--secondary-destructive`      | Secondary button with red destructive variant for actions such as deleting something            |
| `button--tertiary`                   | Tertiary button with hyperlink style                                                            |
| `button--tertiary-destructive`       | Tertiary button with red destructive variant for actions such as deleting something             |

---

### Checkbox

To use the checkbox, use the following HTML markup. Remember each checkbox should get a unique ID that is referenced in the label. This ensures the checkbox and the entire label are clickable.

```HTML
<!-- Checkbox unchecked -->
<div class="checkbox">
  <input id="uniqueId" type="checkbox" class="checkbox__box">
  <label for="uniqueId" class="checkbox__label">Label</label>
</div>

<!-- Checkbox checked -->
<div class="checkbox">
  <input id="uniqueId" type="checkbox" class="checkbox__box" checked>
  <label for="uniqueId" class="checkbox__label">Label</label>
</div>

<!-- Checkbox disabled -->
<div class="checkbox">
  <input id="uniqueId" type="checkbox" class="checkbox__box" disabled>
  <label for="uniqueId" class="checkbox__label">Label</label>
</div>
```

---

### Disclosure

To use a disclosure panel, you must use the following markup and also make sure you initialize the Javascript for the disclosure to work. 

```HTML
<!-- Disclosure -->
<ul class="disclosure">
  <li class="disclosure__item disclosure--expanded">
    <div class="disclosure__label disclosure--section">Disclosure heading</div> <!-- This item is styled as a section -->
    <div class="disclosure__content">Panel content here</div>
  </li>

  <li class="disclosure__item disclosure--expanded"> <!-- This item is expanded on load -->
    <div class="disclosure__label">Disclosure heading</div>
    <div class="disclosure__content">Panel content here</div>
  </li>

  <li class="disclosure__item">
    <div class="disclosure__label">Disclosure heading</div>
    <div class="disclosure__content">Panel content here</div>
  </li>
</ul>
```

To initialize with Javascript:
```Javascript
//initialize all disclosure panels
disclosure.init();

//uninitialize all disclosure panels
disclosure.destroy();
```

**Modifiers**

| Modifier class         | Description                                                                                     |
|------------------------|-------------------------------------------------------------------------------------------------|
| `disclosure--section`  | Add this class to the `disclosure__label` to style it like a heading                            |
| `disclosure--expanded` | Add this class to the `disclosure__item` to have it expanded on load                            |

---

### Icon

To use the icon component, use the following markup. Apply the appropriate modifier class to select the item you wish to use, you can also add additional modifiers to change the color, or even spin the icon. You can also specify no icon name to use a text character as an icon (for example, like found in the width + height icon inputs in Figma)

```HTML
<!-- Icon -->
<div class="icon icon--theme"></div>

<!-- Icon with blue modifier class to change color -->
<div class="icon icon--theme icon--blue"></div>

<!-- Spinner icon with spinning animation-->
<div class="icon icon--spinner icon--spin"></div>

<!-- Text icon -->
<div class="icon">W</div>
```

**Modifiers**

| Modifier class     | Description                                                                                     |
|--------------------|-------------------------------------------------------------------------------------------------|
| `icon--iconName`*  | Sepcify which icon to use. Ex: `icon--adjust` or `icon--settings`                               |
| `icon--spin`       | Causes the icon to spin in an endless loop (for example: a loader used with `icon--spinner`)    |
| `icon--colorName`* | Pass the name of any Figma color var to this prop. Ex: `icon--blue` or `icon--black3`           |

_*Colors accepted: icon--blue, icon--purple, icon--purple4, icon--hot-pink, icon--green, icon--red, icon--yellow, icon--black, icon--black8, icon--black3, icon--white, icon--white8, icon--white4_

**Icons**

To use an icon, add one of the following modifier classes (see markup example above).

| Icon                                                                                   | Modifier class                        |
|----------------------------------------------------------------------------------------|---------------------------------------|
| ![IconAdjust](src/icons/adjust.svg "icon")                                             | `icon--adjust`                        |
| ![IconAlert](src/icons/alert.svg "icon")                                               | `icon--alert`                         |
| ![IconAngle](src/icons/angle.svg "icon")                                               | `icon--angle`                         |
| ![IconArrowLeftRight](src/icons/arrow-left-right.svg "icon")                           | `icon--arrow-left-right`              |
| ![IconUpDown](src/icons/arrow-up-down.svg "icon")                                      | `icon--updown`                        |
| ![IconAutoLayoutHorizontal](src/icons/auto-layout-horizontal.svg "icon")               | `icon--auto-layout-horizontal`        |
| ![IconAutoLayoutVertical](src/icons/auto-layout-vertical.svg "icon")                   | `icon--auto-layout-vertical`          |
| ![IconBack](src/icons/back.svg "icon")                                                 | `icon--back`                          |
| ![IconBlendEmpty](src/icons/blend-empty.svg "icon")                                    | `icon--blend-empty`                   |
| ![IconBlend](src/icons/blend.svg "icon")                                               | `icon--blend`                         |
| ![IconBreak](src/icons/break.svg "icon")                                               | `icon--break`                         |
| ![IconCaretDown](src/icons/caret-down.svg "icon")                                      | `icon--caret-down`                    |
| ![IconCaretLeft](src/icons/caret-left.svg "icon")                                      | `icon--caret-left`                    |
| ![IconCaretRight](src/icons/caret-right.svg "icon")                                    | `icon--caret-right`                   |
| ![IconCaretUp](src/icons/caret-up.svg "icon")                                          | `icon--caret-up`                      |
| ![IconCheck](src/icons/check.svg "icon")                                               | `icon--check`                         |
| ![IconClose](src/icons/close.svg "icon")                                               | `icon--close`                         |
| ![IconComponent](src/icons/component.svg "icon")                                       | `icon--component`                     |
| ![IconCornerRadius](src/icons/corner-radius.svg "icon")                                | `icon--corner-radius`                 |
| ![IconCorners](src/icons/corners.svg "icon")                                           | `icon--corners`                       |
| ![IconDistributeHorizontalSpacing](src/icons/distribute-horizontal-spacing.svg "icon") | `icon--distribute-horizontal-spacing` |
| ![IconDistributeVerticalSpacing](src/icons/distribute-vertical-spacing.svg "icon")     | `icon--distribute-vertical-spacing`   |
| ![IconDraft](src/icons/draft.svg "icon")                                               | `icon--draft`                         |
| ![IconEffects](src/icons/effects.svg "icon")                                           | `icon--effects`                       |
| ![IconEllipses](src/icons/ellipses.svg "icon")                                         | `icon--ellipses`                      |
| ![IconEyedropper](src/icons/eyedropper.svg "icon")                                     | `icon--eyedropper`                    |
| ![IconForward](src/icons/forward.svg "icon")                                           | `icon--forward`                       |
| ![IconFrame](src/icons/frame.svg "icon")                                               | `icon--frame`                         |
| ![IconGroup](src/icons/group.svg "icon")                                               | `icon--group`                         |
| ![IconHidden](src/icons/hidden.svg "icon")                                             | `icon--hidden`                        |
| ![IconHorizontalPadding](src/icons/horizontal-padding.svg "icon")                      | `icon--horizontal-padding`            |
| ![IconHyperlink](src/icons/hyperlink.svg "icon")                                       | `icon--hyperlink`                     |
| ![IconImage](src/icons/image.svg "icon")                                               | `icon--image`                         |
| ![IconInstance](src/icons/instance.svg "icon")                                         | `icon--instance`                      |
| ![IconKey](src/icons/key.svg "icon")                                                   | `icon--key`                           |
| ![IconLayoutAlignBottom](src/icons/layout-align-bottom.svg "icon")                     | `icon--layout-align-bottom`           |
| ![IconAlignHorizontalCenters](src/icons/layout-align-horizontal-centers.svg "icon")    | `icon--align-horizontal-centers`      |
| ![IconAlignLeft](src/icons/layout-align-left.svg "icon")                               | `icon--align-left`                    |
| ![IconAlignRight](src/icons/layout-align-right.svg "icon")                             | `icon--align-right`                   |
| ![IconAlignTop](src/icons/layout-align-top.svg "icon")                                 | `icon--align-top`                     |
| ![IconAlignVerticalCenters](src/icons/layout-align-vertical-centers.svg "icon")        | `icon--align-vertical-centers`        |
| ![IconLayoutGridColumns](src/icons/layout-grid-columns.svg "icon")                     | `icon--layout-grid-columns`           |
| ![IconLayoutGridRows](src/icons/layout-grid-rows.svg "icon")                           | `icon--layout-grid-rows`              |
| ![IconLayoutGridUniform](src/icons/layout-grid-uniform.svg "icon")                     | `icon--layout-grid-uniform`           |
| ![IconLibrary](src/icons/library.svg "icon")                                           | `icon--library`                       |
| ![IconLinkBroken](src/icons/link-broken.svg "icon")                                    | `icon--link-broken`                   |
| ![IconLinkConnected](src/icons/link-connected.svg "icon")                              | `icon--link-connected`                |
| ![IconListDetailed](src/icons/list-detailed.svg "icon")                                | `icon--list-detailed`                 |
| ![IconListTile](src/icons/list-tile.svg "icon")                                        | `icon--list-tile`                     |
| ![IconList](src/icons/list.svg "icon")                                                 | `icon--list`                          |
| ![IconLockOff](src/icons/lock-off.svg "icon")                                          | `icon--lock-off`                      |
| ![IconLockOn](src/icons/lock-on.svg "icon")                                            | `icon--lock-on`                       |
| ![IconMinus](src/icons/minus.svg "icon")                                               | `icon--minus`                         |
| ![IconPlay](src/icons/play.svg "icon")                                                 | `icon--play`                          |
| ![IconPlus](src/icons/plus.svg "icon")                                                 | `icon--plus`                          |
| ![IconRandom](src/icons/random.svg "icon")                                             | `icon--random`                        |
| ![IconRecent](src/icons/recent.svg "icon")                                             | `icon--recent`                        |
| ![IconResizeToFit](src/icons/resize-to-fit.svg "icon")                                 | `icon--resize-to-fit`                 |
| ![IconResolveFilled](src/icons/resolve-filled.svg "icon")                              | `icon--resolve-filled`                |
| ![IconResolve](src/icons/resolve.svg "icon")                                           | `icon--resolve`                       |
| ![IconReverse](src/icons/reverse.svg "icon")                                           | `icon--reverse`                       |
| ![IconSearchLarge](src/icons/search-large.svg "icon")                                  | `icon--search-large`                  |
| ![IconSearch](src/icons/search.svg "icon")                                             | `icon--search`                        |
| ![IconSettings](src/icons/settings.svg "icon")                                         | `icon--settings`                      |
| ![IconShare](src/icons/share.svg "icon")                                               | `icon--share`                         |
| ![IconSmiley](src/icons/smiley.svg "icon")                                             | `icon--smiley`                        |
| ![IconSortAlphaAsc](src/icons/sort-alpha-asc.svg "icon")                               | `icon--sort-alpha-asc`                |
| ![IconSortAlphaDsc](src/icons/sort-alpha-dsc.svg "icon")                               | `icon--sort-alpha-dsc`                |
| ![IconSortTopBottom](src/icons/sort-top-bottom.svg "icon")                             | `icon--sort-top-bottom`               |
| ![IconSpacing](src/icons/spacing.svg "icon")                                           | `icon--spacing`                       |
| ![IconSpinner](src/icons/spinner.svg "icon")                                           | `icon--spinner`                       |
| ![IconStarOff](src/icons/star-off.svg "icon")                                          | `icon--star-off`                      |
| ![IconStarOn](src/icons/star-on.svg "icon")                                            | `icon--star-on`                       |
| ![IconStrokeWeight](src/icons/stroke-weight.svg "icon")                                | `icon--stroke-weight`                 |
| ![IconStyles](src/icons/styles.svg "icon")                                             | `icon--styles`                        |
| ![IconSwap](src/icons/swap.svg "icon")                                                 | `icon--swap`                          |
| ![IconTheme](src/icons/theme.svg "icon")                                               | `icon--theme`                         |
| ![IconTidyUpGrid](src/icons/tidy-up-grid.svg "icon")                                   | `icon--tidy-up-grid`                  |
| ![IconTidyUpListHorizontal](src/icons/tidy-up-list-horizontal.svg "icon")              | `icon--tidy-up-list-horizontal`       |
| ![IconTidyUpListVertical](src/icons/tidy-up-list-vertical.svg "icon")                  | `icon--tidy-up-list-vertical`         |
| ![IconTimer](src/icons/timer.svg "icon")                                               | `icon--timer`                         |
| ![IconTrash](src/icons/trash.svg "icon")                                               | `icon--trash`                         |
| ![IconVerticalPadding](src/icons/vertical-padding.svg "icon")                          | `icon--vertical-padding`              |
| ![IconVisible](src/icons/visible.svg "icon")                                           | `icon--visible`                       |
| ![IconWarningLarge](src/icons/warning-large.svg "icon")                                | `icon--warning-large`                 |
| ![IconWarning](src/icons/warning.svg "icon")                                           | `icon--warning`                       |

---

### Icon button

The icon button is essentially a wrapper for the icon component. Refer to the icon component above for its usage.

```HTML
<!-- Icon button with a blend icon -->
<div class="icon-button">
  <div class="icon icon--blend"></div>
</div>

<!-- Icon button with selected modifier -->
<div class="icon-button icon-button--selected">
  <div class="icon icon--blend"></div>
</div>
```

---

### Input

To use the input, use the following markup. You can also insert an icon into the input (see Icon component for usage).

```HTML
<!-- Input with placeholder -->
<div class="input">
  <input type="input" class="input__field" placeholder="Placeholder">
</div>

<!-- Input with initial value -->
<div class="input">
  <input type="input" class="input__field" value="Initial value">
</div>

<!-- Disabled input -->
<div class="input">
  <input type="input" class="input__field" value="Initial value" disabled>
</div>

<!-- Input with icon -->
<div class="input input--with-icon">
  <div class="icon icon--angle"></div>
  <input type="input" class="input__field" value="Value">
</div>
```

**Modifiers**

| Modifier class      | Description                                                                                     |
|---------------------|-------------------------------------------------------------------------------------------------|
| `input--with-icon`* | Add this modifier class if you plan to include the icon component within the input              |

---

### Labels and sections

To use a label or section, use the following markup.

```HTML
<!-- Label -->
<div class="label">Label</div>

<!-- Section title -->
<div class="section-title">Section title</div>
```

### Onboarding tip

To create an onboarding tip, use the following markup. The tip also makes use of the icon component (see Icon component for usage).

```HTML
<div class="onboarding-tip">
  <div class="icon icon--styles"></div>
  <div class="onboarding-tip__msg">Onboarding tip goes here.</div>
</div>
```

---

### Radio button

To create an radio button, use the following markup. Remember each group of radio buttons must share the same name so that they are related to one another. Each button should have a unique id so that its label is associated with it and remains part of the clickable hit area.

```HTML
<!-- Radio button -->
<div class="radio">
    <input id="radioButton1"type="radio" class="radio__button" value="Value" name="radioGroup" >
    <label for="radioButton1" class="radio__label">Radio button</label>
</div>

<!-- Radio button checked -->
<div class="radio">
    <input id="radioButton2"type="radio" class="radio__button" value="Value" name="radioGroup" checked>
    <label for="radioButton2" class="radio__label">Radio button</label>
</div>

<!-- Radio button disabled-->
<div class="radio">
    <input id="radioButton3"type="radio" class="radio__button" value="Value" name="radioGroup" disabled>
    <label for="radioButton3" class="radio__label">Radio button</label>
</div>
```

---

### Select menu

To create an select menu, use the following markup. The select menu also requires you to initalize it with Javascript. If your plugin requires you to add or remove items in the select menu, simply use Javascript to modify the select menu and the select will reinitialize.

The select menu will open and position the menu to the selected object. If there is no vertical room inside your plugin's iFrame, the position of the menu will be moved to ensure it fits inside the iframe. If you have a select menu with too many options to fit within the iFrame, the menu will scroll vertically.

```HTML
<!-- Select menu, default behavior is for the initial item to get selected -->
<select id="uniqueId" class="select-menu">
  <option value="1" >Item 1</option>
  <option value="2" >Item 2</option>
  <option value="3" >Item 3</option>
</select>

<!-- Select menu, provide an initial item with no value to have no items selected -->
<select id="uniqueId" class="select-menu">
  <option>Please make a selection</option>
  <option value="2" >Item 2</option>
  <option value="3" >Item 3</option>
</select>

<!-- Disabled select menu -->
<select id="uniqueId" class="select-menu" disabled>
  <option value="1" >Item 1</option>
  <option value="2" >Item 2</option>
  <option value="3" >Item 3</option>
</select>
```

To initialize with Javascript:
```Javascript
//initialize all select menus
selectMenu.init();

//uninitialize all select menus
selectMenu.destroy();
```

---

### Switch

To use the switch, use the following HTML markup. Remember each switch should get a unique ID that is referenced in the label. This ensures the switch and the entire label are clickable.

```HTML
<!-- Switch -->
<div class="switch">
    <input class="switch__toggle" type="checkbox" id="uniqueId">
    <label class="switch__label" for="uniqueIdA">Label</label>
</div>

<!-- Switch checked -->
<div class="switch">
    <input class="switch__toggle" type="checkbox" id="uniqueId" checked>
    <label class="switch__label" for="uniqueId">Label</label>
</div>

<!-- Disabled switch -->
<div class="switch">
    <input class="switch__toggle" type="checkbox" id="uniqueId" disabled>
    <label class="switch__label" for="uniqueId">Label</label>
</div>
```

---

### Textarea

To use the textarea, use the following HTML markup.

```HTML
<!-- Textarea -->
<textarea class="textarea" rows="2">Initial value</textarea>

<!-- Disabled textarea -->
<textarea class="textarea" rows="2" disabled>Initial value</textarea>
```

---

### Type

To use the typography that is styled like it is in the Figma UI, use the following markup plus additional modifier classes to modify the size, weight, and letterspacing that is optimized for positive (dark text on light background) and negative (light text on dark background) applications.

```HTML
<div class="type">UI11, size: xsmall (default) weight: normal, positive</div>
<div class="type type--large type--bold">UI13, size: large, weight: bold, positive</div>
<div class="type type--small type--medium type--inverse">UI12, size: large, weight: medium, negative</div>
```

**Modifiers**

| Modifier class     | Description                                                                                         |
|--------------------|-----------------------------------------------------------------------------------------------------|
| `type--small`      | Font size 12px                                                                                      |
| `type--large`      | Font size 13px                                                                                      |
| `type--xlarge`     | Font size 14px                                                                                      |
| `type--medium`     | Font weight medium                                                                                  |
| `type--bold`       | Font weight bold                                                                                    |
| `type--inverse`    | Inversed (negative) application where light text is on dark background with increased letterspacing |

_Defaults: Font size 11px, normal weight, positive application_
