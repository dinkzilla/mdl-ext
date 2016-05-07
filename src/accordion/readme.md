# Accordion
![Accordion](../../etc/flexbox-accordion.png)

A WAI-ARIA friendly accordion component.

## Introduction
An accordion component is a collection of expandable panels associated with a common outer container. Panels consist
of a header and an associated content region or panel. The primary use of an Accordion is to present multiple sections
of content on a single page without scrolling, where all of the sections are peers in the application or object hierarchy.
The general look is similar to a tree where each root tree node is an expandable accordion header. The user navigates
and makes the contents of each panel visible (or not) by interacting with the Accordion Header.

This component relates to the guidelines given in [WAI-ARIA Authoring Practices 1.1, Accordion](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion). 

### To include a MDLEXT **accordion** component:

&nbsp;1. Code a `<div>` element to hold dimensions of the accordion. If the accordion has horizontal layout (the default), then define a height for the container. 
```html
<div style="height: 300px; width: 100%;">
</div>
```

&nbsp;2. Code a `<ul>` element with `class="mdlext-accordion mdlext-js-accordion"`  to hold the accordion. 
```html
<div style="height: 300px; width: 100%;">
  <ul class="mdlext-accordion mdlext-js-accordion">
  <ul>
</div>
```

&nbsp;3. Code a `<li>` element with `class="mdlext-accordion__panel"`  to hold an individual accordion panel. 
```html
<div style="height: 300px; width: 100%;">
  <ul class="mdlext-accordion mdlext-js-accordion">
    <li class="mdlext-accordion__panel">
    <li>
  <ul>
</div>
```

&nbsp;4. Code a `<header>` element with `class="mdlext-accordion__panel__header"`  to hold the header. 
```html
<div style="height: 300px; width: 100%;">
  <ul class="mdlext-accordion mdlext-js-accordion">
    <li class="mdlext-accordion__panel">
      <header class="mdlext-accordion__panel__header">
      </header>
    <li>
  <ul>
</div>
```

&nbsp;5. Code a `<div>` element with `class="mdlext-accordion__panel__header__transform"`  so the header content can rotate 90 deg. when the accordion has horizontal layout. 
```html
<div style="height: 300px; width: 100%;">
  <ul class="mdlext-accordion mdlext-js-accordion">
    <li class="mdlext-accordion__panel">
      <header class="mdlext-accordion__panel__header">
        <div class="mdlext-accordion__panel__header__transform">
        </div>
      </header>
    <li>
  <ul>
</div>
```

&nbsp;6. Apply header content. 
```html
<div style="height: 300px; width: 100%;">
  <ul class="mdlext-accordion mdlext-js-accordion">
    <li class="mdlext-accordion__panel">
      <header class="mdlext-accordion__panel__header">
        <div class="mdlext-accordion__panel__header__transform">
          <h5>A header</h5>
        </div>
      </header>
    <li>
  <ul>
</div>
```

&nbsp;7. Optionally decorate header with an icon or image. 
```html
<div style="height: 300px; width: 100%;">
  <ul class="mdlext-accordion mdlext-js-accordion">
    <li class="mdlext-accordion__panel">
      <header class="mdlext-accordion__panel__header">
        <div class="mdlext-accordion__panel__header__transform">
          <i class="material-icons md-18">share</i>
          <h5>A header</h5>
        </div>
      </header>
    <li>
  <ul>
</div>
```

&nbsp;8. Optionally decorate header with a state icon. 
```html
<div style="height: 300px; width: 100%;">
  <ul class="mdlext-accordion mdlext-js-accordion">
    <li class="mdlext-accordion__panel">
      <header class="mdlext-accordion__panel__header">
        <div class="mdlext-accordion__panel__header__transform">
          <i class="material-icons md-18">share</i>
          <h5>A header</h5>
          <i class="mdlext-accordion__panel__state material-icons md-24"></i>
        </div>
      </header>
    <li>
  <ul>
</div>
```

&nbsp;9. Code a `<section>` element with `class="mdlext-accordion__panel__content"`  to hold the content. 
```html
<div style="height: 300px; width: 100%;">
  <ul class="mdlext-accordion mdlext-js-accordion">
    <li class="mdlext-accordion__panel">
      <header class="mdlext-accordion__panel__header">
        <div class="mdlext-accordion__panel__header__transform">
          <i class="material-icons md-18">share</i>
          <h5>A header</h5>
          <i class="mdlext-accordion__panel__state material-icons md-24"></i>
        </div>
      </header>
      <section class="mdlext-accordion__panel__content">
      </section>
    <li>
  <ul>
</div>
```

&nbsp;10. Repeat steps 3..9 for each panel required. 

### Example
Vertical accordion with three panels, with ripple effect on each panel header, decorated with icon left and state icon right. Subscribes to accordion toggle event.

