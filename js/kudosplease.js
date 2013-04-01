 /**
  Kudos Please

  A simple kudos widget without any external lib and it works
  with touch & mouse devices. 
  
  Inspired by dcurt.is

  # 2013 by Tim Pietrusky
  # timpietrusky.com
**/

Kudos = (function() {
  
  var _$;
  
  // Constructor
  function Kudos(args) {
    _$ = this;
    
    this.elements = document.querySelectorAll(args.el);
    this.duration = args.duration;
    this.timer = {};
    
    for (var i = 0; i < this.elements.length; i++) {
      var el = this.elements[i];
      
      // Delete all elements from localStorage
      localStorage.setItem('kudos:saved:'+i, 0);
      
      // Identify element
      el.setAttribute('data-id', i);
      
      // Load kudos via ajax
      _$.request(el, 'GET');
      
      // Amount is 0
      if (this.loadAmount(i) == 0) {
        // Set kudos amount
        el.setAttribute('data-amount', 0);
      
        // Init timer id
        this.timer[i] = -1;
       
        // Events
        if (this.isTouch()) {
          this.on(el, 'touchstart', this.enter);
          this.on(el, 'touchend', this.out);
        } else {
          this.on(el, 'mouseover', this.enter);
          this.on(el, 'mouseout', this.out);
        }
        
      // Load the amount and display it, because user already voted
      } else {
        this.finish(el);
      }
    }
  };
  
  // Enter the element
  Kudos.prototype.enter = function(e) {
     var that = this,
         id = -1;
    
    // Do the kudo twist
    if (!_$.hasClass(this, 'finish')) {
      // Activate the kudo twist
      _$.addClass(that, 'active');
    
      // Start timeout
      id = setTimeout(function() {
        _$.removeClass(that, 'active');
        _$.finish(that, true);
      }, _$.duration);
    
      // Add timeout id to global object
      _$.timer[that.getAttribute('data-id')] = id;
    }
  };
  
  // Leave the element
  Kudos.prototype.out = function(e) {
    if (!_$.hasClass(this, 'finish')) {
      _$.removeClass(this, 'active');
      clearTimeout(_$.timer[this.getAttribute('data-id')]);
    }
  };
  
  Kudos.prototype.finish = function(el, increase) {
    _$.addClass(el, 'finish');
    
    increase = increase || false;
    amount = _$.loadAmount(parseInt(el.getAttribute('data-id'), 10));
    
    if (increase) {
      ++amount;
      
      // Update kudos via ajax
      _$.request(el, 'POST');
    }
    
    el.setAttribute('data-amount', amount);
    _$.save(el.getAttribute('data-id'), amount);
  };
  
  
  /**
   * Helper functions 
   */
  
  // Bind event
  Kudos.prototype.on = function(el, event, func) {
    try {
      el.addEventListener(event, func, false);
    } catch(e) {
      el.attachEvent('on' + event, func);
    }
  };
  
  // Add <CODE>class</CODE> to <CODE>el</CODE>
  Kudos.prototype.addClass = function(el, classes) {
    classes = classes.split(',');
    
    for (var i=0; i < classes.length; i++) {
      if (el.className.indexOf(classes[i]) == -1) {
        el.className = el.className.trim() + ' ' + classes[i];
      }
    }
  };
  
  // Remove <CODE>class</CODE> to <CODE>el</CODE>
  Kudos.prototype.removeClass = function(el, classes) {
    classes = classes.split(',');
    
    for (var i = 0; i < classes.length; i++) {
      el.className = el.className.replace(classes[i], '').trim();
    }
  };
  
  /* 
   * Returns <CODE>true</CODE> if <CODE>el</CODE> has 
   * the <CODE>class</CODE>, <CODE>false</CODE> otherwise
   */
  Kudos.prototype.hasClass = function(el, className) {
    var classes = el.className.split(' '),
        result = false;
    
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] == className) {
        result = true;
      }
    }
    
    return result;
  };
  
  /* 
   * Returns <CODE>true</CODE> if the actual
   * device is a touch device, <CODE>false</CODE> otherwise
   * 
   * http://stackoverflow.com/a/4819886/1012875
   */
  Kudos.prototype.isTouch = function() {
    return !!('ontouchstart' in window)
        || !!('onmsgesturechange' in window); 
  };
  
  Kudos.prototype.save = function(id, amount) {
    /*if (localStorage != undefined) {
      localStorage.setItem('kudos:saved:'+id, amount);
    }*/
  };
  
  Kudos.prototype.loadAmount = function(id) {
    var result = _$.elements[id].getAttribute('data-amount') || 0;
    
    /*if (localStorage != undefined) {
      if ((amount = localStorage.getItem('kudos:saved:'+id)) != null) {
        result = amount;
      }
    }*/
    
    return result;
  };
  
  /*
   * Create a ajax request to a backend
   * which just keeps track of the kudos counter
   * via php & mysql
   */
  Kudos.prototype.request = function(el, type) {
    // Initialize
    try {
     xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } catch(e) {
     xhr = new XMLHttpRequest(); 
    }
    
    // 
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        el.setAttribute('data-amount', xhr.responseText);
      }
    }
    
    // Open request
    xhr.open(type, "http://timpietrusky.koding.com/codepen/kudos/index.php", true);
    xhr.send();
  };
  
  // trim polyfill
  ''.trim || (String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
  });
  
  return Kudos;
})();

/*
 * DOM ready function 
 * http://dustindiaz.com/smallest-domready-ever
 */
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}

r(function() {
  /*
   * Create "Kudos Please" widget
   */
  var kudosPlease = new Kudos({ 
    el : '.kudos',
    duration : 1500
  });
});