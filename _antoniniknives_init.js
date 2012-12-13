var app = app || {vars:{},u:{}}; //make sure app exists.
app.rq = app.rq || []; //ensure array is defined. rq = resource queue.




// app.rq.push(['extension',0,'convertSessionToOrder','extensions/checkout_passive/extension.js']);
app.rq.push(['extension',0,'convertSessionToOrder','extensions/checkout_nice/extension.js']);
app.rq.push(['extension',0,'store_checkout','extensions/store_checkout.js']);
app.rq.push(['extension',0,'store_prodlist','extensions/store_prodlist.js']);
app.rq.push(['extension',0,'store_navcats','extensions/store_navcats.js']);
app.rq.push(['extension',0,'store_search','extensions/store_search.js']);
app.rq.push(['extension',0,'store_product','extensions/store_product.js']);
app.rq.push(['extension',0,'store_cart','extensions/store_cart.js']);
app.rq.push(['extension',0,'store_crm','extensions/store_crm.js']);
// app.rq.push(['extension',0,'carousel','carousel-ad.js','carousel-ad.js']);
app.rq.push(['extension',0,'antoniniknives_extension','_antoniniknives_extension.js']);
app.rq.push(['extension',0,'myRIA','quickstart.js','startMyProgram']);


app.rq.push(['extension',1,'analytics_google','extensions/analytics_google.js','addTriggers']);
//app.rq.push(['extension',1,'bonding_buysafe','extensions/bonding_buysafe.js','addTriggers']);
//app.rq.push(['extension',1,'powerReviews','extensions/reviews_powerreviews.js','startExtension']);
//app.rq.push(['extension',0,'magicToolBox','extensions/imaging_magictoolbox.js','startExtension']); // (not working yet - ticket in to MTB)

// app.rq.push(["namespace":"myRIA","filename":"carousel-ad.js","callback":"startMyProgram"]);


// add tabs to product data.
app.rq.push(['templateFunction','productTemplate','onCompletes',function(P) {
  $( ".tabbedProductContent",$('#productTemplate_'+app.u.makeSafeHTMLId(P.pid))).tabs();
}]);
app.rq.push(['script',0,(document.location.protocol == 'file:') ? app.vars.httpURL+'jquery/config.js' : app.vars.baseURL+'jquery/config.js']); //The config.js is dynamically generated.
app.rq.push(['script',0,app.vars.baseURL+'model.js']); //'validator':function(){return (typeof zoovyModel == 'function') ? true : false;}}
app.rq.push(['script',0,app.vars.baseURL+'includes.js']); //','validator':function(){return (typeof handlePogs == 'function') ? true : false;}})
app.rq.push(['script',1,app.vars.baseURL+'jeditable.js']); //used for making text editable (customer address). non-essential. loaded late.
app.rq.push(['script',0,app.vars.baseURL+'controller.js']);
app.rq.push(['script',0,app.vars.baseURL+'_antoniniknives_subcatData.js']);
app.rq.push(['script',0,app.vars.baseURL+'_antoniniknives_pdfData.js']);
// app.rq.push(['script',0,app.vars.baseURL+'jcarousel/carousel-ad.js']);

//cycle used for slideshow
app.rq.push(['script',0,app.vars.baseURL+'cycle.js']);

//sample of an onDeparts. executed any time a user leaves this page/template type.
// app.rq.push(['templateFunction','homepageTemplate','onDeparts',function(P) {app.u.dump("just left the homepage")}]);

///// custom \\\\\

/// variables \\\

var categoryBoat        = '.boat_-_fishing';
var categoryCable       = '.cable_-_electrical';
var categoryFarm        = '.farm_-_garden';
var categoryPocket      = '.pocket_-_traditional';
var categoryPromo       = '.promo_-_customizing';
var categorySos         = '.sos_-_rescue';
var categoryAccessories = '.accessories';
var categoryWholesale   = '.wholesale';
var categoryPdf         = '.pdf-catalogs';

var prettyNames = {};
// var prettyBoat;
// var prettyCable;
// var prettyFarm;
// var prettyPocket;
// var prettyPromo;
// var prettySos;
// var prettyAccessories;

var banner                    = 'header';
var classBannerHome           = 'bannerHome';
var classBannerCategoryBoat   = 'bannerCategoryBoat';
var classBannerCategoryCable  = 'bannerCategoryCable';
var classBannerCategoryFarm   = 'bannerCategoryFarm';
var classBannerCategoryPocket = 'bannerCategoryPocket';
var classBannerCategoryPromo  = 'bannerCategoryPromo';
var classBannerCategorySos    = 'bannerCategorySos';

