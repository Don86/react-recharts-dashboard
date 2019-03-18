# Simple Financial Portfolio

A project that saw a stupid number of iterations with different libraries: D3.js, React.js, charts.js, victory.js. I've eventually ended with the stack:

* ReactJS
* recharts
* axios
* lodash

Might use `Material UI` to make things pretty.

## Serving

* Not served yet, planning to put up on Github pages
* Git clone and serve locally with `npm start`

## Tech Notes

* React does not play well (out of the box) with any other library that manipuates the DOM, e.g. D3, JQuery. (First medium article when I searched "using JQuery with React": *'If you're using React right, you won't need JQuery.'*). A better SW-engineer could probably design D3+React components; this has already been somewhat been done with `d3-react`, but I couldn't quite get that to work.

* I want to remove the "submit" buttons.

* I wish I'd started with VueJS.