```html
<style>
  /* Color the panels */
  .mdlext-accordion__panel-colored:nth-child(1) {
    background: rgba(144, 202, 249, 0.4);
  }
  .mdlext-accordion__panel-colored:nth-child(2) {
    background: rgba(165, 214, 167, 0.4);
  }
  .mdlext-accordion__panel-colored:nth-child(3) {
    background: rgba(255, 224, 130, 0.4);
  }

  /* Open/Close state is default +/-. We override this using Material Icons */
  .mdlext-accordion .mdlext-accordion__panel .mdlext-accordion__panel__state:after {
    content: 'expand_more';
  }
  .mdlext-accordion .mdlext-accordion__panel[open] .mdlext-accordion__panel__state:after {
    content: 'expand_less';
  }
</style>

<div style="height: 500px; width: 200px">
  <ul id="my-accordion" class="mdlext-accordion mdlext-accordion--vertical mdlext-js-accordion mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events" aria-multiselectable="false">
    <li class="mdlext-accordion__panel mdlext-accordion__panel-colored">
      <header class="mdlext-accordion__panel__header">
        <div class="mdlext-accordion__panel__header__transform">
          <i class="material-icons md-18">close</i>
          <h5>First section</h5>
          <i class="mdlext-accordion__panel__state material-icons md-24"></i>
        </div>
      </header>
      <section class="mdlext-accordion__panel__content">
        <p>Content first section ...</p>
      </section>
    </li>
    <li class="mdlext-accordion__panel mdlext-accordion__panel-colored" open>
      <header class="mdlext-accordion__panel__header">
        <div class="mdlext-accordion__panel__header__transform">
          <i class="material-icons md-18">check</i>
          <h5>Second</h5>
          <i class="mdlext-accordion__panel__state material-icons md-24"></i>
        </div>
      </header>
      <section class="mdlext-accordion__panel__content">
        <p>Content second section</p>
      </section>
    </li>
    <li class="mdlext-accordion__panel mdlext-accordion__panel-colored">
      <header class="mdlext-accordion__panel__header">
        <div class="mdlext-accordion__panel__header__transform">
          <i class="material-icons md-18">share</i>
          <h5>Section #3</h5>
          <i class="mdlext-accordion__panel__state material-icons md-24"></i>
        </div>
      </header>
      <section class="mdlext-accordion__panel__content">
        <p>Content section #3</p>
      </section>
    </li>
  </ul>
</div>

<script>
  'use strict';
  window.addEventListener('load', function() {
    var accordion = document.querySelector('#my-accordion');
    accordion.addEventListener('toggle', function(e) {
      console.log('Accordion toggled. State:', e.detail.state, 'Source:', e.detail.source);
    });
  });
</script>

```

More examles can be found in [here](./snippets/accordion.html)


## Keyboard interaction
The accordion interacts with the following keyboard keys.