var sidebar     = '.sidebar';
var sidebarHome = 'sidebarHome';

var slideshow = '#slideshowContainer';

var logoCategory            = '#logoCategory';
var classLogoCategoryBoat   = 'logoCategoryBoat';
var classLogoCategoryCable  = 'logoCategoryCable';
var classLogoCategoryFarm   = 'logoCategoryFarm';
var classLogoCategoryPocket = 'logoCategoryPocket';
var classLogoCategoryPromo  = 'logoCategoryPromo';
var classLogoCategorySos    = 'logoCategorySos';

// var wholesaleInfo = '.wholesaleInfo';

var menuProducts       = '.menuProductList';
var menuProductsBoat   = '#tier1categories_boat__fishing ul';
var menuProductsCable  = '#tier1categories_cable__electrical ul';
var menuProductsFarm   = '#tier1categories_farm__garden ul';
var menuProductsPocket = '#tier1categories_pocket__traditional ul';
var menuProductsPromo  = '#tier1categories_promo__customizing ul';
var menuProductsSos    = '#tier1categories_sos__rescue ul';
var menuSubLists       = '.menuSubList';

var headingCategory  = '.headingsCategory h1';
var classColorBoat   = 'categoryBoat';
var classColorCable  = 'categoryCable';
var classColorFarm   = 'categoryFarm';
var classColorPocket = 'categoryPocket';
var classColorPromo  = 'categoryPromo';
var classColorSos    = 'categorySos';

var headingProductNavcat      = '.headingProductNavcat';
var headingProductSub         = '.headingProductSubCategory';
// var headingProductName        = '.headingsProduct h1';
var headingProductCategory    = '.headingsProduct h3';
var elementsWithCategoryColor = '.categoryColor';
var currentCategory;
var currentNavcat;
var periodCount;

var wholesaleContact = '.contactFormWholesale';
var pdfLinks         = '.pdfLinks';

var headingSubsParent = '.headingSubsParent';

var subcatPrettyLong = '.subcatPrettyLong';
var subcatDescription = '.subcatDescription';

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
  return (value.split(/[.]/) || '').length - 1;
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
  if (temp.charAt(0) == ('!')) {
    temp = temp.replace(/!/, '');
  }
  return temp;
}

function getPretty(navcat) {
  if (app.data['appCategoryDetail|' + navcat] && app.data['appCategoryDetail|' + navcat]['pretty']) {
    return prettyNames[navcat] || (prettyNames[navcat] = fixHiddenPretty(app.data['appCategoryDetail|' + navcat]['pretty']) || '');
  }
  return '';
}

function getPdfLinks() {
  // creates content for the pdf catalogs category
  var page = "<h4>Click link below to download</h4>";
  var directory = pdfDirectory || '';
  var name;
  var value;
  for(var key in pdfData) {
    name = getPretty(key);
    link  = name + ' PDF Catalog';
    value = pdfData[key];
    if (value) {
      page += "<p><a title='" + link + "' href='" + directory + value + "'>" + name + "</a></p>";
    }
  }
  return page;
}

function getTier1ID(navcat) {
  // replace '.' with '_' and '-' with ''
  var temp = '#tier1categories' + navcat.split(/[.]/).join('_').split(/-/).join('');
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

function resetAllMenuProducts() {
  $(menuSubLists).slideUp(500);
}


function categoryLink (navcat, pretty) {
  var temp = pretty || '';
  return "<a href='#top' title='" + temp + "' onClick='return showContent(\"category\",{\"navcat\":\"" + navcat + "\"});'>" + temp + "</a>";
}

function categoryLinkNoText (navcat, pretty) {
  var temp = pretty || '';
  return "<a href='#top' title='" + temp + "' onClick='return showContent(\"category\",{\"navcat\":\"" + navcat + "\"});'></a>";
}

// function resetCategoryHeading() {
//   $(headingCategory).removeClass();
// }
/// homepage slideshow \\\

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
  resetAllMenuProducts();
  $(banner).addClass(classBannerHome, function () {
    startSlideShow();
  });
  $(sidebar).addClass(sidebarHome);
  $(logoCategory).addClass("displayNone");
}

// jCarousel http://sorgalla.com/projects/jcarousel/

function mycarousel_initCallback(carousel) {
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
    });

    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
    });

    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function() {
        carousel.stopAuto();
    }, function() {
        carousel.startAuto();
    });
}

