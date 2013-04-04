function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}

r(function() {
  /*
   * Create Kudos Please widget
   */
  var kudosPlease = new KudosPlease({ 
    el : '.kudos',
    duration : 1500,
    persistent : true,
    status : {
      alpha: '',
      beta: '',
      gamma: 'fontelico-emo-beer'
    }
  });
});