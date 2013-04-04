function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}

r(function() {
  /*
   * Create Kudos Please widget
   */
  new KudosPlease({ 
    el : '.kudos--default',
    duration : 1500,
    persistent : true,
    status : {
      alpha: '',
      beta: '',
      gamma: 'fontelico-emo-beer'
    }
  });

  /*
   * Create a Kudos Please widget and disable persistence
   */
  new KudosPlease({ 
    el : '.kudos--persistent',
    duration : 1500,
    persistent : false,
    status : {
      alpha: '',
      beta: '',
      gamma: 'fontelico-emo-beer'
    }
  });
});