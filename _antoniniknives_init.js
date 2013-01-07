var app = app || {vars:{},u:{}}; //make sure app exists.
app.rq = app.rq || []; //ensure array is defined. rq = resource queue.

// <!-- TODO: change carousel arrows -->
// <!-- BUG: production - reload on boat/farm category causes 500 error, maybe because missing products in these categories-->
// <!-- TODO: IE compatibility -->
// QUE: should there be a wishlist
// BUG: cart product extended not calculated correctly
// BUG: USPS Priority Mail (USA) shows incorrect value, but seems to calculate right
// TODO: add rating to prod temp

// app.rq.push(['extension',0,'convertSessionToOrder','extensions/checkout_passive/extension.js']);
app.rq.push(['extension',0,'convertSessionToOrder','extensions/checkout_nice/extension.js']);
app.rq.push(['extension',0,'store_checkout','extensions/store_checkout.js']);
app.rq.push(['extension',0,'store_prodlist','extensions/store_prodlist.js']);
app.rq.push(['extension',0,'store_navcats','extensions/store_navcats.js']);
app.rq.push(['extension',0,'store_search','extensions/store_search.js']);
app.rq.push(['extension',0,'store_product','extensions/store_product.js']);
app.rq.push(['extension',0,'store_cart','extensions/store_cart.js']);
app.rq.push(['extension',0,'store_crm','extensions/store_crm.js']);
app.rq.push(['extension',0,'antoniniknives_extension','_antoniniknives_extension.js']);
app.rq.push(['extension',0,'myRIA','quickstart.js','startMyProgram']);

app.rq.push(['extension',1,'analytics_google','extensions/analytics_google.js','startExtension']);
//app.rq.push(['extension',1,'bonding_buysafe','extensions/bonding_buysafe.js','startExtension']);
//app.rq.push(['extension',1,'powerReviews','extensions/reviews_powerreviews.js','startExtension']);
//app.rq.push(['extension',0,'magicToolBox','extensions/imaging_magictoolbox.js','startExtension']); // (not working yet - ticket in to MTB)

app.rq.push(['script',0,(document.location.protocol == 'file:') ? app.vars.httpURL+'jquery/config.js' : app.vars.baseURL+'jquery/config.js']); //The config.js is dynamically generated.
app.rq.push(['script',0,app.vars.baseURL+'model.js']); //'validator':function(){return (typeof zoovyModel == 'function') ? true : false;}}
app.rq.push(['script',0,app.vars.baseURL+'includes.js']); //','validator':function(){return (typeof handlePogs == 'function') ? true : false;}})
app.rq.push(['script',1,app.vars.baseURL+'jeditable.js']); //used for making text editable (customer address). non-essential. loaded late.
app.rq.push(['script',0,app.vars.baseURL+'controller.js']);

//group any third party files together (regardless of pass) to make troubleshooting easier.
app.rq.push(['script',0,(document.location.protocol == 'https:' ? 'https:' : 'http:')+'//ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/jquery-ui.js']);
app.rq.push(['script',0,app.vars.baseURL+'cycle.js']);
app.rq.push(['script',0,app.vars.baseURL+'AnythingSlider/jquery.anythingslider.js']);

// json data
app.rq.push(['script',0,app.vars.baseURL+'_antoniniknives_subcatData.js']);
app.rq.push(['script',0,app.vars.baseURL+'_antoniniknives_catData.js']);
app.rq.push(['script',0,app.vars.baseURL+'_antoniniknives_pdfData.js']);

//spec_LLTRSHIRT017_0
//add tabs to product data.
//tabs are handled this way because jquery UI tabs REALLY wants an id and this ensures unique id's between product
app.rq.push(['templateFunction','productTemplate','onCompletes',function(P) {
  var safePID = app.u.makeSafeHTMLId(P.pid); //can't use jqSelector because productTEmplate_pid still used makesafe. planned Q1-2012 update ###
  var $tabContainer = $( ".tabbedProductContent",$('#productTemplate_'+safePID));
    if($tabContainer.length)  {
      if($tabContainer.data("tabs")){} //tabs have already been instantiated. no need to be redundant.
      else  {
        $("div.tabContent",$tabContainer).each(function (index) {
          $(this).attr("id", "spec_"+safePID+"_" + index.toString());
        });
        $(".tabs li a",$tabContainer).each(function (index) {
          $(this).attr('id','href_'+safePID+"_" + index.toString());
          $(this).attr("href", "app://#spec_"+safePID+"_" + index.toString());
        });
        $tabContainer.localtabs();
      }
    }
  else  {} //couldn't find the tab to tabificate.
}]);

