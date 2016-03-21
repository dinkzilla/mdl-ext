# Lightboard

![Lightboard](../../etc/lightboard.png)

Thumbnails in a responsive grid.

## Introduction
A lightboard is a translucent surface illuminated from behind, used for 
situations where a shape laid upon the surface needs to be seen with high contrast. In the "old days" 
of photography photograpers used a lightboard to get a quick view of, sorting and organizing their slides. 

### To include a MDLEXT **lightboard** component:

### Example

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
*   `Enter/Space` - When focus is on slide, pressing `Enter`/`Space` selects that particular slide. The lightboard emits an **open** event.
*   `Shift+Tab` - Generally the reverse of `Tab`.

## Events
The lightboard emits a custom **open** event when a panel is clicked. The event has a detail object with the following content:
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
| `aria-multiselectable` | Multiple sides may be selected simultaneously | This feature is not yet implemented |


You can modify the accordion trough the following SASS variables.

| SASS variable |Description | Remarks | 
|-----------|--------|---------|
| `$mdlext-lightboard-wide-desktop-breakpoint` | | | 


## How to use the component programmatically
The tests provides examples on how to use the component programmatically.
