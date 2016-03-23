# Lightboard

![Lightboard](../../etc/lightboard.png)

Thumbnails in a responsive, fluent grid.

## Introduction
A lightboard is a translucent surface illuminated from behind, used for 
situations where a shape laid upon the surface needs to be seen with high contrast. In the "old days" 
of photography photograpers used a lightboard to get a quick view of, sorting and organizing their slides.

The MDLEXT Lightbord lays out the slides in a row column fashion, with repect to the available screen size. Slides
are distributed across the available content width, and scales proportionally to fill available horizontal space.
A lightboard has `role='grid'` and the individual slides has `role='cell'` 

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

&nbsp;3. Code an `<a href="#">` element with `class="mdlext-lightboard__slide__frame"`  to hold the slide frame. Optionally add a href to a large version of the image shown in the slide. 
```html
<ul class="mdlext-accordion mdlext-js-accordion">
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
    </a>  
  <li>
<ul>
```

&nbsp;4. Code an `<figure>` element (decorates frame and center image in slide).  
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
Lightboard with eight slides, ripple effect on each slide, no spacing between slides, subscribes to lightboard `select` event.

```html
<ul id="lightboard-1" class="mdlext-lightboard mdlext-js-lightboard 
  mdlext-lightboard--no-spacing 
  mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events">
  
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D802141.jpg" title="Northern goshawk with prey"/>
        <figcaption>_D802141.jpg</figcaption>
      </figure>
    </a>
  </li>
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D802591.jpg" title="Whooper swans in flight"/>
        <figcaption>_D802591.jpg</figcaption>
      </figure>
    </a>
  </li>
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D804370-3.jpg" title="European green woodpecker"/>
        <figcaption>_D804370-3.jpg</figcaption>
      </figure>
    </a>
  </li>
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D808689.jpg" title="The bridge"/>
        <figcaption>_D808689.jpg</figcaption>
      </figure>
    </a>
  </li>
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D802181.jpg" title="Landscape in blue pastel"/>
        <figcaption>_D802181.jpg</figcaption>
      </figure>
    </a>
  </li>
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D800912.jpg" title="Hiking the mountains of Dovre"/>
        <figcaption>_D800912.jpg</figcaption>
      </figure>
    </a>
  </li>
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_D809453-_D809457-4.jpg" title="Train to nowhwere. Ny Aalesund, Spitsbergen." />
        <figcaption>_D809453-_D809457-4.jpg</figcaption>
      </figure>
    </a>
  </li>
  <li class="mdlext-lightboard__slide">
    <a href="#" class="mdlext-lightboard__slide__frame">
      <figure>
        <img src="_DSC8214.jpg" title="Blues"/>
        <figcaption>_DSC8214.jpg</figcaption>
      </figure>
    </a>
  </li>
</ul>
```

```javascript
<script>
  'use strict';
  var lightboard = document.querySelector('#lightboard-1');
  lightboard.addEventListener('select', function(e) {
    console.log('Slide selected. Source:', e.detail.source);
  });
</script>
```

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
|--------------|--------|---------|
| `mdlext-lightboard` | Defines a container as an MDLEXT lightboard component | Required on `<ul>` element |
| `mdlext-js-lightboard` | Assigns basic MDL behavior to lightboard | Required on `<ul>` element |
| `mdlext-lightboard--no-spacing` | Modifies the slides to have no margin between them. | Optional on `<ul>` element |
| `mdlext-lightboard__slide` | Defines a slide | Required on `<li>` element |
| `mdlext-lightboard__slide__frame` | Defines the slide frame, makes the frame focusable and selectable | Required on `<a>` element. First inner element of `<li>`  |
| `mdl-js-ripple-effect` | Applies ripple click effect to slides | Optional; goes on "outer" `<ul>` element |
| `mdl-js-ripple-effect--ignore-events` |  | Should be added when the component initializes, but that does not seem to happen. For now, add this class if `mdl-js-ripple-effect` class is applied |


A lightboard and its assosiated slides has the following roles.

| Attribute | Effect | Remarks |
|-----------|--------|---------|
| `role=grid` | Defines the lightboard as a WAI-ARIA grid | Added when component innitializes |
| `role=cell` | Defines the slide as a WAI-ARIA cell | Added when component innitializes |


You can modify the accordion trough the following SASS variables.

| SASS variables |
|----------------|
| `$mdlext-lightboard-small-breakpoint            ` | 
| `$mdlext-lightboard-medium-small-breakpoint     ` |
| `$mdlext-lightboard-medium-breakpoint           ` | 
| `$mdlext-lightboard-medium-large-breakpoint     ` | 
| `$mdlext-lightboard-large-breakpoint            ` | 
| `$mdlext-lightboard-small-gutter                ` | 
| `$mdlext-lightboard-small-margin                ` | 
| `$mdlext-lightboard-small-columns               ` | 
| `$mdlext-lightboard-small-frame-width           ` | 
| `$mdlext-lightboard-medium-small-gutter         ` | 
| `$mdlext-lightboard-medium-small-margin         ` | 
| `$mdlext-lightboard-medium-small-columns        ` | 
| `$mdlext-lightboard-medium-small-frame-width    ` | 
| `$mdlext-lightboard-medium-gutter               ` | 
| `$mdlext-lightboard-medium-margin               ` | 
| `$mdlext-lightboard-medium-columns              ` | 
| `$mdlext-lightboard-medium-frame-width          ` | 
| `$mdlext-lightboard-medium-large-gutter         ` | 
| `$mdlext-lightboard-medium-large-margin         ` | 
| `$mdlext-lightboard-medium-large-columns        ` | 
| `$mdlext-lightboard-medium-large-frame-width    ` | 
| `$mdlext-lightboard-large-gutter                ` | 
| `$mdlext-lightboard-large-margin                ` | 
| `$mdlext-lightboard-large-columns               ` | 
| `$mdlext-lightboard-large-frame-width           ` | 
| `$mdlext-lightboard-slide-max-size              ` | 
| `$mdlext-lightboard-slide-border-color          ` | 
| `$mdlext-lightboard-slide-background-color      ` | 
| `$mdlext-lightboard-slide-border-radius         ` | 
| `$mdlext-lightboard-slide-inner-border-radius   ` | 
| `$mdlext-lightboard-slide-box-shadow            ` | 
| `$mdlext-lightboard-slide-border-color-hover    ` | 
| `$mdlext-lightboard-slide-background-color-hover` | 
| `$mdlext-lightboard-slide-box-shadow-hover      ` | 
| `$mdlext-lightboard-figcaption-font-size        ` | 
| `$mdlext-lightboard-figcaption-font-size-large  ` | 


## How to use the component programmatically
The tests provides examples on how to use the component [programmatically](https://github.com/leifoolsen/mdl-ext/blob/master/test/lightboard/lightboard.spec.js).