//sample of an onDeparts. executed any time a user leaves this page/template type.
// app.rq.push(['templateFunction','homepageTemplate','onDeparts',function(P) {app.u.dump("just left the homepage")}]);

///// custom \\\\\

/// variables \\\

var categories = {
  "home": {
    "navcat": "",
    "banner": "bannerHome",
    "logo": "",
    "menu": "",
    "accentColor": ""
  },
  "boat": {
    "navcat": ".boat_-_fishing",
    "banner": "bannerCategoryBoat",
    "logo": "logoCategoryBoat",
    "menu": "#tier1categories_boat__fishing ul",
    "accentColor": "categoryBoat"
  },
  "cable": {
    "navcat": ".cable_-_electrical",
    "banner": "bannerCategoryCable",
    "logo": "logoCategoryCable",
    "menu": "#tier1categories_cable__electrical ul",
    "accentColor": "categoryCable"
  },
  "farm": {
    "navcat": ".farm_-_garden",
    "banner": "bannerCategoryFarm",
    "logo": "logoCategoryFarm",
    "menu": "#tier1categories_farm__garden ul",
    "accentColor": "categoryFarm"
  },
  "pocket": {
    "navcat": ".pocket_-_traditional",
    "banner": "bannerCategoryPocket",
    "logo": "logoCategoryPocket",
    "menu": "#tier1categories_pocket__traditional ul",
    "accentColor": "categoryPocket"
  },
  "promo": {
    "navcat": ".promo_-_customizing",
    "banner": "bannerCategoryPromo",
    "logo": "logoCategoryPromo",
    "menu": "#tier1categories_promo__customizing ul",
    "accentColor": "categoryPromo"
  },
  "sos": {
    "navcat": ".sos_-_rescue",
    "banner": "bannerCategorySos",
    "logo": "logoCategorySos",
    "menu": "#tier1categories_sos__rescue ul",
    "accentColor": "categorySos"
  },
  "accessories": {
    "navcat": ".accessories",
    "banner": "",
    "logo": "",
    "menu": "",
    "accentColor": ""
  },
  "wholesale": {
    "navcat": ".wholesale",
    "banner": "",
    "logo": "",
    "menu": "",
    "accentColor": ""
  },
  "pdf": {
    "navcat": ".pdf-catalogs",
    "banner": "",
    "logo": "",
    "menu": "",
    "accentColor": ""
  }
};

var prettyNames = {};
// prettyNames[categories['accessories'].navcat] = "Accessories";
// prettyNames[categories['promo'].navcat]       = "Promo - Customizing";

var banner       = 'header';
var sidebar      = '.sidebar';
var sidebarHome  = 'sidebarHome';
var slideshow    = '#slideshowContainer';
var logoCategory = '#logoCategory';
var menuProducts = '.menuProductList';
var menuSubLists = '.menuSubList';

var headingCategory           = '.headingsCategory h1';
var productCategory           = '.productCurrentCategory';
var headingProductSub         = '.headingProductSubCategory';
var headingProductCategory    = '.headingsProduct h3';
var elementsWithCategoryColor = '.categoryColor';

var headingSubsParent = '.headingSubsParent';
var navMenuSubCurrent = 'current';
var subcatPrettyLong  = '.subcatPrettyLong';
var subcatDescription = '.subcatDescription';

var wholesaleContact = '.contactFormWholesale';
var pdfLinks         = '.pdfLinks';

var currentCategory;
var currentNavcat;
var periodCount;
var htmlSafe;
var currentSubListItem;


/// functions \\\

// function titlize(navcatName) {
//   var temp;
//   temp = navcatName.split('.').join('');
//   temp = temp.split('_').join(' ');
//   temp = capitalizeAllWords(temp);
//   return temp;
// }

