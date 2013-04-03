# Kudos Please

A simple Kudos widget with no dependencies. And it's free. 

[![Kudos Please preview](https://raw.github.com/TimPietrusky/KudosPlease/master/img/kudosplease_1337.png)](http://codepen.io/TimPietrusky/pen/acBCf)

## Live example

[Kudos Please @CodePen](http://codepen.io/TimPietrusky/pen/acBCf)

## How to use it on my page?

1. Add ```https://raw.github.com/TimPietrusky/KudosPlease/master/js/kudosplease-min.js``` to your page
2. Choose between these two:
  * Add ```https://raw.github.com/TimPietrusky/KudosPlease/master/css/kudosplease.css``` to your page if you don't want to change the CSS
  * Import ```kudoesplease.scss``` into your main SCSS and overwrite the variables or other stuff
3. Create a new instance of ```KudosPlease```  

```javascript
  /*
   * Create Kudos Please widget
   */
  var kudosPlease = new KudosPlease({ 
    el : '.kudos',
    duration : 1500,
    status : {
      alpha : 'fontawesome-star',
      beta : 'fontawesome-glass',
      gamma : 'fontawesome-bolt'
    }
  });
```
### Properties
  
* **el** - the class of the kudos dom element
* **duration** - seconds until the kudos amount is increased
* **status** - adds a class to the widget depending on the status
    * alpha - amount of 0
    * beta - amount > 0
    * gamma - kudos given (finish)



---

Handcrafted 2013 by [@TimPietrusky](http://twitter.com/TimPietrusky) in Germany.