function startCarouselHome() {
  var $target = $('#homeProdSearchBestSellers');

  if ($target.children().length > 1) {
    $target.jcarousel({
      auto: 3, // Specifies how many seconds to periodically autoscroll the content. If set to 0 (default) then autoscrolling is turned off.
      scroll: 1,
      // visible: 1,
      wrap: 'both', // Specifies whether to wrap at the first/last item (or both) and jump back to the start/end. Options are "first", "last", "both" or "circular" as string. If set to null, wrapping is turned off (default).
      itemFallbackDimension: 300, // has to be image size - If, for some reason, jCarousel can not detect the width of an item, you can set a fallback dimension (width or height, depending on the orientation) here to ensure correct calculations.
      initCallback: mycarousel_initCallback
    });
  }
}

function startCarouselProduct(parentID) {
  var $target = $('#' + parentID + ' .productListProductExtras');

  if ($target.children().length > 3) {
    $target.jcarousel({
      auto: 3, // Specifies how many seconds to periodically autoscroll the content. If set to 0 (default) then autoscrolling is turned off.
      scroll: 1,
      // start: 1,
      // offset: 1,
      // visible: 1,
      wrap: 'both', // Specifies whether to wrap at the first/last item (or both) and jump back to the start/end. Options are "first", "last", "both" or "circular" as string. If set to null, wrapping is turned off (default).
      // itemFallbackDimension: 230, // If, for some reason, jCarousel can not detect the width of an item, you can set a fallback dimension (width or height, depending on the orientation) here to ensure correct calculations.
      initCallback: mycarousel_initCallback
    });
  }
}

/// homepage \\\
app.rq.push(['templateFunction','homepageTemplate','onCompletes',function(P) {
  defaultPage();
  startCarouselHome();
  $('#' + P.parentID + ' .logoCategoryHome').hover(function () {
    $(this).toggleClass('categoryProductHover');
  });
}]);

app.rq.push(['templateFunction','homepageTemplate','onDeparts',function(P) {
  $(logoCategory).removeClass("displayNone");
  // $(sidebar).removeClass(sidebarHome);
  // $(wholesaleInfo).addClass("displayNone");
}]);

/// company \\\
app.rq.push(['templateFunction','companyTemplate','onCompletes',function(P) {
  defaultPage();
}]);

/// customer \\\
app.rq.push(['templateFunction','customerTemplate','onCompletes',function(P) {
  defaultPage();
}]);

///// categories \\\\\
app.rq.push(['templateFunction','categoryTemplate','onCompletes',function(P) {
  // resets
  resetBanner();
  resetCategoryLogo();
  resetAllMenuProducts();

  currentNavcat   = P.navcat;
  currentCategory = getCategory(currentNavcat);

  if (currentNavcat === currentCategory) {
    // category
    $(headingSubsParent).html('').hide();
  }else {
    // sub category
    $(headingSubsParent).html(categoryLink(currentCategory, getPretty(currentCategory)));
  }

  // show category sub in menu
  $(getTier1ID(currentCategory) + ' > ul').slideDown(500);

  //add link to logo
  $(logoCategory).html(categoryLink(currentCategory));

  switch(currentCategory) {
    case categoryBoat:
      $(banner).addClass(classBannerCategoryBoat);
      $(logoCategory).addClass(classLogoCategoryBoat);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorBoat);
      break;
    case categoryCable:
      $(banner).addClass(classBannerCategoryCable);
      $(logoCategory).addClass(classLogoCategoryCable);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorCable);
      break;
    case categoryFarm:
      $(banner).addClass(classBannerCategoryFarm);
      $(logoCategory).addClass(classLogoCategoryFarm);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorFarm);
      break;
    case categoryPocket:
      $(banner).addClass(classBannerCategoryPocket);
      $(logoCategory).addClass(classLogoCategoryPocket);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorPocket);
      break;
    case categoryPromo:
      $(banner).addClass(classBannerCategoryPromo);
      $(logoCategory).addClass(classLogoCategoryPromo);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorPromo);
      break;
    case categorySos:
      $(banner).addClass(classBannerCategorySos);
      $(logoCategory).addClass(classLogoCategorySos);
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorSos);
      break;
    case categoryWholesale:
      defaultPage();
      $(wholesaleContact).show();
      break;
    case categoryPdf:
      defaultPage();
      $(pdfLinks).html(getPdfLinks());
      $(pdfLinks).show();
      break;
    
    default: // wholesale, gsi, testimonials, etc
      defaultPage();
  }
}]);

