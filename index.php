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
      <div class="meme">
        <h1 class="title" spellcheck="false"></h1>
        <img class="picture" src="" alt="Grumpy Cat hates you">
      </div>
    </section>
  </article>
  
  <article data-high="3">
    <section data-cols="3" class="editor"></section>
  </article>
  
  <article data-high="2">
    <section data-cols="2">
      <div>
        <section data-cols="2">
          <div>
            <button class="edit">Edit</button>
          </div>
          <div>
            <button class="random">Random</button>
          </div>
        </section>
      </div>
      
      <div>
        <section data-cols="2">
        <div>
          <a data-type="2" href="http://twitter.com/share?text=@GrumpyCathatesyou+says+&url=http://grumpycathatesyou.com/" target="_blank">
          <button class="share" >
            Tweet
          </button>
          </a>
        </div>
        <div>
          <button class="share" data-type="1">Share</button>
        </div>
        </section>
      </div>
    </section>
  </article>
  
  <article data-high="4">
    <section data-cols="1">
      <div>
        Handcrafted 2013 by <a href="http://twitter.com/TimPietrusky" target="_blank">@TimPietrusky</a>.
      </div>
    </section>
    
    <section data-cols="1">
      <div>
        <a href="https://github.com/TimPietrusky/grumpycathatesyou" target="_blank">Fork it on GitHub.</a>
      </div>
    </section>
    
    <section data-cols="1">
      <div>
        Grumpy Cat pictures by <a href="http://www.grumpycats.com/" target="_blank">Grumpy Cat Limited</a>.
      </div>
    </section>
  </article>
  
  <div class="message"></div>
  
  <!-- Template: Editor -->
  <script id="template_editor" type="text/template">
    <div class="editor--title">
      <h2>Title</h2>
    </div>

    <div class="editor--picture">
      <h2>Grumpy Cat</h2>
    </div>

    <div class="editor--font">
      <h2>Font</h2>
    </div>
  </script>

  <!-- Template: A picture of the PictureEditor -->
  <script id="template_pictureEditor_picture" type="text/template">
     <img class="preview" src="/img/grumpycats/<%= img %>.jpg" alt="Grumpy Cat <%= img %>">
  </script>

  <!-- Template: A picture of the PictureEditor -->
  <script id="template_fontEditor_font" type="text/template">
     <%= text %>
  </script>
  
  <?php if ($isLive): ?>
    <script src="/js/libs.js"></script>
    <script src="/js/main-min.js"></script>
    <script type="text/javascript">var _gaq = _gaq || [];_gaq.push(['_setAccount', 'UA-5596313-9']);_gaq.push(['_trackPageview']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();</script>
  <?php else: ?>
    <script src="/js/libs.js"></script>
    <script src="/js/main.js"></script>
  <?php endif; ?>
  
  <!--[if (gte IE 6)&(lte IE 8)]>
    <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->   
  
  </body>
</html>
