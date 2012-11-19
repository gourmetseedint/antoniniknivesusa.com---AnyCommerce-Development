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

///// homepage slideshow \\\\\

//cycle used for slideshow
app.rq.push(['script',0,app.vars.baseURL+'cycle.js']);

//add slideshow to homepage.
app.rq.push(['templateFunction','homepageTemplate','onCompletes',function(P) {
  var $target = $('#wideSlideshow');
  if($target.children().length > 1) {
    $('#wideSlideshow').cycle({
      fx:'fade',
      speed:'slow',
      timeout: 5000,
      pager:'#slideshowNav',
      slideExpr: 'li'
    });
  }
}]);

// TODO: maybe add all backgrounds/logos then remove them while loading, so each cat loads faster

///// variables \\\\\
var navcatBoat   = ".boat_-_fishing";
var navcatCable  = ".cable_-_electrical";
var navcatFarm   = ".farm_-_garden";
var navcatPocket = ".pocket_-_traditional";
var navcatPromo  = ".promo_-_customizing";
var navcatSos    = ".sos_-_rescue";

var banner                    = "header";
var classBannerHome           = "bannerHome";
var classBannerCategoryBoat   = "bannerCategoryBoat";
var classBannerCategoryCable  = "bannerCategoryCable";
var classBannerCategoryFarm   = "bannerCategoryFarm";
var classBannerCategoryPocket = "bannerCategoryPocket";
var classBannerCategoryPromo  = "bannerCategoryPromo";
var classBannerCategorySos    = "bannerCategorySos";

var logoCategory            = "#logoCategory";
var classLogoCategoryBoat   = "logoCategoryBoat";
var classLogoCategoryCable  = "logoCategoryCable";
var classLogoCategoryFarm   = "logoCategoryFarm";
var classLogoCategoryPocket = "logoCategoryPocket";
var classLogoCategoryPromo  = "logoCategoryPromo";
var classLogoCategorySos    = "logoCategorySos";

var wholesaleInfo = ".wholesaleInfo";

var menuProducts       = ".menuProductList";
var menuProductsBoat   = "#tier1categories_boat__fishing ul";
var menuProductsCable  = "#tier1categories_cable__electrical ul";
var menuProductsFarm   = "#tier1categories_farm__garden ul";
var menuProductsPocket = "#tier1categories_pocket__traditional ul";
var menuProductsPromo  = "#tier1categories_promo__customizing ul";
var menuProductsSos    = "#tier1categories_sos__rescue ul";

var breadcrumb          = ".breadcrumb li:last-child";
var breadcrumbCatBoat   = "breadcrumbCatBoat";
var breadcrumbCatCable  = "breadcrumbCatCable";
var breadcrumbCatFarm   = "breadcrumbCatFarm";
var breadcrumbCatPocket = "breadcrumbCatPocket";
var breadcrumbCatPromo  = "breadcrumbCatPromo";
var breadcrumbCatSos    = "breadcrumbCatSos";

var lastBreadcrumbClass;

// classBlock = 'classBlock';

// app.u.dump([P]);

function resetBanner() {
  $(banner).removeClass();
}

function resetCategoryLogo() {
  $(logoCategory).removeClass();
}

function resetAllMenuProducts() {
  $(menuProducts).addClass('displayNone');
}

function resetBreadcrumb() {
  $(breadcrumb).removeClass();
}

// resetAllMenuProducts();

///// homepage \\\\\
app.rq.push(['templateFunction','homepageTemplate','onCompletes',function(P) {
  resetBanner();
  resetAllMenuProducts();
  $(banner).addClass(classBannerHome);
  $(logoCategory).addClass("displayNone");
  // $(wholesaleInfo).removeClass("displayNone");
}]);
app.rq.push(['templateFunction','homepageTemplate','onDeparts',function(P) {
  $(logoCategory).removeClass("displayNone");
  // $(wholesaleInfo).addClass("displayNone");
}]);


