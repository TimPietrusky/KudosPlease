 /**
  Kudos Please

  A simple kudos widget without any external lib and it works
  with touch & mouse devices. 
  
  Inspired by dcurt.is
  
  The heart in this example is served by weloveiconfonts.com,
  but you can just add a value manually (.finish:before{content:''}).

  # 2013 by Tim Pietrusky
  # timpietrusky.com
**/

KudosPlease = (function() {
  
  var _$;
  
  // Constructor
  function KudosPlease(args) {
    _$ = this;
    
    if (args.status != undefined) {
      this.status = args.status;
    }
    
    this.elements = document.querySelectorAll(args.el);
    this.duration = args.duration;
    this.timer = {};
    this.currentStatus = '';
    
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
  KudosPlease.prototype.enter = function(e) {
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
  KudosPlease.prototype.out = function(e) {
    if (!_$.hasClass(this, 'finish')) {
      _$.removeClass(this, 'active');
      clearTimeout(_$.timer[this.getAttribute('data-id')]);
    }
  };
  
  KudosPlease.prototype.finish = function(el, increase) {
    // Finished
    _$.addClass(el, 'finish');
    _$.changeStatus(el, 'gamma');
    
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
  
  /*
   * Change the status of the widget and
   * aply 3 different classes for the icon
   * in the middle. 
   */
  KudosPlease.prototype.changeStatus = function(el, state) {   
    if (_$.status != undefined) {
      _$.removeClass(el, _$.currentStatus);
      _$.addClass(el, _$.status[state]);
    }
  };
  
  /**
   * Helper functions 
   */
  
  // Bind event
  KudosPlease.prototype.on = function(el, event, func) {
    try {
      el.addEventListener(event, func, false);
    } catch(e) {
      el.attachEvent('on' + event, func);
    }
  };
  
  // Add <CODE>class</CODE> to <CODE>el</CODE>
  KudosPlease.prototype.addClass = function(el, classes) {
    classes = classes.split(',');
    
    for (var i=0; i < classes.length; i++) {
      if (el.className.indexOf(classes[i]) == -1) {
        el.className = el.className.trim() + ' ' + classes[i];
      }
    }
  };
  
  // Remove <CODE>class</CODE> to <CODE>el</CODE>
  KudosPlease.prototype.removeClass = function(el, classes) {
    classes = classes.split(',');
    
    for (var i = 0; i < classes.length; i++) {
      el.className = el.className.replace(classes[i], '').trim();
    }
  };
  
  /* 
   * Returns <CODE>true</CODE> if <CODE>el</CODE> has 
   * the <CODE>class</CODE>, <CODE>false</CODE> otherwise
   */
  KudosPlease.prototype.hasClass = function(el, className) {
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
  KudosPlease.prototype.isTouch = function() {
    return !!('ontouchstart' in window)
        || !!('onmsgesturechange' in window); 
  };
  
  KudosPlease.prototype.save = function(id, amount) {
    /*if (localStorage != undefined) {
      localStorage.setItem('kudos:saved:'+id, amount);
    }*/
  };
  
  KudosPlease.prototype.loadAmount = function(id) {
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
  KudosPlease.prototype.request = function(el, type) {
    var xhr;
    
    // Initialize
    try {
     xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } catch(e) {
     xhr = new XMLHttpRequest(); 
    }
    
    // Change the amount
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var amount = xhr.responseText;
        el.setAttribute('data-amount', amount);
        _$.changeStatus(el, amount == 0 ? 'alpha' : 'beta');
      }
    }
    
    var url = "?url="+encodeURIComponent(el.getAttribute('data-url'));
    // Open request
    xhr.open(type, "http://timpietrusky.koding.com/codepen/kudos/index.php" + url, true);
    xhr.send();
  };
  
  // trim polyfill
  ''.trim || (String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
  });
  
  return KudosPlease;
})();