// function capitalizeAllWords(lowercase) {
//   var title;
//   title = lowercase.replace(/\b[a-z]/g, function ($0) {
//     return $0.toUpperCase();
//   });
//   return title;
// }

function getPeriodCount(value) {
  if (value) {
    return value.split('.').length - 1;
  }else {
    return 0;
  }
}

function getCategory (navcat, subLevel) {
  var periodCount = getPeriodCount(navcat);
  var level = (subLevel || 0) + 1; // default is category
  var value;

  if (periodCount > 0) {
    value = navcat.split('.')[level];
    if (value) {
      return '.' + value;
    }
  }
  return '';
}

// subcat conversion
function setValueFromSubcatData(selector, field) {
  var value   = 'Not set';
  var navcat = $(selector).text(); // navcat must be text in html
  var category = getCategory(navcat);
  var subCategory = getCategory(navcat, 1);

  // set json value
  if(category && subCategory && subcatData[category] && subcatData[category][subCategory] && subcatData[category][subCategory][field]){
    value = subcatData[category][subCategory][field];
  }
  // change text json value
  $(selector).html(value);
}

function fixHiddenPretty(pretty) {
  var temp = pretty;
  if (temp[0] == ('!')) {
    temp = temp.replace(/!/, '');
  }
  return temp;
}

function getPretty(navcat) {
  var temp;
  if (typeof prettyNames != 'undefined') {
    temp = prettyNames[navcat];
    if (temp) {
      // app.u.dump('using cached pretty');
      return temp;
    }else if (app.data['appCategoryDetail|' + navcat] && (temp = app.data['appCategoryDetail|' + navcat]['pretty'])) {
      // app.u.dump('getting pretty');
      return (prettyNames[navcat] = fixHiddenPretty(temp) || '');
    }else {
      app.u.dump("Warning: pretty name for " + navcat + " not found.");
      return '';
    }
  }else {
    app.u.dump("Warning: catPrettyNames is undefined");
  }
}

// function getPretty(navcat) {
//   if (app.data['appCategoryDetail|' + navcat] && app.data['appCategoryDetail|' + navcat]['pretty']) {
//     return prettyNames[navcat] || (prettyNames[navcat] = fixHiddenPretty(app.data['appCategoryDetail|' + navcat]['pretty']) || '');
//   }
//   return '';
// }

function getPdfLinks() {
  // creates content for the pdf catalogs category
  var page = "<h4>Click link below to download</h4>";
  var directory = pdfDirectory || '';
  var name;
  var value;
  if(typeof pdfData != 'undefined') {
    for(var key in pdfData) {
      name = getPretty(key) + ' (PDF)';
      link  = name + ' Catalog';
      value = pdfData[key];
      if (value) {
        page += "<p><a title='" + link + "' href='" + directory + value + "' target='_blank'>" + name + "</a></p>";
      }
    }
  }else {
    app.u.dump('Warining: pdfData is missing.');
    page = '';
  }
  return page;
}

function getTier1ID(navcat) {
  // replace '.' with '_' and '-' with ''
  var temp = '#tier1categories' + navcat.split('.').join('_').split(/-/).join('');
  return temp;
}

function resetBanner() {
  $(banner).removeClass();
  $(sidebar).removeClass(sidebarHome);
  $(slideshow).addClass('displayNone');
}

function resetCategoryLogo() {
  $(logoCategory).removeClass();
}

function resetAllMenuSubs() {
  $(menuSubLists).slideUp(500);
  // $(menuSubLists + ' li').removeClass(navMenuSubCurrent);
}


function categoryLink (navcat, pretty) {
  var temp = pretty || '';
  return "<a href='#top' title='" + temp + "' onClick='return showContent(\"category\",{\"navcat\":\"" + navcat + "\"});'>" + temp + "</a>";
}

function categoryOnClick (navcat) {
  return "onClick='return showContent(\"category\",{\"navcat\":\"" + navcat + "\"});'";
}

function categoryLinkNoText (navcat, pretty) {
  var temp = pretty || '';
  return "<a href='#top' title='" + temp + "' onClick='return showContent(\"category\",{\"navcat\":\"" + navcat + "\"});'></a>";
}


