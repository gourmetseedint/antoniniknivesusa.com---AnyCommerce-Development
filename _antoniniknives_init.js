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
app.rq.push(['extension',0,'myRIA','quickstart.js','startMyProgram']);

app.rq.push(['extension',1,'analytics_google','extensions/analytics_google.js','addTriggers']);
//app.rq.push(['extension',1,'bonding_buysafe','extensions/bonding_buysafe.js','addTriggers']);
//app.rq.push(['extension',1,'powerReviews','extensions/reviews_powerreviews.js','startExtension']);
//app.rq.push(['extension',0,'magicToolBox','extensions/imaging_magictoolbox.js','startExtension']); // (not working yet - ticket in to MTB)



// add tabs to product data.
app.rq.push(['templateFunction','productTemplate','onCompletes',function(P) {
  $( ".tabbedProductContent",$('#productTemplate_'+app.u.makeSafeHTMLId(P.pid))).tabs();
}]);
app.rq.push(['script',0,(document.location.protocol == 'file:') ? app.vars.httpURL+'jquery/config.js' : app.vars.baseURL+'jquery/config.js']); //The config.js is dynamically generated.
app.rq.push(['script',0,app.vars.baseURL+'model.js']); //'validator':function(){return (typeof zoovyModel == 'function') ? true : false;}}
app.rq.push(['script',0,app.vars.baseURL+'includes.js']); //','validator':function(){return (typeof handlePogs == 'function') ? true : false;}})
app.rq.push(['script',1,app.vars.baseURL+'jeditable.js']); //used for making text editable (customer address). non-essential. loaded late.
app.rq.push(['script',0,app.vars.baseURL+'controller.js']);

//sample of an onDeparts. executed any time a user leaves this page/template type.
// app.rq.push(['templateFunction','homepageTemplate','onDeparts',function(P) {app.u.dump("just left the homepage")}]);

///// custom \\\\\

/// variables \\\
var categoryBoat   = '.boat_-_fishing';
var categoryCable  = '.cable_-_electrical';
var categoryFarm   = '.farm_-_garden';
var categoryPocket = '.pocket_-_traditional';
var categoryPromo  = '.promo_-_customizing';
var categorySos    = '.sos_-_rescue';

var prettyBoat;
var prettyCable;
var prettyFarm;
var prettyPocket;
var prettyPromo;
var prettySos;

// var prettyBoat   = titlize(categoryBoat);
// var prettyCable  = titlize(categoryCable);
// var prettyFarm   = titlize(categoryFarm);
// var prettyPocket = titlize(categoryPocket);
// var prettyPromo  = titlize(categoryPromo);
// var prettySos    = titlize(categorySos);

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
var menuSubLists = '.menuSubList';

var headingCategory     = '.headingsCategory h1';
var classColorBoat   = 'categoryBoat';
var classColorCable  = 'categoryCable';
var classColorFarm   = 'categoryFarm';
var classColorPocket = 'categoryPocket';
var classColorPromo  = 'categoryPromo';
var classColorSos    = 'categorySos';

var headingProductNavcat         = '.headingProductNavcat';
// var headingProductName           = '.headingsProduct h1';
var headingProductCategory       = '.headingsProduct h3';
var headingProductCategoryPretty = 'Temp Pretty'; // QUE: How should I get the pretty name from the navcat?  Can I use category(pretty)?
var elementsWithCategoryColor    = '.categoryColor';
var currentCategory;
var currentNavcat;
var periodCount;

var headingSubsParent = '.headingSubsParent';

// var lastBreadcrumbClass;

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

function navcatToPretty(navcat) {
  // only works from a rq.push
  var temp;
  temp = app.data['appCategoryDetail|' + navcat]['pretty'];
  return temp;
}

function navcatToTier1ID(navcat) {
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
  $(menuSubLists).addClass('displayNone');
}

function defaultPage() {
  resetBanner();
  resetAllMenuProducts();
  $(banner).addClass(classBannerHome);
  startSlideShow();
  $(sidebar).addClass(sidebarHome);
  $(logoCategory).addClass("displayNone");
}

// function resetCategoryHeading() {
//   $(headingCategory).removeClass();
// }
/// homepage slideshow \\\

function startSlideShow() {
  var $target = $('#wideSlideshow');
  $(slideshow).removeClass('displayNone');
  if($target.children().length > 1) {
    $('#wideSlideshow').cycle({
      fx:'fade',
      speed:'slow',
      timeout: 5000,
      pager:'#slideshowNav',
      slideExpr: 'li'
    });
  }
}

//cycle used for slideshow
app.rq.push(['script',0,app.vars.baseURL+'cycle.js']);


// TODO: maybe add all backgrounds/logos then remove them while loading, so each cat loads faster
// TODO: hide menu products when leaving category/product or entering company/customer/other cats


