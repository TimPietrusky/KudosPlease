# Kudos Please

A simple Kudos widget with no dependencies. And it's free. 

## Live example

[Kudos Please @CodePen](http://codepen.io/TimPietrusky/pen/acBCf)

[![Kudos Please preview](https://raw.github.com/TimPietrusky/KudosPlease/master/img/kudosplease_1337.png)](http://codepen.io/TimPietrusky/pen/acBCf)

## How to use it on my page?

1. Add ```kudosplease-min.js``` to your page
2. Add CSS
  * Add ```kudosplease.css``` to your page if you don't want to change the CSS
  * Import ```kudoesplease.scss``` into your main SCSS and overwrite the variables or other stuff
3. Create a new instance

```javascript
  var kudosPlease = new Kudos({ 
    el : '.kudos',
    duration : 1500
  });
```

---

Handcrafted 2013 by [@TimPietrusky](http://twitter.com/TimPietrusky) in Germany.