function addLink(parent, tag, navcat) {
  $('#'+parent+' .'+tag).click(function () {
    showContent('category', {'navcat':navcat});
  });
}

// homepage slideshow
function startSlideShow() {
  var $target = $('#wideSlideshow');
  var len = $target.children().length;
  var startIndex = Math.floor((Math.random()*len)+1); // random start
  // app.u.dump(startIndex);
  $(slideshow).removeClass('displayNone');
  if(len > 1) {
    $('#wideSlideshow').cycle({
      fx:'fade',
      speed:'slow',
      timeout: 5000,
      pager:'#slideshowNav',
      slideExpr: 'li',
      startingSlide: startIndex
    });
  }
}

function defaultPage() {
  resetBanner();
  resetAllMenuSubs();
  $(banner).addClass(categories['home'].banner, function () {
    startSlideShow();
  });
  $(sidebar).addClass(sidebarHome);
  $(logoCategory).addClass("displayNone");
}


function startAnythingSlider ($target, slidesAtOnce) {
  slidesAtOnce = slidesAtOnce || false;
  // app.u.dump([$target]);
  if ($target.children().length > 0) {
    $target.anythingSlider({
      // Appearance
      theme               : "default", // Theme name
      mode                : "horiz",   // Set mode to "horizontal", "vertical" or "fade" (only first letter needed); replaces vertical option
      // expand              : false,     // If true, the entire slider will expand to fit the parent element
      // resizeContents      : true,      // If true, solitary images/objects in the panel will expand to fit the viewport
      showMultiple        : slidesAtOnce,     // Set this value to a number and it will show that many slides at once
      easing              : "linear",   // Anything other than "linear" or "swing" requires the easing plugin or jQuery UI
     
      buildArrows         : true,      // If true, builds the forwards and backwards buttons
      buildNavigation     : true,      // If true, builds a list of anchor links to link to each panel
      buildStartStop      : true,      // If true, builds the start/stop button
     
      // appendForwardTo     : null,      // Append forward arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
      // appendBackTo        : null,      // Append back arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
      // appendControlsTo    : null,      // Append controls (navigation + start-stop) to a HTML element (jQuery Object, selector or HTMLNode), if not null
      // appendNavigationTo  : null,      // Append navigation buttons to a HTML element (jQuery Object, selector or HTMLNode), if not null
      // appendStartStopTo   : null,      // Append start-stop button to a HTML element (jQuery Object, selector or HTMLNode), if not null
     
      // toggleArrows        : false,     // If true, side navigation arrows will slide out on hovering & hide @ other times
      // toggleControls      : false,     // if true, slide in controls (navigation + play/stop button) on hover and slide change, hide @ other times
     
      // startText           : "Start",   // Start button text
      // stopText            : "Stop",    // Stop button text
      // forwardText         : "&raquo;", // Link text used to move the slider forward (hidden by CSS, replaced with arrow image)
      // backText            : "&laquo;", // Link text used to move the slider back (hidden by CSS, replace with arrow image)
      // tooltipClass        : "tooltip", // Class added to navigation & start/stop button (text copied to title if it is hidden by a negative text indent)
     
      // Function
      enableArrows        : true,      // if false, arrows will be visible, but not clickable.
      enableNavigation    : true,      // if false, navigation links will still be visible, but not clickable.
      enableStartStop     : true,      // if false, the play/stop button will still be visible, but not clickable. Previously "enablePlay"
      enableKeyboard      : true,      // if false, keyboard arrow keys will not work for this slider.
     
      // Navigation
      // startPanel          : 1,         // This sets the initial panel
      // changeBy            : 1,         // Amount to go forward or back when changing panels.
      // hashTags            : true,      // Should links change the hashtag in the URL?
      // infiniteSlides      : true,      // if false, the slider will not wrap & not clone any panels
      // navigationFormatter : null,      // Details at the top of the file on this use (advanced use)
      // navigationSize      : false,     // Set this to the maximum number of visible navigation tabs; false to disable
     
      // Slideshow options
      autoPlay            : true,     // If true, the slideshow will start running; replaces "startStopped" option
      autoPlayLocked      : true,     // If true, user changing slides will not stop the slideshow
      autoPlayDelayed     : true,     // If true, starting a slideshow will delay advancing slides; if false, the slider will immediately advance to the next slide when slideshow starts
      pauseOnHover        : true,      // If true & the slideshow is active, the slideshow will pause on hover
      stopAtEnd           : false,     // If true & the slideshow is active, the slideshow will stop on the last page. This also stops the rewind effect when infiniteSlides is false.
      // playRtl             : false,     // If true, the slideshow will move right-to-left
     
      // Times
      delay               : 5000,      // How long between slideshow transitions in AutoPlay mode (in milliseconds)
      resumeDelay         : 15000,     // Resume slideshow after user interaction, only if autoplayLocked is true (in milliseconds).
      animationTime       : 600,       // How long the slideshow transition takes (in milliseconds)
      // delayBeforeAnimate  : 0,         // How long to pause slide animation before going to the desired slide (used if you want your "out" FX to show).
     
      // Callbacks
      // onBeforeInitialize  : function(e, slider) {}, // Callback before the plugin initializes
      // onInitialized       : function(e, slider) {}, // Callback when the plugin finished initializing
      // onShowStart         : function(e, slider) {}, // Callback on slideshow start
      // onShowStop          : function(e, slider) {}, // Callback after slideshow stops
      // onShowPause         : function(e, slider) {}, // Callback when slideshow pauses
      // onShowUnpause       : function(e, slider) {}, // Callback when slideshow unpauses - may not trigger properly if user clicks on any controls
      // onSlideInit         : function(e, slider) {}, // Callback when slide initiates, before control animation
      // onSlideBegin        : function(e, slider) {}, // Callback before slide animates
      // onSlideComplete     : function(slider) {},    // Callback when slide completes; this is the only callback without an event "e" variable
     
      // Interactivity
      clickForwardArrow   : "click",         // Event used to activate forward arrow functionality (e.g. add jQuery mobile's "swiperight")
      clickBackArrow      : "click",         // Event used to activate back arrow functionality (e.g. add jQuery mobile's "swipeleft")
      clickControls       : "click focusin", // Events used to activate navigation control functionality
      clickSlideshow      : "click",         // Event used to activate slideshow play/stop button
      allowRapidChange    : false            // If true, allow rapid changing of the active pane, instead of ignoring activity during animation
     
      // Video
      // resumeOnVideoEnd    : true,      // If true & the slideshow is active & a supported video is playing, it will pause the autoplay until the video is complete
      // resumeOnVisible     : true,      // If true the video will resume playing (if previously paused, except for YouTube iframe - known issue); if false, the video remains paused.
      // addWmodeToObject    : "opaque",  // If your slider has an embedded object, the script will automatically add a wmode parameter with this setting
      // isVideoPlaying      : function(base){ return false; } // return true if video is playing or false if not - used by video extension
    });
  }
}