/// homepage \\\
app.rq.push(['templateFunction','homepageTemplate','onCompletes',function(P) {
  defaultPage();
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
  // app.u.dump([P]);

  currentNavcat = P.navcat;
  periodCount   = (currentNavcat.split(/[.]/) || '').length - 1;
  
  // resets
  resetBanner();
  resetCategoryLogo();
  resetAllMenuProducts();

  if (periodCount === 1) {
    // catgories
    currentCategory = P.navcat;
    $(headingSubsParent).html('');
  } else if (periodCount === 2) {
    // sub categories
    currentCategory = currentNavcat.substring(0, currentNavcat.lastIndexOf('.'));
    $(headingSubsParent).html("<a href='#top' onClick='return showContent(\"category\",{\"navcat\":\"" + currentCategory + "\"});'>" + navcatToPretty(currentCategory) + "</a>");
  }

  // $(headingSubCategory).html('asdf');
  // show category sub in menu
  $(navcatToTier1ID(currentCategory) + ' > ul').show();

  // app.u.dump([navcatToTier1ID(P.navcat)]);



  switch(currentCategory) {
    case categoryBoat:
      // resetBanner();
      // resetCategoryLogo();
      // resetAllMenuProducts();
      // resetCategoryHeading();
      $(banner).addClass(classBannerCategoryBoat);
      $(logoCategory).addClass(classLogoCategoryBoat);
      // $(menuProductsBoat).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorBoat);
      break;
    case categoryCable:
      // resetBanner();
      // resetCategoryLogo();
      // resetAllMenuProducts();
      // resetCategoryHeading();
      $(banner).addClass(classBannerCategoryCable);
      $(logoCategory).addClass(classLogoCategoryCable);
      // $(menuProductsCable).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorCable);
      break;
    case categoryFarm:
      // resetBanner();
      // resetCategoryLogo();
      // resetAllMenuProducts();
      // resetCategoryHeading();
      $(banner).addClass(classBannerCategoryFarm);
      $(logoCategory).addClass(classLogoCategoryFarm);
      // $(menuProductsFarm).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorFarm);
      break;
    case categoryPocket:
      // resetBanner();
      // resetCategoryLogo();
      // resetAllMenuProducts();
      // resetCategoryHeading();
      $(banner).addClass(classBannerCategoryPocket);
      $(logoCategory).addClass(classLogoCategoryPocket);
      // $(menuProductsPocket).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorPocket);
      break;
    case categoryPromo:
      // resetBanner();
      // resetCategoryLogo();
      // resetAllMenuProducts();
      // resetCategoryHeading();
      $(banner).addClass(classBannerCategoryPromo);
      $(logoCategory).addClass(classLogoCategoryPromo);
      // $(menuProductsPromo).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorPromo);
      break;
    case categorySos:
      // resetBanner();
      // resetCategoryLogo();
      // resetAllMenuProducts();
      // resetCategoryHeading();
      $(banner).addClass(classBannerCategorySos);
      $(logoCategory).addClass(classLogoCategorySos);
      // $(menuProductsSos).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorSos);
      break;
    default:
      defaultPage();
  }
}]);