///// categories \\\\\
app.rq.push(['templateFunction','categoryTemplate','onCompletes',function(P) {
  // app.u.dump([P]);

  // Boat
  if (P.navcat == navcatBoat) {
    resetBanner();
    resetCategoryLogo();
    resetAllMenuProducts();
    resetBreadcrumb();
    $(banner).addClass(classBannerCategoryBoat);
    $(logoCategory).addClass(classLogoCategoryBoat);
    $(menuProductsBoat).removeClass('displayNone');
    $(breadcrumb).addClass(breadcrumbCatBoat);
    lastBreadcrumbClass = breadcrumbCatBoat;
  }

  // Cable
  if (P.navcat == navcatCable) {
    resetBanner();
    resetCategoryLogo();
    resetAllMenuProducts();
    resetBreadcrumb();
    $(banner).addClass(classBannerCategoryCable);
    $(logoCategory).addClass(classLogoCategoryCable);
    $(menuProductsCable).removeClass('displayNone');
    $(breadcrumb).addClass(breadcrumbCatCable);
    lastBreadcrumbClass = breadcrumbCatCable;
  }

  // Farm
  if (P.navcat == navcatFarm) {
    resetBanner();
    resetCategoryLogo();
    resetAllMenuProducts();
    resetBreadcrumb();
    $(banner).addClass(classBannerCategoryFarm);
    $(logoCategory).addClass(classLogoCategoryFarm);
    $(menuProductsFarm).removeClass('displayNone');
    $(breadcrumb).addClass(breadcrumbCatFarm);
    lastBreadcrumbClass = breadcrumbCatFarm;
  }

  // Pocket
  if (P.navcat == navcatPocket) {
    resetBanner();
    resetCategoryLogo();
    resetAllMenuProducts();
    resetBreadcrumb();
    $(banner).addClass(classBannerCategoryPocket);
    $(logoCategory).addClass(classLogoCategoryPocket);
    $(menuProductsPocket).removeClass('displayNone');
    $(breadcrumb).addClass(breadcrumbCatPocket);
    lastBreadcrumbClass = breadcrumbCatPocket;
  }

  // Promo
  if (P.navcat == navcatPromo) {
    resetBanner();
    resetCategoryLogo();
    resetAllMenuProducts();
    resetBreadcrumb();
    $(banner).addClass(classBannerCategoryPromo);
    $(logoCategory).addClass(classLogoCategoryPromo);
    $(menuProductsPromo).removeClass('displayNone');
    $(breadcrumb).addClass(breadcrumbCatPromo);
    lastBreadcrumbClass = breadcrumbCatPromo;
  }

  // Sos
  if (P.navcat == navcatSos) {
    resetBanner();
    resetCategoryLogo();
    resetAllMenuProducts();
    resetBreadcrumb();
    $(banner).addClass(classBannerCategorySos);
    $(logoCategory).addClass(classLogoCategorySos);
    $(menuProductsSos).removeClass('displayNone');
    $(breadcrumb).addClass(breadcrumbCatSos);
    lastBreadcrumbClass = breadcrumbCatSos;
  }
}]);

///// products \\\\\
app.rq.push(['templateFunction','productTemplate','onCompletes',function(P) {
  // app.u.dump([P]);
  // TODO: find better way to find product category
  $(breadcrumb).addClass(lastBreadcrumbClass);
  // resetAllMenuProducts();
  // TODO: add product's category bg and logo
  // TODO: show category's product list in menu
  // BUG: when cat skipped, breadcrumb missing
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
  }


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

  }



//Any code that needs to be executed after the app init has occured can go here.
//will pass in the page info object. (pageType, templateID, pid/navcat/show and more)
app.u.appInitComplete = function(P) {
  app.u.dump("Executing myAppIsLoaded code...");
  }




//don't execute script till both jquery AND the dom are ready.
$(document).ready(function(){
  app.u.handleRQ(0)
  });






