# Bordered fields
![Bordered fields](../../etc/bordered-fields-theme.png)

Demonstrates how you can create your own theme of MDL text fields.

## Introduction
The Material Design Lite Ext (MDLEXT) bordered fields component is a method for decorating contained
MDL textfields and MDLEXT selectfields without affecting the original design. You can apply the `mdlext-bordered-fields` class
to any HTML block element and use that as a container for the bordered fields.

### To include a MDLEXT bordered **fields** component:
&nbsp;1. Code a block element, as the "outer" container, intended to hold all of the bordered fields.
```html
<div>
</div>
```

&nbsp;2. Add the `mdlext-bordered-fields` MDLEXT class to the block element using the `class` attribute.
```html
<div class="mdlext-bordered-fields">
</div>
```

&nbsp;3. Add the MDL and MDLEXT fields you want to decorate.
```html
<div class="mdlext-bordered-fields">
  <div class="mdl-textfield mdl-js-textfield">
    <input class="mdl-textfield__input" type="text" id="sample1">
    <label class="mdl-textfield__label" for="sample1">Text ...</label>
  </div>

  <div class="mdlext-selectfield mdlext-js-selectfield">
    <select class="mdlext-selectfield__select" id="nordic-countries" name="nordic-countries">
      <option value=""></option>
      <option value="option1">Norway</option>
      <option value="option2">Sweden</option>
      <option value="option3">Suomi</option>
      <option value="option4">Denmark</option>
      <option value="option5">Iceland</option>
    </select>
    <label class="mdlext-selectfield__label" for="nordic-countries">Where do you want to go</label>
  </div>
  .....
</div>
```

&nbsp;4. Optionally embed icons and/or buttons inside a bordered field by adding the CSS classes 
`mdlext-bordered-fields__icon-left` and `mdlext-bordered-fields__icon-right` respectively.
```html
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdlext-bordered-fields__icon-left mdlext-bordered-fields__icon-right">
    <i class="material-icons">radio</i>
    <input class="mdl-textfield__input" type="text" id="icon-button1">
    <label class="mdl-textfield__label">Text...</label>
    <label class="mdl-button mdl-js-button mdl-button--icon" for="icon-button1">
      <i class="material-icons">settings_voice</i>
    </label>
  </div>
  
  <div class="mdlext-selectfield mdlext-js-selectfield mdlext-bordered-fields__icon-left">
    <i class="material-icons">radio</i>
    <select class="mdlext-selectfield__select" id="nordic-countries" name="nordic-countries">
      <option value=""></option>
      <option value="option1">Norway</option>
      <option value="option2">Sweden</option>
      <option value="option3">Suomi</option>
      <option value="option4">Denmark</option>
      <option value="option5">Iceland</option>
    </select>
    <label class="mdlext-selectfield__label" for="nordic-countries">Where do you want to go</label>
  </div>
```

>**Note:** The `mdlext-selectfield` component can only embed an icon at the left hand side.

#### Examples
See the [example code](./snippets/selectfield.html).

## Configuration options

The MDLEXT CSS classes apply various predefined visual and behavioral enhancements to text fields and select fields. 
The table below lists the available classes and their effects.

| MDLEXT class | Effect | Remarks |
|-----------|--------|---------|
| `mdlext-bordered-fields` | Defines container as an MDL bordered fields component | Required on an "outer" block element|
| `mdlext-bordered-fields__icon-left` | Apply class on `mdl-textfield` container if you want to embedd a left aligned icon or a button inside the bordered field |  |
| `mdlext-bordered-fields__icon-right` | Apply class on `mdl-textfield` container if you want to embedd a right aligned icon or a button inside the bordered field  |  |


The bordered fields can be modified with the following SASS variables.

| SASS variable |Description | Remarks | 
|-----------|--------|---------|
| `$mdlext-bordered-field-border-width` | Defines the border width | | 
| `$mdlext-bordered-field-border-radius` | Defines the border radius of the bordered field | | 
| `$mdlext-bordered-field-background-color` | Defines the background color of the bordered field | | 
| `$mdlext-bordered-field-height` | Defines the height of the bordered field | | 
| `$mdlext-bordered-field-padding` | Defines the padding of the bordered field | | 
| `$mdlext-bordered-field-padding-top` | Defines the top padding of the bordered field | | 
| `$mdlext-bordered-field-padding-bottom` | Defines the bottom padding of the bordered field | | 
| `$mdlext-bordered-field-focus-border-color` | Defines the border color when the field has focus | | 
| `$mdlext-bordered-field-focus-background-color` | Defines the background color when the field has focus | | 
| `$mdlext-bordered-field-disabled-border-color` | Defines the border color when the field is disabled | | 
| `$mdlext-bordered-field-disabled-background-color` | Defines the background color when the field is disabled | | 
| `$mdlext-bordered-field-required-border-color` | Defines the border color when the field is required | | 
| `$mdlext-bordered-field-required-background-color` | Defines the background color when the field is disabled | | 
| `$mdlext-bordered-field-label-top` | Defines the top position of the bordered field's label | | 
| `$mdlext-bordered-field-label-focused-top` | Defines the top position of a floating label when the field has focus| | 


### Credits 
The Bordered Fields component is based on this [CodePen](http://codepen.io/prajwal078/pen/LVJZXz)
