# Lightboard

![Lightboard](../../etc/lightboard.png)

Thumbnails in a responsive, fluent grid.

## Introduction
A lightboard is a translucent surface illuminated from behind, used for 
situations where a shape laid upon the surface needs to be seen with high contrast. In the "old days" 
of photography photograpers used a lightboard to get a quick view of, sorting and organizing their slides.

The MDLEXT Lightbord lays out the slides in a row column fashion, with repect to the available screen size. Slides
are distributed across the available content width, and scales proportionally to fill available horizontal space.
Lightboard has `role='grid'` and the individual slides has `role='cell'` 

### To include a MDLEXT **lightboard** component:
&nbsp;1. Code a `<ul>` element with `class="mdlext-lightboard mdlext-js-lightboard"` to hold the lightboard slides. 
```html
<ul class="mdlext-accordion mdlext-js-accordion">
<ul>
```

&nbsp;2. Code a `<li>` element with `class="mdlext-lightboard__slide"`  to hold an individual slide. 
```html
<ul class="mdlext-accordion mdlext-js-accordion">
  <li class="mdlext-lightboard__slide">
  <li>
<ul>
```

&nbsp;3. Code an `<a href="#">` element with `class="mdlext-lightboard__slide__frame"`  to hold the slide frame and a href to a large version of the image shown in the slide. 
```html
<ul class="mdlext-accordion mdlext-js-accordion">
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
    </a>  
  <li>
<ul>
```

&nbsp;4. Code an `<figure>` element (required to position center image in slide).  
```html
<ul class="mdlext-accordion mdlext-js-accordion">
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
      </figure
    </a>  
  <li>
<ul>
```

&nbsp;5. Inside the `<figure>` element add an `<img>` element with reference to the thumbnail image to be shown in slide. Optionally add a `<figcaption>` element to hold the title.    
```html
<ul class="mdlext-accordion mdlext-js-accordion">
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D802591.jpg" title="Whooper swans in flight"/>
        <figcaption>_D802591.jpg</figcaption>
      </figure
    </a>  
  <li>
<ul>
```

&nbsp;6. Repeat steps 2..5 for each slide required. 

### Example
Lightboard with six slides, with ripple effect on each slide, no spacing between slides. Subscribes to lightboard `select` event.


## Keyboard interaction
The lightboard interacts with the following keyboard keys.

*   `Tab` - When focus is on a slide, pressing the `Tab` key moves focus in the following manner:
    1.  If interactive glyphs or menus are present in the slide frame, focus moves to each in order. (Not implemented yet)
    2.  The next `Tab` key press moves focus as follows:
        *   If there is a next slide, focus moves to the next slide.
        *   If focus is on the last slide, focus moves to the first focusable element outside the lightboard component.
*   `Left arrow`
    *   Moves focus to the previous slide. If the current slide is the first slide, focus moves to the last slide.
*   `Right arrow`
    *   Moves focus to the next slide. If the current slide is the last slide, focus moves to the first slide.
*   `Up arrow` - behaves the same as left arrow.
*   `Down arrow` - behaves the same as right arrow.
*   `End` - When focus is on a slide, an `End` key press moves focus to the last slide.
*   `Home` - When focus is on a slide, a `Home` key press moves focus to the first slide.
*   `Enter/Space` - When focus is on slide, pressing `Enter`/`Space` selects that particular slide. The lightboard emits a **select** event.
*   `Shift+Tab` - Generally the reverse of `Tab`.

## Events
The lightboard emits a custom **select** event when a slide is clicked. The event has a detail object with the following content:
```
{
  source  // the slide instance that caused the event 
}
```

## Configuration options

The MDLEXT CSS classes apply various predefined visual and behavioral enhancements to the lightboard. 
The table below lists the available classes and their effects.

| MDLEXT class | Effect | Remarks |
|-----------|--------|---------|
| `mdlext-lightboard` | Defines container as an MDL component | Required on "outer" `<div>` or `<ul>` element |


| Attribute | Effect | Remarks |
|-----------|--------|---------|
| `role=grid` |  |  |
| `role=cell` |  |  |


You can modify the accordion trough the following SASS variables.

| SASS variable |Description | Remarks | 
|-----------|--------|---------|
| `$mdlext-lightboard-wide-desktop-breakpoint` | | | 


## How to use the component programmatically
The tests provides examples on how to use the component programmatically.
