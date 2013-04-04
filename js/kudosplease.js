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

KudosPlease = function() {
  
  // Constructor
  function KudosPlease(args) {
    _$ = this;
    // All widgets
    this.elements = document.querySelectorAll(args.el);
    // Set the status
    this.status = args.status;
    // Is localStorage enabled?
    this.persistent = (args.persistent != undefined && args.persistent && localStorage != undefined);
    // Duration of activation
    this.duration = args.duration;
    // setTimeout-ID's
    this.timer = {};

    for (var i = 0; i < this.elements.length; i++) {
      var el = this.elements[i];
      
      // Delete all elements from localStorage
      // localStorage.setItem('kudos:saved:'+el.getAttribute('data-url'), 0);
      
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

    return this;
  };

  /*
   * Enter the element
   */
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
  
  /*
   * State: finished (kudos given)
   */
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
  };
  
  /*
   * Change the status of the widget and
   * aply 3 different classes for the icon
   * in the middle. 
   */
  KudosPlease.prototype.changeStatus = function(el, state) {   
    if (_$.status != undefined) {

      if (el.getAttribute('data-status') != undefined) {
        _$.removeClass(el, _$.status[el.getAttribute('data-status')]);
      }

      _$.addClass(el, _$.status[state]);
      el.setAttribute('data-status', state);
    }
  };
  
  /**
   * Helper functions 
   */
  
  /*
   * Bind event
   */
  KudosPlease.prototype.on = function(el, event, func) {
    try {
      el.addEventListener(event, func, false);
    } catch(e) {
      el.attachEvent('on' + event, func);
    }
  };
  
  /*
   * Add <CODE>class</CODE> to <CODE>el</CODE>
   */
  KudosPlease.prototype.addClass = function(el, classes) {
    classes = classes.split(',');
    
    for (var i=0; i < classes.length; i++) {
      if (el.className.indexOf(classes[i]) == -1) {
        el.className = el.className.trim() + ' ' + classes[i];
      }
    }
  };
  
  /*
   * Remove <CODE>class</CODE> to <CODE>el</CODE>
   */
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
  
  /*
   * Saves the amount of a specific widget into localStorage
   * when <CODE>persistent</CODE> is <CODE>true</CODE>. 
   */
  KudosPlease.prototype.save = function(el, amount) {
    if (_$.persistent) {
      localStorage.setItem('kudos:saved:' + el.getAttribute('data-url'), amount);
    }
  };
  
  /*
   * Loads the amount of a specific widget from the localStorage
   * when <CODE>persistent</CODE> is <CODE>true</CODE>. 
   */
  KudosPlease.prototype.loadAmount = function(id) {
    var result = _$.elements[id].getAttribute('data-amount') || 0;

    if (_$.persistent) {
      if ((amount = localStorage.getItem('kudos:saved:' + _$.elements[id].getAttribute('data-url'))) != undefined) {
        result = amount;
      }
    }
    
    return result;
  };
  
  /*
   * Create a ajax request to a backend
   * which just keeps track of the kudos counter
   * via php & mysql
   */
  KudosPlease.prototype.request = function(el, type) {
    var xhr,
        kudos = _$;

    // Initialize
    try {
     xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } catch(e) {
     xhr = new XMLHttpRequest(); 
    }

    // Response received
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var amount = xhr.responseText;
        el.setAttribute('data-amount', amount);

        if (type == 'GET') {
          // Set status based on amount
          kudos.changeStatus(el, amount == 0 ? 'alpha' : 'beta');

          // When persistence is activated and a value was saved for the URL,
          // the kudos widget is in status gamma (finished)
          if (kudos.persistent 
           && localStorage.getItem('kudos:saved:' + el.getAttribute('data-url')) != null) {
            kudos.changeStatus(el, 'gamma');
          }
        }

        if (type == 'POST') {
          kudos.save(el, amount);
        }
      }
    }

    var url = "?url="+encodeURIComponent(el.getAttribute('data-url'));
    // Open request
    xhr.open(type, "http://api.kudosplease.com/" + url, true);
    xhr.send();
  };
  
  // trim polyfill
  ''.trim || (String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
  });

  return KudosPlease;
}();