///// products \\\\\
// TODO: add pretty name for each category
app.rq.push(['templateFunction','productTemplate','onCompletes',function(P) {
  // resets
  resetBanner();
  resetCategoryLogo();
  resetAllMenuProducts();
  
  // app.u.dump([P]);
  // app.u.dump($(headingProductNavcat, '#' + P.parentID).html());
  currentCategory = $(headingProductNavcat, '#' + P.parentID).html();

  // show category sub in menu
  $(navcatToTier1ID(currentCategory) + ' > ul').removeClass('displayNone');

  switch(currentCategory) {
    case categoryBoat:
      // set pretty for when loading dirctly to product
      if (prettyBoat === undefined) {
        prettyBoat = navcatToPretty(categoryBoat);
      }
      // resetBanner();
      // resetCategoryLogo();
      // resetAllMenuProducts();
      // resetCategoryHeading();
      $(banner).addClass(classBannerCategoryBoat);
      $(logoCategory).addClass(classLogoCategoryBoat);
      // $(menuProductsBoat).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorBoat);
      // $(headingProductCategory).html(headingProductCategoryPretty);
      $(headingProductCategory).html("<a href='#top' onClick='return showContent(\"category\",{\"navcat\":\"" + categoryBoat + "\"});'>" + prettyBoat + "</a>");
      break;
    case categoryCable:
      if (prettyCable === undefined) {
        prettyCable = navcatToPretty(categoryCable);
      }
      // resetBanner();
      // resetCategoryLogo();
      // resetAllMenuProducts();
      // resetCategoryHeading();
      $(banner).addClass(classBannerCategoryCable);
      $(logoCategory).addClass(classLogoCategoryCable);
      // $(menuProductsCable).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorCable);
      // $(headingProductCategory).html(headingProductCategoryPretty);
      $(headingProductCategory).html("<a href='#top' onClick='return showContent(\"category\",{\"navcat\":\"" + categoryCable + "\"});'>" + prettyCable + "</a>");
      break;
    case categoryFarm:
      if (prettyFarm === undefined) {
        prettyFarm = navcatToPretty(categoryFarm);
      }
      // resetBanner();
      // resetCategoryLogo();
      // resetAllMenuProducts();
      // resetCategoryHeading();
      $(banner).addClass(classBannerCategoryFarm);
      $(logoCategory).addClass(classLogoCategoryFarm);
      // $(menuProductsFarm).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorFarm);
      // $(headingProductCategory).html(headingProductCategoryPretty);
      $(headingProductCategory).html("<a href='#top' onClick='return showContent(\"category\",{\"navcat\":\"" + categoryFarm + "\"});'>" + prettyFarm + "</a>");
      break;
    case categoryPocket:
      if (prettyPocket === undefined) {
        prettyPocket = navcatToPretty(categoryPocket);
      }
      // resetBanner();
      // resetCategoryLogo();
      // resetAllMenuProducts();
      // resetCategoryHeading();
      $(banner).addClass(classBannerCategoryPocket);
      $(logoCategory).addClass(classLogoCategoryPocket);
      // $(menuProductsPocket).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorPocket);
      // $(headingProductCategory).html(headingProductCategoryPretty);
      $(headingProductCategory).html("<a href='#top' onClick='return showContent(\"category\",{\"navcat\":\"" + categoryPocket + "\"});'>" + prettyPocket + "</a>");
      break;
    case categoryPromo:
      if (prettyPromo === undefined) {
        prettyPromo = navcatToPretty(categoryPromo);
      }
      // resetBanner();
      // resetCategoryLogo();
      // resetAllMenuProducts();
      // resetCategoryHeading();
      $(banner).addClass(classBannerCategoryPromo);
      $(logoCategory).addClass(classLogoCategoryPromo);
      // $(menuProductsPromo).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorPromo);
      // $(headingProductCategory).html(headingProductCategoryPretty);
      $(headingProductCategory).html("<a href='#top' onClick='return showContent(\"category\",{\"navcat\":\"" + categoryPromo + "\"});'>" + prettyPromo + "</a>");
      break;
    case categorySos:
      if (prettySos === undefined) {
        prettySos = navcatToPretty(categorySos);
      }
      // resetBanner();
      // resetCategoryLogo();
      // resetAllMenuProducts();
      // resetCategoryHeading();
      $(banner).addClass(classBannerCategorySos);
      $(logoCategory).addClass(classLogoCategorySos);
      // $(menuProductsSos).removeClass('displayNone');
      $(elementsWithCategoryColor, '#' + P.parentID).addClass(classColorSos);
      // $(headingProductCategory).html(headingProductCategoryPretty);
      $(headingProductCategory).html("<a href='#top' onClick='return showContent(\"category\",{\"navcat\":\"" + categorySos + "\"});'>" + prettySos + "</a>");
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

  // get pretty names for product pages
  // BUG: appInitComplete runs after productTemplate onCompletez
  // prettyBoat   = navcatToPretty(categoryBoat);
  // prettyCable  = navcatToPretty(categoryCable);
  // prettyFarm   = navcatToPretty(categoryFarm);
  // prettyPocket = navcatToPretty(categoryPocket);
  // prettyPromo  = navcatToPretty(categoryPromo);
  // prettySos    = navcatToPretty(categorySos);

  // Pre load images
  // $(banner).addClass(classBannerHome);
  // $(banner).addClass(classBannerCategoryBoat);
  // $(banner).addClass(classBannerCategoryCable);
  // $(banner).addClass(classBannerCategoryFarm);
  // $(banner).addClass(classBannerCategoryPocket);
  // $(banner).addClass(classBannerCategoryPromo);
  // $(banner).addClass(classBannerCategorySos);
  // resetBanner();
};




//don't execute script till both jquery AND the dom are ready.
$(document).ready(function(){
  app.u.handleRQ(0);

  // Pre load images
  $(banner).addClass(classBannerCategoryBoat);
  $(banner).addClass(classBannerCategoryCable);
  $(banner).addClass(classBannerCategoryFarm);
  $(banner).addClass(classBannerCategoryPocket);
  $(banner).addClass(classBannerCategoryPromo);
  $(banner).addClass(classBannerCategorySos);
  $(banner).addClass(classBannerHome);
  // resetBanner();
  // startSlideShow();
});