function stopAnythingSlider($target) {
  // $('.anythingSlider').data('AnythingSlider').startStop(false);
  // $('.anythingSlider').eq(1).remove();
  // $target.data('AnythingSlider').startStop(false);
  // app.u.dump([$target]);
  if (($slider = $target.data('AnythingSlider'))) {
    $slider.startStop(false);
  }
  // app.u.dump('stopped slider: ' + $target.selector);
}

function startSliderHomeBestSellers() {
  startAnythingSlider($('#homeProdSearchBestSellers'));
  // app.u.dump([($('#homeProdSearchBestSellers').data('AnythingSlider').startStop(false))]);
}

function stopSliderHomeBestSellers() {
  stopAnythingSlider($('#homeProdSearchBestSellers'));
}

function startSliderProductExtras(parentID) {
  startAnythingSlider($('#' + parentID + ' .productListProductExtras'), 4);
}

function stopSliderProductExtras(parentID) {
  // app.u.dump([$('#' + parentID + ' .anythingSlider ul.productList')]);
  $('.anythingSlider ul.productList').each( function () {
    stopAnythingSlider($(this));
  });
}

/// homepage \\\
app.rq.push(['templateFunction','homepageTemplate','onCompletes',function(P) {
  defaultPage();
  startSliderHomeBestSellers();

  // add links to category logos
  addLink(P.parentID, categories['boat'].logo,    categories['boat'].navcat);
  addLink(P.parentID, categories['cable'].logo,   categories['cable'].navcat);
  addLink(P.parentID, categories['farm'].logo,    categories['farm'].navcat);
  addLink(P.parentID, categories['pocket'].logo,  categories['pocket'].navcat);
  addLink(P.parentID, categories['sos'].logo,     categories['sos'].navcat);
  addLink(P.parentID, categories['promo'].logo,   categories['promo'].navcat);

  // add hover to carousel
  // $('#' + P.parentID + ' .prodThumbContainer' + ' .productAttribute').hide();
  $('#' + P.parentID + ' .prodThumbContainer:not(.bound)').addClass('bound').hover(function (){
    $(this).toggleClass('categoryProductHover');
    // $(this).toggleClass('categoryProductHover', function () {
      // $(this).children('.productAttribute').slideToggle();
      // app.u.dump('binding');
    // });
  });

  // add hover class to category logos
  $('#' + P.parentID + ' .logoCategoryHome').hover(function () {
    $(this).toggleClass('categoryListHover categoryLogoHover');
  });
}]);

