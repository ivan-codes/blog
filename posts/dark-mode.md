---
title: Tips & Tricks for implementing Dark Mode
description: This website is the first time I ever added dark mode. It is a simple concept, but getting it to work smoothly and in a non-hacky way is actually quite challenging. So here are some tips and tricks I learned to save you the time and headaches.
createdAt: 09-25-2021
---

This website is the first time I ever added dark mode.

### Triple heading

It is a simple concept, but getting it to work smoothly and in a non-hacky way is actually quite challenging. So here are some tips and tricks I learned to save you the time and headaches.

## Tailwind

I used tailwind to style this site, and it comes with a very handy feature for implementing dark mode. Go to your `tailwind.config.js` file and add the property `darkMode: "media"`. Now, you can alter elements' colors using the `dark` variant like so:

```html
<div className="bg-white text-black dark:bg-black dark:text-white"></div>
```

The dark variant properties will be used if the user's color scheme preference is set to dark mode, otherwise the default light properties will be used.

## Media Query

If you are using plain CSS, you can do the same with the following media queries:

```css
/* Light Mode */
@media (prefers-color-scheme: light) {
  body {
    background-color: white;
    color: black;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: white;
  }
}
```

## @import

So far so good, but what if you have two separate CSS files: one for light mode and one for dark mode? This was the case for me since I had separate files for styling the code snippets. In this case, you can use conditional imports like so:

```css
@import "light.css" screen;
@import "dark.css" screen and (prefers-color-scheme: dark);
```

Now, the dark mode css file will only be imported if the user's color scheme preference is set to dark.

## Conclusion

And that's all! Hope you learned something new, and make sure to check back for more web development content.