///// products \\\\\
app.rq.push(['templateFunction','productTemplate','onCompletes',function(P) {
  // resets
  resetBanner();
  resetCategoryLogo();
  resetAllMenuProducts();
  
  // app.u.dump([P]);
  // app.u.dump($(headingProductNavcat, '#' + P.parentID).html());
  currentNavcat   = $(headingProductNavcat, '#' + P.parentID).html();
  currentCategory = getCategory(currentNavcat);
  // currentSub      = getCategory(currentNavcat, 1);

  // show category sub in menu
  $(getTier1ID(currentCategory) + ' > ul').slideDown();

  // carousels
  startCarouselProduct(P.parentID);

  switch(currentCategory) {
    case categoryBoat:
      // set pretty for when loading dirctly to product
      // if (prettyBoat === undefined) {
      //   prettyBoat = getPretty(categoryBoat);
      // }
      $(banner).addClass(classBannerCategoryBoat);
      $(logoCategory).addClass(classLogoCategoryBoat);
      // $(menuProductsBoat).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorBoat);
      // $(headingProductCategory).html(categoryLink(categoryBoat, prettyBoat));
      break;
    case categoryCable:
      // if (prettyCable === undefined) {
      //   prettyCable = getPretty(categoryCable);
      // }
      $(banner).addClass(classBannerCategoryCable);
      $(logoCategory).addClass(classLogoCategoryCable);
      // $(menuProductsCable).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorCable);
      // $(headingProductCategory).html(categoryLink(categoryCable, prettyCable));
      break;
    case categoryFarm:
      // if (prettyFarm === undefined) {
      //   prettyFarm = getPretty(categoryFarm);
      // }
      $(banner).addClass(classBannerCategoryFarm);
      $(logoCategory).addClass(classLogoCategoryFarm);
      // $(menuProductsFarm).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorFarm);
      // $(headingProductCategory).html(categoryLink(categoryFarm, prettyFarm));
      break;
    case categoryPocket:
      // if (prettyPocket === undefined) {
      //   prettyPocket = getPretty(categoryPocket);
      // }
      $(banner).addClass(classBannerCategoryPocket);
      $(logoCategory).addClass(classLogoCategoryPocket);
      // $(menuProductsPocket).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorPocket);
      // $(headingProductCategory).html(categoryLink(categoryPocket, prettyPocket));
      break;
    case categoryPromo:
      // if (prettyPromo === undefined) {
      //   prettyPromo = getPretty(categoryPromo);
      // }
      $(banner).addClass(classBannerCategoryPromo);
      $(logoCategory).addClass(classLogoCategoryPromo);
      // $(menuProductsPromo).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorPromo);
      // $(headingProductCategory).html(categoryLink(categoryPromo, prettyPromo));
      break;
    case categorySos:
      // if (prettySos === undefined) {
      //   prettySos = getPretty(categorySos);
      // }
      $(banner).addClass(classBannerCategorySos);
      $(logoCategory).addClass(classLogoCategorySos);
      // $(menuProductsSos).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorSos);
      // $(headingProductCategory).html(categoryLink(categorySos, prettySos));
      break;
    default:
      defaultPage();
  }
}]);

///// end custom \\\\\

//group any third party files together (regardless of pass) to make troubleshooting easier.
app.rq.push(['script',0,(document.location.protocol == 'https:' ? 'https:' : 'http:')+'//ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/jquery-ui.js']);


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
    }
  else if(attempts > 50)  {
    app.u.dump("WARNING! something went wrong in init.js");
    //this is 10 seconds of trying. something isn't going well.
    $('#appPreView').empty().append("<h2>Uh Oh. Something seems to have gone wrong. </h2><p>Several attempts were made to load the store but some necessary files were not found or could not load. We apologize for the inconvenience. Please try 'refresh' and see if that helps.<br><b>If the error persists, please contact the site administrator</b><br> - dev: see console.</p>");
    app.u.howManyPassZeroResourcesAreLoaded(true);
    }
  else  {
    setTimeout("app.u.initMVC("+(attempts+1)+")",250);
  }
};



//Any code that needs to be executed after the app init has occured can go here.
//will pass in the page info object. (pageType, templateID, pid/navcat/show and more)
app.u.appInitComplete = function(P) {
  // app.u.dump("Executing myAppIsLoaded code...");

  // Add accessores & promo to menu
  $('#tier1categories').append("<li id='tier1categories_accessories'>" + categoryLink(categoryAccessories, getPretty(categoryAccessories)) + "</li>");
  $('#tier1categories').append("<li id='tier1categories_promo__customizing'>" + categoryLink(categoryPromo, getPretty(categoryPromo)) + "</li>");
};




//don't execute script till both jquery AND the dom are ready.
$(document).ready(function(){
  app.u.handleRQ(0);


  // Pre load images
  $('.preload').hide();
});