app.rq.push(['templateFunction','homepageTemplate','onDeparts',function(P) {
  $(logoCategory).removeClass("displayNone");
  stopSliderHomeBestSellers();
  // $('#' + P.parentID + ' .prodThumbContainer').unbind();
  // app.u.dump('unbinding');
  // $(sidebar).removeClass(sidebarHome);
  // $(wholesaleInfo).addClass("displayNone");
}]);

/// company \\\
app.rq.push(['templateFunction','companyTemplate','onCompletes',function(P) {
  // app.u.dump('on company');
  defaultPage();
}]);

/// customer \\\
app.rq.push(['templateFunction','customerTemplate','onCompletes',function(P) {
  // app.u.dump('on customer');
  defaultPage();
}]);

/// search \\\
app.rq.push(['templateFunction','searchTemplate','onCompletes',function(P) {
  // app.u.dump($('.product').length);
  // app.u.dump('on search');
  defaultPage();

  // add hover class to products
  // does not work for search results
  // $('#'+P.parentID+' '+'.product').hover(function() {
  //   app.u.dump('hover');
  //   $(this).toggleClass('categoryProductHover');
  // });
}]);

///// categories \\\\\
app.rq.push(['templateFunction','categoryTemplate','onCompletes',function(P) {
  // app.u.dump('on category');
  // resets
  resetBanner();
  resetCategoryLogo();
  resetAllMenuSubs();

  currentNavcat   = P.navcat;
  currentCategory = getCategory(currentNavcat);

  // show category sub in menu
  $(getTier1ID(currentCategory) + ' > ul').slideDown(500);

  if (currentNavcat && currentNavcat !== currentCategory) {
    // sub category
    htmlSafe = currentNavcat.split('.').join('_');
    currentSubListItem = '.subcategory' + htmlSafe;
    $(currentSubListItem).addClass(navMenuSubCurrent);
  }

  // add hover class to lists
  $('#'+P.parentID+' '+'.subCategory').hover(function() {
    $(this).toggleClass('categoryListHover');
  });

  // add hover class to products
  $('#'+P.parentID+' '+'.product').hover(function() {
    $(this).toggleClass('categoryProductHover');
  });

  //add link to logo
  $(logoCategory).html(categoryLink(currentCategory));

  switch(currentCategory) {
    case categories['boat'].navcat:
      $(banner).addClass(categories['boat'].banner);
      $(logoCategory).addClass(categories['boat'].logo);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(categories['boat'].accentColor);
      break;
    case categories['cable'].navcat:
      $(banner).addClass(categories['cable'].banner);
      $(logoCategory).addClass(categories['cable'].logo);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(categories['cable'].accentColor);
      break;
    case categories['farm'].navcat:
      $(banner).addClass(categories['farm'].banner);
      $(logoCategory).addClass(categories['farm'].logo);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(categories['farm'].accentColor);
      break;
    case categories['pocket'].navcat:
      $(banner).addClass(categories['pocket'].banner);
      $(logoCategory).addClass(categories['pocket'].logo);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(categories['pocket'].accentColor);
      break;
    case categories['promo'].navcat:
      $(banner).addClass(categories['promo'].banner);
      $(logoCategory).addClass(categories['promo'].logo);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(categories['promo'].accentColor);
      break;
    case categories['sos'].navcat:
      $(banner).addClass(categories['sos'].banner);
      $(logoCategory).addClass(categories['sos'].logo);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(categories['sos'].accentColor);
      break;
    case categories['wholesale'].navcat:
      defaultPage();
      $(wholesaleContact).show();
      break;
    case categories['pdf'].navcat:
      defaultPage();
      $(pdfLinks).html(getPdfLinks());
      $(pdfLinks).show();
      break;
    default:
      defaultPage();
  }
}]);

