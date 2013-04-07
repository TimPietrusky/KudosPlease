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

  // Detect support for classList and create a inject function to inject a polyfill if needed.
  // It's faster: http://jsperf.com/use-class-list-with-polyfill
  var classList = document.documentElement.classList,
      support = !!classList,
      inject = function(fname, polyFunc) {
        return support ? function(e, param) {if (param != '') {return e.classList[fname](param);}} : polyFunc;
      },

   /*
    * Add <CODE>class</CODE> to <CODE>el</CODE>
    */
   addClass = inject('add', function(el, classes) {
     classes = classes.split(',');

     for (var i=0; i < classes.length; i++) {
       if (el.className.indexOf(classes[i]) == -1) {
         el.className = el.className.trim() + ' ' + classes[i];
       }
     }
   }),

   /*
    * Remove <CODE>class</CODE> to <CODE>el</CODE>
    */
   removeClass = inject('remove', function(el, classes) {
     classes = classes.split(',');

     for (var i = 0; i < classes.length; i++) {
       el.className = el.className.replace(classes[i], '').trim();
     }
   }),

   /*
    * Returns <CODE>true</CODE> if <CODE>el</CODE> has
    * the <CODE>class</CODE>, <CODE>false</CODE> otherwise
    */
   hasClass = inject('contains', function(el, className) {
     var classes = el.className.split(' '),
         result = false;

     for (var i = 0; i < classes.length; i++) {
       if (classes[i] == className) {
         result = true;
       }
     }

     return result;
   }),
  /*
   * Change the status of the widget and
   * aply 3 different classes for the icon
   * in the middle.
   */
  changeStatus = function(el, state, _$) {
    if (_$.status != undefined) {

      if (el.getAttribute('data-status') != undefined) {
        removeClass(el, _$.status[el.getAttribute('data-status')]);
      }

      addClass(el, _$.status[state]);
      el.setAttribute('data-status', state);
    }
  },

  /*
   * State: finished (kudos given)
   */
  finish = function(el, increase, _$) {
    // Finished
    addClass(el, 'finish');
    changeStatus(el, 'gamma', _$);

    increase = increase || false;
    amount = loadAmount(parseInt(el.getAttribute('data-id'), 10), _$);

    if (increase) {
      ++amount;

      // Update kudos via ajax
      request(el, 'POST', _$);
    }
  },
  /*
   * Enter the element
   */
  enter = function(e, el, _$) {
    var id = -1;

    // Do the kudo twist
    if (!hasClass(el, 'finish')) {
      // Activate the kudo twist
      addClass(el, 'active');

      // Start timeout
      id = setTimeout(function() {
        removeClass(el, 'active');
        finish(el, true, _$);
      }, _$.duration);

      // Add timeout id to global object
      _$.timer[el.getAttribute('data-id')] = id;
    }
  },
   /*
    * Touch enter the element
    */
  touchEnter = function(e, el, _$){
       // Only execute on single finger touch to allow zooming.
       if (e.touches.length === 1){
          // prevent from propagation and preventDefault. So we can use both touch events and mouse events.
          e.stopPropagation();
          e.preventDefault();

          // Execute "normal" enter function
          enter(e, el, _$);
       }
  },

  /*
   * Leave the element
   */
  out = function(e, el, _$) {
    if (!hasClass(el, 'finish')) {
      removeClass(el, 'active');
      clearTimeout(_$.timer[el.getAttribute('data-id')]);
    }
  },
  /*
   * Bind event
   */
  on = function(el, event, func, _$) {
    try {
      el.addEventListener(event, function(e) { func(e, el, _$); }, false);
    } catch(e) {
      el.attachEvent('on' + event, function(e) { func(e, el, _$); });
    }
  },

  /*
   * Saves the amount of a specific widget into localStorage
   * when <CODE>persistent</CODE> is <CODE>true</CODE>.
   */
  save = function(el, amount, _$) {
    if (_$.persistent) {
      window.localStorage.setItem('kudos:saved:' + el.getAttribute('data-url'), amount);
    }
  },

  /*
   * Loads the amount of a specific widget from the localStorage
   * when <CODE>persistent</CODE> is <CODE>true</CODE>.
   */
  loadAmount = function(id, _$) {
    var result = _$.elements[id].getAttribute('data-amount') || 0;

    if (_$.persistent) {
      if ((amount = window.localStorage.getItem('kudos:saved:' + _$.elements[id].getAttribute('data-url'))) != undefined) {
        result = amount;
      }
    }

    return result;
  },


  /*
   * Create a ajax request to a backend
   * which just keeps track of the kudos counter
   * via php & mysql
   */
  request = function(el, type, _$) {
    var xhr;

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
          changeStatus(el, amount == 0 ? 'alpha' : 'beta', _$);

          // When persistence is activated and a value was saved for the URL,
          // the kudos widget is in status gamma (finished)
          if (_$.persistent
           && window.localStorage.getItem('kudos:saved:' + el.getAttribute('data-url')) != null) {
            changeStatus(el, 'gamma', _$);
          }
        }

        if (type == 'POST') {
          save(el, amount, _$);
        }
      }
    };

    var url = "?url="+encodeURIComponent(el.getAttribute('data-url'));
    // Open request
    xhr.open(type, "http://api.kudosplease.com/" + url, true);
    xhr.send();
  };

  /* 
   * Constructor
   */
  function KudosPlease(args) {
    // All widgets
    this.elements = document.querySelectorAll(args.el);
    // Set the status
    this.status = args.status;
    // Is localStorage enabled?
    this.persistent = args.persistent != undefined ? (args.persistent && window.localStorage != undefined) : true;
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
      request(el, 'GET', this);

      // Amount is 0
      if (loadAmount(i, this) == 0) {
        // Set kudos amount
        el.setAttribute('data-amount', 0);

        // Init timer id
        this.timer[i] = -1;

        // Events, both touch and mouse
        on(el, 'touchstart', touchEnter, this);
        on(el, 'touchend', out, this);
        on(el, 'mouseover', enter, this);
        on(el, 'mouseout', out, this);

      // Load the amount and display it, because user already voted
      } else {
        finish(el, false, this);
      }
    }

    return this;
  }

  // trim polyfill
  ''.trim || (String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
  });

  return KudosPlease;
 })();