*   `Tab` - When focus is on an accordion header, pressing the `Tab` key moves focus in the following manner:
    1.  If interactive glyphs or menus are present in the accordion header, focus moves to each in order. (Not implemented yet)
    2.  When the corresponding panel is expanded (its [aria-expanded](http://www.w3.org/TR/wai-aria-1.1/#aria-expanded) state is 'true'), then focus moves to the first focusable element in the panel.
    3.  If the panel is collapsed (its aria-expanded state is 'false' or missing), OR, when the last interactive element of a panel is reached, the next `Tab` key press moves focus as follows:
        *   If a subsequent accordion panel is already expanded, focus moves to the first focusable element in this subsequent panel.
        *   If no subsequent accordion panel is expanded, focus moves to the first focusable element outside the accordion component.
*   `Left arrow`
    *   When focus is on the accordion header, a press of up/left arrow keys moves focus to the previous logical accordion header.
    *   When focus reaches the first header, further up/left arrow key presses optionally wrap to the first header.
*   `Right arrow`
    *   When focus is on the accordion header, a press of down/right moves focus to the next logical accordion header.
    *   When focus reaches the last header, further down/right arrow key presses optionally wrap to the first header
*   `Up arrow` - behaves the same as left arrow
*   `Down arrow` - behaves the same as right arrow
*   `End` - When focus is on the accordion header, an `End` key press moves focus to the last accordion header.
*   `Home` - When focus is on the accordion header, a `Home` key press moves focus to the first accordion header.
*   `Enter/Space` - When focus is on an accordion header, pressing `Enter`/`Space` toggles the expansion of the corresponding panel.
    *   If collapsed, the panel is expanded, and its aria-expanded state is set to 'true'.
    *   If expanded, the panel is collapsed and its aria-expanded state is set to 'false'.
*   `Shift+Tab` - Generally the reverse of `Tab`.


## Events
The accordion emits a custom **toggle** event when a panel opens or closes via mouse click or keyboard interaction. 
The event has a detail object with the following content:
```
detail: {
  state,  // "open" or "close"
  source  // the panel element instance that caused the event 
}
```

Set up an event listener to receive the toggle event.
```javascript
document.querySelector('#my-accordion').addEventListener('toggle', function(e) {
  console.log('Accordion toggled. State:', e.detail.state, 'Source:', e.detail.source);
});
```

A client can send a `command` custom event to open or close panel(s) in an accordion. The triggered event should send a `detail`
object holding the action to execute and the target panel of the action.

```
detail: { 
  action, // "open", "close" or "toggle" 
  target  // Target of action, "undefined" if all panels should be targeted.
          // Note: If you send a null target, the action is cancelled
}
```

Example. Expand all panels:
```javascript
var ce = new CustomEvent( 'command', { 
  detail: { 
    action: 'open' 
  } 
});
document.querySelector('#my-accordion').dispatchEvent(ce);
```

**Note**: Open all panels and Close all panels only makes sense if the accordion has aria attribute 
`aria-multiselectable="true`, and will be cancelled otherwise. 


Example. Toggle a spesific panel:
```javascript
var panel3 = document.querySelector('#my-accordion .mdlext-accordion__panel:nth-child(3)');
var ce = new CustomEvent('command', { 
  detail: { 
    action: 'toggle', 
    target: panel3 
  } 
});
document.querySelector('#multiselectable-accordion').dispatchEvent(ce);
```

## Configuration options

The MDLEXT CSS classes apply various predefined visual and behavioral enhancements to the accordion. 
The table below lists the available classes and their effects.

| MDLEXT class | Effect | Remarks |
|-----------|--------|---------|
| `mdlext-accordion` | Defines container as an MDL component | Required on "outer" `<div>` or `<ul>` element |
| `mdlext-js-accordion` | Assigns basic MDL behavior to accordion | Required on "outer" `<div>` or `<ul>` element |
| `mdlext-accordion--vertical` | Vertical layot of an accordion | Optional; Without this class an accordion has horizontal layout |
| `mdlext-accordion__panel` | Defines a container for each section of the accordion | Required on first inner `<div>` element or `<li>` element  |
| `mdlext-accordion__panel__header` | Defines a header for a section | Required on `<header>` element |
| `mdlext-accordion__panel__header__transform` | Rotates content 90 deg if accordion has horizontal layout  | Required |
| `mdlext-accordion__panel__header__state` | A state indicator, typical an icon, showing open/closed state | Optional; goes inside the header |
| `material-icons` | Decorate header with an icon | Optional; goes inside the header using an `<i>` element  |
| `mdlext-accordion__panel__content` | The content | Required on `<section`> element |
| `mdl-js-ripple-effect` | Applies ripple click effect to accordion header | Optional; goes on "outer" `<ul>` or `<div>` element |
| `mdl-js-ripple-effect--ignore-events` |  | Should be added by the component, but that does not seem to happen. For now, add this class if `mdl-js-ripple-effect` class is applied |


The table below lists available attributes and their effects.

| Attribute | Effect | Remarks |
|-----------|--------|---------|
| `aria-multiselectable` | If true, multiple panels may be open simultaneously | Add this attribute to the `mdlext-accordion` element to keep multiple panels open at the same time. **Note**: Only implemented for vertical accordion (a multiselectable horizontal accordion does not make sense) |
| `role=tablist` | The accordion component must have a role of tablist | Added by component to `mdlext-accordion` element |
| `open` | Indicates an open panel | The panel content is visible. If this attribue is removed only the panel header i visible |
| `disabled` | Indicates a disabled panel | The panel will not open or close |
| `role=tabpanel` | The accordion panel has the role tabpanel | Added by component to `mdlext-accordion__panel` element |
| `role=tab` | Each header tab in the tablist has a role of tab | Added by component to `mdlext-accordion__panel__header` element |
| `aria-expanded` | An accordion should manage the expanded/collapsed state of each tab by maintain its aria-expanded state | Added by component to `mdlext-accordion__panel_header` element |
| `aria-selected` | An accordion should manage the selected state of each tab by maintaining its aria-selected state | Added by component to `mdlext-accordion__panel_header` element. |
| `aria-hidden` | An accordion should convey the visibility of each tabpanel by maintaining its aria-hidden state | Added by component to `mdlext-accordion__panel_header` element. Note: Can't see any practical use for this attribute, but implemented as a state on the header tab. |
 

## How to use the component programmatically
The tests provides examples on how to use the component [programmatically](https://github.com/leifoolsen/mdl-ext/blob/master/test/accordion/accordion.spec.js)

### Credits 
The Accordion component is based on this [CodePen](http://codepen.io/aann/pen/dPqBML)