app.rq.push(['templateFunction','categoryTemplate','onDeparts',function(P) {
  if (currentSubListItem) {
    $(currentSubListItem).removeClass(navMenuSubCurrent);
  }
  $(wholesaleContact).hide();
}]);

///// products \\\\\
app.rq.push(['templateFunction','productTemplate','onCompletes',function(P) {
  // resets
  resetBanner();
  resetCategoryLogo();
  resetAllMenuSubs();
  
  // app.u.dump([P]);
  // app.u.dump($(productCategory, '#' + P.parentID).html());
  // IE loads this 3 times, navcat span becomes blank
  currentNavcat = currentNavcat || $('#' + P.parentID + ' ' + productCategory).html();
  // app.u.dump('currentNavcat: ' + currentNavcat);
  currentCategory = currentCategory || getCategory(currentNavcat);
  // app.u.dump('currentCategory: ' + currentCategory);
  // currentSub      = getCategory(currentNavcat, 1);

  // show category sub in menu
  $(getTier1ID(currentCategory) + ' > ul').slideDown();

  // add active class to subcategory
  if (currentNavcat) {
    htmlSafe = currentNavcat.split('.').join('_');
    currentSubListItem = '.subcategory' + htmlSafe;
    $(currentSubListItem).addClass(navMenuSubCurrent);
  }

  // carousels
  startSliderProductExtras(P.parentID);

  // add hover class to products - broken by slider
  // $('#' + P.parentID + ' ' + '.product' + ' ' + '.productAttribute').hide();
  $('#'+P.parentID+' '+'.product').hover(function() {
    $(this).toggleClass('categoryProductHover');
    // $(this).children().children('.productAttribute').slideToggle();
  });

  switch(currentCategory) {
    case categories['boat'].navcat:
      $(banner).addClass(categories['boat'].banner);
      $(logoCategory).addClass(categories['boat'].logo);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(categories['boat'].accentColor);
      break;
    case categories['cable'].navcat:
      $(banner).addClass(categories['cable'].banner);
      $(logoCategory).addClass(categories['cable'].logo);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(categories['cable'].accentColor);
      break;
    case categories['farm'].navcat:
      $(banner).addClass(categories['farm'].banner);
      $(logoCategory).addClass(categories['farm'].logo);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(categories['farm'].accentColor);
      break;
    case categories['pocket'].navcat:
      $(banner).addClass(categories['pocket'].banner);
      $(logoCategory).addClass(categories['pocket'].logo);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(categories['pocket'].accentColor);
      break;
    case categories['promo'].navcat:
      $(banner).addClass(categories['promo'].banner);
      $(logoCategory).addClass(categories['promo'].logo);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(categories['promo'].accentColor);
      break;
    case categories['sos'].navcat:
      $(banner).addClass(categories['sos'].banner);
      $(logoCategory).addClass(categories['sos'].logo);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(categories['sos'].accentColor);
      break;
    default:
      defaultPage();
  }
}]);

app.rq.push(['templateFunction', 'productTemplate', 'onDeparts', function (P) {
  // app.u.dump('leaving product');
  // stopSliderProductExtras(P.parentID);
  stopSliderProductExtras();
  if(currentSubListItem) {
    $(currentSubListItem).removeClass(navMenuSubCurrent);
  }

  // reset navcat
  // currentNavcat = '';
  // currentCategory = '';
}]);

