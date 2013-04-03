<!doctype html>
<html lang="en">
<head>
  <title>Kudos Please</title>
  
  <meta charset="utf-8">
  <meta name="author" content="Tim Pietrusky">
  <meta name="robots" content="index,follow">
  <meta name="revisit-after" content="1 days">
  <meta name="description" content="An one-element kudos widget with no dependencies + API!">

  <meta property="og:title" content="Kudos Please">
  <meta property="og:description" content="An one-element kudos widget with no dependencies + API!">
  <meta property="og:image" content="http://kudosplease.com/img/kudosplease_200.jpg">
  <meta property="og:url" content="http://kudosplease.com">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <link rel="stylesheet" href="/css/style.css">
  <link rel="shortcut icon" href="/img/kudosplease.ico" type="image/x-icon">
</head>

<?php
  $isLive = false;
  // Local vs production
  if (preg_match('!(kudosplease.com)!', $_SERVER['HTTP_HOST']) == 1) {
    $isLive = true;
  }
?>

<body id="kudosplease" data-max-width="1024" data-auto-extend="true">

  <article data-high="1">
    <section data-cols="1">
      <div>
        <h1>Kudos Please</h1>
      </div>
    </section>
  </article>
  
  <article data-high="2">
    <section data-cols="2">
      <div data-type="1">
        <div class="kudos" data-amount="0" data-url="kudosplease.com"></div>
      </div>
      <div data-type="2">
        <p>An one-element <b>kudos widget</b> with no dependencies.</p>
        <p>Works on touch and normal devices. </p>
        <p>The widget interacts with the <b>Kudos Please API</b> so you don't have to worry about saving the amount.</p>
        
        <p>
          <a href="https://github.com/TimPietrusky/KudosPlease" target="_blank">
          <button class="button--alpha">Fork it on GitHub</button>
        </a>
        </p>  
      </div>
    </section>
  </article>
  
  <article data-high="4">
    <section data-cols="2">
      <div data-type="1">
        <h2>1. Insert JS / CSS</h2>
        <b>JS</b>
        <pre><code class="language-markup">&lt;script src="kudosplease-min.js">&lt;/script></code></pre>
        <b>CSS</b>
        <pre><code class="language-markup">&lt;link rel="stylesheet" href="kudosplease-min.css"></code></pre>
      </div>
      <div data-type="2">
        <h2>2. Insert HTML</h2>
        <pre><code class="language-markup">&lt;div class="kudos" data-amount="0" data-url="domain.tld/my-awesome-article">&lt;/div></code></pre>
        <ul>
          <li><b>data-amount</b> - the amount of kudos for a specific url</li>
          <li><b>data-url</b> - the url to a specific site which receives the widget (without http://)</li>
        </ul>
      </div>
    </section>
    
    <section data-cols="1">
      <div data-type="3">
      
        <h2>3. Create the widget</h2>
<pre><code class="language-javascript">var kudosPlease = new KudosPlease({ 
    el : '.kudos',
    duration : 1500,
    status : {
      alpha: 'fontelico-emo-shoot',
      beta: 'fontelico-emo-shoot',
      gamma: 'fontelico-emo-beer'
    }
  });</code></pre>
        <ul>
          <li><b>el</b> - the class of the kudos dom element</li>
          <li><b>duration</b> - seconds until the kudos amount is increased</li>
          <li>
            <b>status</b> - adds a class to the widget depending on the status
            <ul>
              <li><b>alpha</b> - amount of 0</li>
              <li><b>beta</b> - amount > 0</li>
              <li><b>gamma</b> - kudos given (finish)</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  </article>
  
  <article data-high="3">
    <section data-cols="2">
        <div>
          <a href="http://twitter.com/share?text=Kudos+Widget+without+any+dependencies+and+Kudos+API+&url=http://kudosplease.com/" target="_blank">
          <button>
            Spread the word
          </button>
          </a>
        </div>
        <div>
          <a href="https://github.com/TimPietrusky/KudosPlease" target="_blank">
          <button>
            Fork it on GitHub
          </button>
          </a>
        </div>
    </section>
  </article>
  
  <article data-high="5">
    <section data-cols="1">
      <div>
        <p>
         Handcrafted 2013 by <a href="http://twitter.com/TimPietrusky" target="_blank">@TimPietrusky</a>.
        </p>
      </div>
    </section>
  </article>
  
  <?php if ($isLive): ?>
    <script src="/js/main-min.js"></script>
    <script type="text/javascript">var _gaq = _gaq || [];_gaq.push(['_setAccount', 'UA-5596313-10']);_gaq.push(['_trackPageview']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();</script>
  <?php else: ?>
    <script src="/js/kudosplease.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/prism.js"></script>
  <?php endif; ?>
  
  <!--[if (gte IE 6)&(lte IE 8)]>
    <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->   
  
  </body>
</html>
