/*
Antonini Extension
*/

var antoniniknives_extension = function() {

  // tells you if navcat is for a category or sub
  var getPeriodCount = function(value) {
    return (value.split(/[.]/) || '').length - 1;
  };

  // returns you the category navcat
  // subLevel: 0(default) is category, 1 is first sub, etc.
  var getCategory = function(navcat, subLevel) {
    var periodCount = getPeriodCount(navcat);
    var level = (subLevel || 0) + 1;
    var value = '';

    if (periodCount > 0) {
      value = navcat.split('.')[level];
      if (value) {
        value = '.' + value;
      }
    }
    return value;
  };

  // functions for render formats
  var getValueFromSubcatData = function (navcat, field) {
    var value;
    var category = getCategory(navcat);
    var subCategory = getCategory(navcat, 1);

    // get json value
    if(category && subCategory && subcatData[category] && subcatData[category][subCategory] && subcatData[category][subCategory][field]){
      value = subcatData[category][subCategory][field];
    }

    return value;
  };

  var categoryLink = function(navcat, pretty) {
    return "<a href='#top' title='" + pretty + "' onClick='return showContent(\"category\",{\"navcat\":\"" + navcat + "\"});'>" + pretty + "</a>";
  };

  var getPretty = function(navcat) {
    return fixHiddenPretty(app.data['appCategoryDetail|' + navcat]['pretty']);
  };

  var r = {
    vars : {
      catPrettyNames : {}
      // forgetmeContainer : {} //used to store an object of pids (key) for items that don't show in the prodlist. value can be app specific. TS makes sense.
      },
    calls : {}, //calls
    callbacks : {
      //callbacks.init need to return either a true or a false, depending on whether or not the file will execute properly based on store account configuration.
      init : {
        onSuccess : function() {
          // app.u.dump('antoniniknives_extension callback success');
          // app.rq.push(['script',0,app.vars.baseURL+'_antoniniknives_subcatData.js']);
          return true;  //currently, there are no config or extension dependencies, so just return true. may change later.
        },
        onError : function() {
          app.u.dump('antoniniknives_extension callback error');
          return false;
          }
        }
    }, //callbacks

    renderFormats : {
      subcat_pretty_long : function ($tag, data) {
        var value = getValueFromSubcatData(data.value, 'prettyLong');
        // change text to json value
        // must be called from a child (span inside of a heading)
        if (value) {
          $tag.parent().html(value);
        }else {
          $tag.html('');
        }
      },

      subcat_pretty_long_link : function ($tag, data) {
        var navcat = data.value;
        var value = getValueFromSubcatData(navcat, 'prettyLong');
        // change text to json value
        // must be called from a child (span inside of a heading)
        if (value) {
          $tag.parent().html(categoryLink(navcat, value));
        }else {
          $tag.html('');
        }
      },

      // subcat_category_link : function ($tag, data) {
      //   var navcat = getCategory(data.value);
      //   var value = getValueFromSubcatData(navcat, 'prettyLong');
      //   // change text to json value
      //   $tag.html(categoryLink(navcat, value));
      // },

      subcat_description : function ($tag, data) {
        var value = getValueFromSubcatData(data.value, 'description') || '';
        // change text to json value
        $tag.html(value);
      },

      product_headings : function ($tag, data) {
        var navcat     = data.value;
        var category   = getCategory(navcat);
        var subCatLong = getValueFromSubcatData(navcat, 'prettyLong');
        var catPretty  = r.vars.catPrettyNames[category] || (r.vars.catPrettyNames[category] = getPretty(category)); // stash pretty name in object if undefined
        var linkHome   = "<h2><a href='#top' onClick=\"return showContent('category',{'navcat':'.'});\">Antonini:</a></h2>";
        var link       = linkHome;

        if (navcat && subCatLong && category && catPretty) {
          // product resides in a sub category
          link += "<h1 class='headingProductSubCategory categoryColor'>" + categoryLink(navcat, subCatLong) + "<h1>";
          link += "<h3 class='headingProductCategory'>" + categoryLink(category, catPretty) + "</h3>";
        }else if(category && catPretty) {
          // product resides in top category
          link += "<h1 class='headingProductSubCategory categoryColor'>" + categoryLink(category, catPretty) + "<h1>";
        }
        $tag.html(link);
      },

      category_headings : function ($tag, data) {
        var navcat     = data.value;
        var category   = getCategory(navcat);
        var subCategory = getCategory(navcat, 1);
        var subCatLong = getValueFromSubcatData(navcat, 'prettyLong');
        var catPretty  = r.vars.catPrettyNames[category] || (r.vars.catPrettyNames[category] = getPretty(category)); // stash pretty name in object if undefined
        var linkHome   = "<h2><a href='#top' onClick=\"return showContent('category',{'navcat':'.'});\">Antonini:</a></h2>";
        var link       = linkHome;

        if (navcat && subCatLong) {
          // on a sub category
          link += "<h1 class='categoryColor'>" + subCatLong + "<h1>";

          if (category && catPretty) {
            link += "<h3 class='headingSubsParent'>" + categoryLink(category, catPretty) + "</h3>";
          }
        }else if(catPretty) {
          // on a primary category
          link += "<h1 class='categoryColor'>" + catPretty + "</h1>";
        }

        $tag.html(link);
      }

      // pdfLinks : function ($tag, data) {
      //   $tag.html('stuff');
      // }
    } // renderformats
  }; //r object.
  return r;
};