///// end custom \\\\\

/*
This function is overwritten once the controller is instantiated.
Having a placeholder allows us to always reference the same messaging function, but not impede load time with a bulky error function.
*/
app.u.throwMessage = function(m)  {
  alert(m);
};

app.u.howManyPassZeroResourcesAreLoaded = function(debug) {
  var L = app.vars.rq.length;
  var r = 0; //what is returned. total # of scripts that have finished loading.
  for(var i = 0; i < L; i++)  {
    if(app.vars.rq[i][app.vars.rq[i].length - 1] === true)  {
      r++;
      }
    if(debug) {app.u.dump(" -> "+i+": "+app.vars.rq[i][2]+": "+app.vars.rq[i][app.vars.rq[i].length -1]);}
    }
  return r;
};


//gets executed once controller.js is loaded.
//check dependencies and make sure all other .js files are done, then init controller.
//function will get re-executed if not all the scripts in app.vars.scripts pass 1 are done loading.
//the 'attempts' var is incremented each time the function is executed.

app.u.initMVC = function(attempts){
//  app.u.dump("app.u.initMVC activated ["+attempts+"]");
  var includesAreDone = true;

//what percentage of completion a single include represents (if 10 includes, each is 10%).
  var percentPerInclude = Math.round((100 / app.vars.rq.length));
  var resourcesLoaded = app.u.howManyPassZeroResourcesAreLoaded();
  var percentComplete = resourcesLoaded * percentPerInclude; //used to sum how many includes have successfully loaded.

  $('#appPreViewProgressBar').val(percentComplete);
  $('#appPreViewProgressText').empty().append(percentComplete+"% Complete");

  if(resourcesLoaded == app.vars.rq.length) {
    //instantiate controller. handles all logic and communication between model and view.
    //passing in app will extend app so all previously declared functions will exist in addition to all the built in functions.
    //tmp is a throw away variable. app is what should be used as is referenced within the mvc.
    app.vars.rq = null; //to get here, all these resources have been loaded. nuke record to keep DOM clean and avoid any duplication.
    var tmp = new zController(app);
    //instantiate wiki parser.
    myCreole = new Parse.Simple.Creole();
  }else if(attempts > 50)  {
    app.u.dump("WARNING! something went wrong in init.js");
    //this is 10 seconds of trying. something isn't going well.
    $('#appPreView').empty().append("<h2>Something seems to have gone wrong. </h2><h3><a href='http://www.antoniniknivesusa.com/'>Refresh</a></h3><p>Several attempts were made to load the store but some necessary files were not found or could not load. We apologize for the inconvenience. Please try 'refresh' and see if that helps.<br><b>If the error persists, please contact the site administrator</b></p>");
    app.u.howManyPassZeroResourcesAreLoaded(true);
  }else {
    setTimeout("app.u.initMVC("+(attempts+1)+")",250);
  }
};



//Any code that needs to be executed after the app init has occured can go here.
//will pass in the page info object. (pageType, templateID, pid/navcat/show and more)
app.u.appInitComplete = function(P) {
  app.u.dump("Executing myAppIsLoaded code...");

  // Add accessories & promo to menu
  setTimeout(function () {
    $('#tier1categories').append("<li id='tier1categories_accessories'><div class='pointer'" + categoryOnClick(categories['accessories'].navcat) + " onMouseOver='$(this).addClass(\"navMenuCategoryHover\");' onMouseOut='$(this).removeClass(\"navMenuCategoryHover\");'>" + getPretty(categories['accessories'].navcat) + "</div></li>");
  }, 1500);
  setTimeout(function () {
    $('#tier1categories').append("<li id='tier1categories_promo__customizing'><div class='pointer'" + categoryOnClick(categories['promo'].navcat) + " onMouseOver='$(this).addClass(\"navMenuCategoryHover\");' onMouseOut='$(this).removeClass(\"navMenuCategoryHover\");'>" + getPretty(categories['promo'].navcat) + "</div></li>");
  }, 1500);
};




//don't execute script till both jquery AND the dom are ready.
$(document).ready(function(){
  app.u.handleRQ(0);

  // Hid pre load images
  $('.preload').hide();
});