# PostCSS Font Awesome [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.svg">

[PostCSS] plugin to pull in a Font Awesome's icon unicode using `content`.

[PostCSS]: https://github.com/marketing-relevance/postcss-font-awesome
[ci-img]:  https://github.com/marketing-relevance/postcss-font-awesome/workflows/Build/badge.svg
[ci]:      https://github.com/marketing-relevance/postcss-font-awesome/actions

#### Before
```css
.foo::before {
  font-awesome: camera;
}
```

#### After
```css
.foo::before {
  content: '\f030';
}
```

The `font-family` and `font-weight` attributes will need to be supplied manually in your CSS, as the plugin will not provide those values.
This ensures the plugin can be as flexible as possible, and is better handled using something like CSS custom variables just in case Font Awesome changes these values in the future.

### Example
```css
:root {
    --fa-light: 300;
    --fa-brand: 400;
    --fa-regular: 400;
    --fa-solid: 900;
    --fa-duotone: 900;

    --fa-font-family: 'Font Awesome 5 Free';
    --fa-font-family-brands: 'Font Awesome 5 Brands';
    --fa-font-family-duotone: 'Font Awesome 5 Duotone';
}

.icon::before {
    font-family: var(--fa-font-family);
    font-weight: var(--fa-solid);
    font-awesome: camera;
}
```

## Options

### Font Awesome Pro
By default the plugin will use the free version of Font Awesome. If you are using the pro version of Font Awesome, simply set the option:
```js
require('@marketing-relevance/postcss-font-awesome')({
    fontAwesomePro: true, // defaults to false
})
```

## Usage

```js
postcss([ require('@marketing-relevance/postcss-font-awesome')({
    fontAwesomePro: false, // defaults to false
}) ])
```

See [PostCSS] docs for examples for your environment.
