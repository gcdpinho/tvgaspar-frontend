var item = '<div class="item ?" data-id="?" onclick="goToNoticia(this, event)">' +
    '<div class="item-image-1 demais">' +
    '<a class="img-link" href="?">' +
    '<img class="img-responsive img-full" src="interrogacao" alt="">' +
    '</a>' +
    '<span>' +
    '<a class="label-1 goToTag" href="?" style="background-color: ?">?</a>' +
    '</span>' +
    '</div>' +
    '<div class="item-content demais">' +
    '<div class="title-left title-style04 underline04 bar-title">' +
    '<h3>' +
    '<a class="noticia-title" href="?">?</a>' +
    '</h3>' +
    '</div>' +
    '<a href="?" target="_blank" class="text-justify block resumo">?</a>' +
    '</div>' +
    '<div class="pb30">' +
    '</div>'
'</div>';

var coluna = '<div class="col-sm-? col-md-?">' +
    '<div class="news colItem?">' +
    '</div>' +
    '</div>';

var linha = '<div class="row rowItem?">' +
    '</div>';

var propaganda = '<div class="add-place">' +
    '<a href="#" target="_blank">' +
    '<img src="img/ad_820x100.jpg" alt="">' +
    '</a>' +
    '</div>';


// var itemDestaque = '<div class="news-slider-layer">' +
//     '<a href="?" target="_blank" style="height: 350px">' +
//     '<div class="content ?">' +
//     '<span class="category-tag bg-1">?</span>' +
//     '<p style="background: rgba(0, 0, 0, 0.8); padding: 5px">?</p>' +
//     '</div>' +
//     '<img src="interrogacao" alt="" style="width: 100%; height: 100%"> </a>' +
//     '</div>';

var itemDestaque = '<div class="item ?" style="background: url(\'interrogacao\') no-repeat center; background-size: 100%">' +
    '<div style="background: rgba(0,0,0,0.5)">' +
    '<div class="item-image-1 demais">' +
    //   '<a class="img-link" href="?">' +
    //    '<img class="img-responsive img-full" src="interrogacao" alt="">' +
    //    '</a>' +
    '<span>' +
    '<a class="label-1" href="?">?</a>' +
    '</span>' +
    '</div>' +
    '<div class="item-content demais">' +
    '<div class="title-left title-style04 underline04">' +
    '<h3>' +
    '<a href="?" style="color:white">?</a>' +
    '</h3>' +
    '</div>' +
    '<a href="?" target="_blank" class="text-justify block colorWhite">?</a>' +
    '</div>' +
    '<div class="pb30">' +
    '</div>' +
    '</div>' +
    '</div>';

var itemSlider = '<div class="news-slider-layer ?">' + //tipo
    '<a href="?" target="_blank" class="text-center" data-id="?" onclick="goToNoticia(this, event)">' + //link
    '<div class="content text-left ?">' + //categoria
    '<span class="goToTag category-tag bg-?" style="background-color:?">?</span>' + // numbertype + categoria
    '<p>?</p>' + // manchete
    '</div>' +
    '<img src="interrogacao" alt=""> </a>' + //img
    '</div>';

var rowSlider = '<div class="news-slide rowSlider?">' +
    '</div>';

var noticia = '<div class="row content-head">' +
    '<div class="column medium-centered medium-19 large-18">' +
    '<h1 class="content-head__title" itemprop="headline">?</h1> ' +
    '</div>' +
    '<div class="column medium-centered medium-17 large-14 xlarge-16">' +
    '<h2 class="content-head__subtitle">?</h2>' +
    '</div>' +
    '</div>' +
    '<div class="medium-centered mc-column content-text active-extra-styles">?' +
    '</div>';

var imgNoticia = '<div class="foto">' +
    '<img src="tagImg-?"/>' +
    '</div>';

var noticiaCategoria = '<div class="row feed" data-id="?" onclick="goToNoticia(this, event)">' +
    '<div class="col-md-4 text-center">' +
    '<img src="interrogacao">' +
    '</div>' +
    '<div class="col-md-8 texto-categoria">' +
    '<h3 style="color:?">?</h3>' +
    '<div class="text-justify resumo">?</div>' +
    '</div>' +
    '</div>';

var noticiaCategoriaNoImage = '<div class="row feed" data-id="?" onclick="goToNoticia(this, event)">' +
    '<div class="col-md-12 texto-categoria">' +
    '<h3 style="color:?">?</h3>' +
    '<div class="text-justify resumo">?</div>' +
    '</div>' +
    '</div>';
var noticiaDestaque = '<div class="image1 img-overlay1" data-id="?" onclick="goToNoticia(this, event)" style="background: url(\'interrogacao\') center fixed no-repeat; cursor:pointer;">' +
    '<div class="container">' +
    '<div class="caption text-center">' +
    '<div class="color-white text-center weight-800 large-caption" style="font-size: 60px;">?</div>' +
    '<div class="color-white text-center weight-400 medium-caption" style="font-size: 30px;">?</div>' +
    '<h5>?</h5>' +
    '</div>' +
    '</div>' +
    '</div>';

var streamAoVivo = '<h2><strong>?</strong></h2>' +
    '<p>?</p>' +
    '<iframe src="?" style="width: 70%; height: 100%;">';

var itemColunista = `<li>
<div class="item" data-id="?" onclick="goToNoticia(this, event)">
  <div class="item-image">
    <a class="img-link" href="?">
      <img class="img-responsive img-full" src="interrogacao" alt="">
    </a>
  </div>
  <div class="item-content">
    <h3>?</h3>
    <p class="ellipsis">
      <a href="?">?</a>
    </p>
  </div>
</div>
</li>`;

var itemNovasNoticias = `<li style="margin: 0px;">
<h4>
  <span class="category">?:</span>
  <a href="?" data-id="?" onclick="goToNoticia(this, event)">?</a>
</h4>
</li>`;