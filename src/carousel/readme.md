# Carousel

![Lightbox](../../etc/carousel.png)
A responsive image carousel.

## Introduction
The Material Design Lite Ext (MDLEXT) Carousel, commonly also referred to as “slide shows” or “sliders”, is a component 
for cycling through a series of images. The carousel is defined and enclosed by a container element and 
distributes images horizontally, with repect to the available container size. Images outside the container viewport slides
into view, triggerd by a user action or by running an animation loop (rAF). 

This component does not attempt in any way to resemble a three-dimensional image carousel that is used to show slides 
from a projector. The component is perceived more as a slider, but the terms slider and carousel, are often used 
interchangeably.

### Features:
* Navigate carousel using keyboard (arrow keys, tab, pgup, pgdown, home, end), mouse drag, touch events, or by sending custom events to the carousel (first, scroll-prev, prev, next, scroll-next, last, play, pause)
* Select a particular image  using enter or space key, or by clicking an image 
* Cycle images from left to right at a given interval, a slideshow
* Set slideshow interval via a data attribute or as a part of the play custom event
* Stop slideshow via custom event (pause) or by a user interaction, e.g clicking an image
* User interactions via keyboard or mouse may be blocked, if configured 
* Start slideshow at page load using a data attribute
* The carousel emits custom events reflecting a user action. E.g. clicking an image will emit a 'select' event with a detail object holding a reference to the selected image.
* The carousel pauses any running animation on window.bur or tab.blur

### Limitations:
* The carousel should pause any running animation when the carousel is not in window viewport - mot implemented
* Only horizontal layout in first release


### To include a MDLEXT **carousel** component:

&nbsp;1. Code a block element, e.g. a `<div>` element, to hold dimensions of the carousel. 
```html
<div style="height: 200px; width: 100%;">
</div>
```

&nbsp;2. Code a `<ul>` element with `class="mdlext-carousel mdlext-js-carousel"` to hold the carousel. 
```html
<div style="height: 200px; width: 100%;">
  <ul class="mdlext-carousel mdlext-js-carousel">
  <ul>
</div>
```

&nbsp;3. Code a `<li>` element with `class="mdlext-carousel__slide"`  to hold an individual image (thumbnail). 
```html
<div style="height: 200px; width: 100%;">
  <ul class="mdlext-carousel mdlext-js-carousel">
    <li class="mdlext-carousel__slide">
    <li>
  <ul>
</div>
```

&nbsp;4. Code a `<figure>` element to hold the image and the image title.  
```html
<div style="height: 200px; width: 100%;">
  <ul class="mdlext-carousel mdlext-js-carousel">
    <li class="mdlext-carousel__slide">
      <figure>
      </figure>
    <li>
  <ul>
</div>
```

&nbsp;5. Inside the `<figure>` element add an `<img>` element with reference to the thumbnail image to be shown. Optionally add a `<figcaption>` element to hold the image title.    
```html
<div style="height: 200px; width: 100%;">
  <ul class="mdlext-carousel mdlext-js-carousel">
    <li class="mdlext-carousel__slide">
      <figure>
        <img src="_D802591.jpg" title="Whooper swans in flight"/>
        <figcaption>_D802591.jpg</figcaption>
      </figure>
    <li>
  <ul>
</div>
```

&nbsp;6. Repeat steps 3..5 for each slide required.

### Examples
See: [snippets/carousel.html](./snippets/carousel.html)

## Interactions

### Keyboard interaction
The carousel interacts with the following keyboard keys.

*   `Tab` - When focus is on a slide, pressing the `Tab` key moves focus in the following manner:
      *   If there is a next slide, focus moves to the next slide.
      *   If focus is on the last slide, focus moves to the first focusable element outside the carousel component.
*   `Shift+Tab` - Generally the reverse of `Tab`.
*   `Left arrow` - Moves focus to the previous slide. If the current slide is the first slide, focus stays on that slide.
*   `Right arrow` - Moves focus to the next slide. If the current slide is the last slide, focus stays on that slide.
*   `Up arrow` - behaves the same as left arrow.
*   `Down arrow` - behaves the same as right arrow.
*   `End` - When focus is on a slide, an `End` key press moves focus to the last slide.
*   `Home` - When focus is on a slide, a `Home` key press moves focus to the first slide.
*   `Enter/Space` - When focus is on a slide, pressing `Enter` or `Space` selects the focused slide. The carousel emits a **select** event.

### Mouse / Touch interaction
*   `Drag or Swipe left` - Moves slides outside container viewport into view.
*   `Drag or Swipe right` - Moves slides outside container viewport into view

## Events
Interaction with the component programmatically is performed by sending events to the component, and receive responses 
from the component.  

### Events listened to

### Events emitted

## Configuration options

## Public methods

### `stopAnimation()`

Due to a bug in Material Design Lite, a client is required to stop any running animation before the component is removed 
from the MDL component handler. If you are building e.g. a single page application, any running animation must be stopped
before a page frament containing the carousel is removed from DOM. In a static page web application there is no need to 
stop any running animation.

The following code snippet demonstrates how to properly clean up components before removing them from DOM.

```javascript
// Clean up
const content = document.querySelectorAll('#content .is-upgraded');
componentHandler.downgradeElements([...content]);

// Stop animation - if any
[...content.querySelectorAll('.mdlext-js-carousel')].forEach( carousel => {
  if(carousel.MaterialExtCarousel) {
    carousel.MaterialExtCarousel.stopAnimation();
  }
});

// Proper method to remove elements from DOM
// See: http://jsperf.com/empty-an-element/16 
```

## CSS classes, attributes and SASS variables
The MDLEXT CSS classes apply various predefined visual and behavioral enhancements to the carousel.
The table below lists the available classes and their effects.

| MDLEXT class | Effect | Remarks |
|--------------|--------|---------|
| `mdlext-carousel` | Defines a container as an MDLEXT carousel component | Required on `<ul>` element |
| `mdlext-js-carousel` | Assigns basic MDL behavior to carousel | Required on `<ul>` element |
| `mdlext-carousel__slide` | Defines a carousel slide | Required on `<li>` element |

Attributes.

| Attribute | Effect | Remarks |
|-----------|--------|---------|
| `data-config` | A JSON object defining startup configurations | The JSON object has the following structure:<br>`{ 'interactive': false, 'autostart': false, 'type': 'slide', 'interval': 2000 }` |
| `aria-selected` | The selected `mdlext-carousel__slide` element | Only one element can be selected at the same time |
| `list` | The component add the role `list` to self |  |
| `listitem` | The component add the role `listitem` to `mdlext-carousel__slide` items |  |


SASS variables.

| SASS variable |
|----------------|
| `$mdlext-carousel-slide-border-top-width` | 
| `$mdlext-carousel-slide-border-top-color` | 
| `$mdlext-carousel-slide-figcaption-color` | 
| `$mdlext-carousel-slide-ripple-color` |     

## How to use the component programmatically
The [tests](../../test/carousel/carousel.spec.js) and the [snippets/lightbox.html](./snippets/carousel.html) 
code provides examples on how to use the component programmatically.

## Reference
[WCAG Carousel Concepts](https://www.w3.org/WAI/tutorials/carousels/)
