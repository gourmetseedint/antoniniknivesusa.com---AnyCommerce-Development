/*
Antonini Extension
*/
var antoniniknives_extension = function() {
  var r = {
    vars : {
      catPrettyNames : {},

      subcatProducts : {},

      getPeriodCount : function(value) {
        // tells you if navcat is for a category or sub
        if (value) {
          return value.split('.').length - 1;
        }else {
          return 0;
        }
      },

      getCategory : function(navcat, subLevel) {
        var periodCount = r.vars.getPeriodCount(navcat);
        var level = (subLevel || 0) + 1;
        var value = '';

        if (periodCount > 0) {
          value = navcat.split('.')[level];
          if (value) {
            value = '.' + value;
          }
        }
        return value;
      },

      categoryLink : function(navcat, pretty) {
        return "<a href='#top' title='" + pretty + "' onClick='return showContent(\"category\",{\"navcat\":\"" + navcat + "\"});'>" + pretty + "</a>";
      },

      getValueFromSubcatData : function (navcat, field) {
        var value       = '';
        var category    = r.vars.getCategory(navcat);
        var subCategory = r.vars.getCategory(navcat, 1);

        // get json value
        if(typeof subcatData != 'undefined') {
          if(category && subCategory && subcatData[category] && subcatData[category][subCategory] && subcatData[category][subCategory][field]){
            value = subcatData[category][subCategory][field];
          }else if (category && subcatData[category] && subcatData[category][field]) {
            value = subcatData[category][field];
          }else {
            app.u.dump("Warning: subcatData entry for " + navcat + "[" + field + "]" + " is missing");
          }
        }else {
          app.u.dump("Warning: subcatData is missing");
        }

        return value;
      },

      fixHiddenPretty : function (pretty) {
        var temp = pretty;
        if (temp.charAt(0) == ('!')) {
          temp = temp.replace(/!/, '');
        }
        return temp;
      },

      getPretty : function (navcat) {
        var temp;
        if (typeof r.vars.catPrettyNames != 'undefined') {
          temp = r.vars.catPrettyNames[navcat];
          if (temp) {
            // app.u.dump('using cached pretty');
            return temp;
          }else if (app.data['appCategoryDetail|' + navcat] && (temp = app.data['appCategoryDetail|' + navcat]['pretty'])) {
            // app.u.dump('getting pretty');
            return (r.vars.catPrettyNames[navcat] = r.vars.fixHiddenPretty(temp) || '');
          }else {
            app.u.dump("Warning: pretty name for " + navcat + " not found.");
            return '';
          }
        }else {
          app.u.dump("Warning: catPrettyNames is undefined");
        }
      },
      
      getCategoryDescription : function (navcat) {
        var description = '';
        var image;
        var paragraph;
        var imageClass = '';
        var imageDirectory;

        if (navcat) {
          if(typeof catData != 'undefined') {
            if (catData[navcat]) {
              imageDirectory = catData.imageDirectory || '';
              imageClass     = 'categoryImageEven';
              for (var i = 0; i < catData[navcat].length; i++) {
                // iterates for array and adds image and description if they exist
                description += "<div>";
                image       = catData[navcat][i].image;
                paragraph   = catData[navcat][i].paragraph;
                if (image) {
                  imageClass = (imageClass == 'categoryImageEven') ? 'categoryImageOdd' : 'categoryImageEven';
                  description += "<div class='categoryImage " + imageClass +"'><img alt='Category Image' src='" + imageDirectory + image + "'></img></div>";
                }
                if (paragraph) {
                  description += "<p>" + paragraph + "</p>";
                }
                description += "</div>";
              }
            }else {
              app.u.dump("Warning: catData description is missing for:" + (navcat || ''));
            }
          }else {
            app.u.dump("Warning: catData is undefined");
          }
        }
        return description;
      }
    },

    calls : {}, //calls

    callbacks : {
      //callbacks.init need to return either a true or a false, depending on whether or not the file will execute properly based on store account configuration.
      init : {
        onSuccess : function() {
          // app.u.dump('antoniniknives_extension callback success');
          // app.rq.push(['script',0,app.vars.baseURL+'_antoniniknives_subcatData.js']);
          // app.rq.push(['script',0,app.vars.baseURL+'_antoniniknives_catData.js']);
          return true;  //currently, there are no config or extension dependencies, so just return true. may change later.
        },
        onError : function() {
          app.u.dump('antoniniknives_extension callback error');
          }
        }
    }, //callbacks

    renderFormats : {
      subcat_pretty_long : function ($tag, data) {
        var value = r.vars.getValueFromSubcatData(data.value, 'prettyLong');
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
        var value = r.vars.getValueFromSubcatData(navcat, 'prettyLong');
        // change text to json value
        // must be called from a child (span inside of a heading)
        if (value) {
          $tag.parent().html(r.vars.categoryLink(navcat, value));
        }else {
          $tag.html('');
        }
      },

      // subcat_category_link : function ($tag, data) {
      //   var navcat = getCategory(data.value);
      //   var value = r.vars.getValueFromSubcatData(navcat, 'prettyLong');
      //   // change text to json value
      //   $tag.html(r.vars.categoryLink(navcat, value));
      // },

      subcat_description : function ($tag, data) {
        var value = r.vars.getValueFromSubcatData(data.value, 'description') || '';
        // change text to json value
        $tag.html(value);
      },

      product_headings : function ($tag, data) {
        var navcat     = data.value;
        var category   = r.vars.getCategory(navcat);
        var subCategory = r.vars.getCategory(navcat, 1);
        var subCatLong;
        // var subCatLong = r.vars.getValueFromSubcatData(navcat, 'prettyLong');
        var catPretty  = r.vars.getPretty(category);
        var linkHome   = "<h2><a href='#top' onClick=\"return showContent('homepage', {});\">Antonini:</a></h2>";
        var link       = linkHome;

        if (subCategory) {
          // on a subcategory
          subCatLong = r.vars.getValueFromSubcatData(navcat, 'prettyLong');
          if (!subCatLong) {
            app.u.dump("Warning: trying " + navcat + "'s pretty name");
            subCatLong = r.vars.getPretty(navcat);
          }
        }

        if (navcat && subCatLong && category && catPretty) {
          // product resides in a sub category
          // app.u.dump('on a sub');
          link += "<h1 class='headingProductSubCategory categoryColor'>" + r.vars.categoryLink(navcat, subCatLong) + "<h1>";
          link += "<h3 class='headingProductCategory'>" + r.vars.categoryLink(category, catPretty) + "</h3>";
        }else if(category && catPretty) {
          // product resides in top category
          // app.u.dump('on a top');
          link += "<h1 class='headingProductSubCategory categoryColor'>" + r.vars.categoryLink(category, catPretty) + "<h1>";
        }
        $tag.html(link);
      },

      category_headings : function ($tag, data) {
        var navcat      = data.value;
        var category    = r.vars.getCategory(navcat);
        var subCategory = r.vars.getCategory(navcat, 1);
        var subCatLong;
        var catPretty   = r.vars.getPretty(category);
        var linkHome    = "<h2><a href='#top' onClick=\"return showContent('homepage', {});\">Antonini:</a></h2>";
        var link        = linkHome;

        if(subCategory) {
          // on a sub category
          // app.u.dump('on a sub category');
          subCatLong = r.vars.getValueFromSubcatData(navcat, 'prettyLong');

          if (!subCatLong) {
            app.u.dump("Warning: trying " + navcat + "'s' pretty name");
            subCatLong = r.vars.getPretty(navcat);
          }
        }

        if (navcat && subCategory && subCatLong) {
          // on a sub category
          // app.u.dump("On a sub category");
          link += "<h1 class='categoryColor'>" + subCatLong + "</h1>";

          if (category && catPretty) {
            link += "<h3 class='headingSubsParent'>" + r.vars.categoryLink(category, catPretty) + "</h3>";
          }
        }else if(catPretty) {
          // on a primary category
          // app.u.dump("On a primary category");
          link += "<h1 class='categoryColor'>" + catPretty + "</h1>";
        }

        $tag.html(link);
      },

      hiddenPrettyFixed : function ($tag, data) {
        $tag.text(r.vars.fixHiddenPretty(data.value));
      },

      specialCategoryData : function ($tag, data) {
        // var promo = '.promo_-_customizing';
        // var aboutGsi = '.about_gsi_distributing';
        var currentCategory = data.value; // expects category navcat id
        var description = '';

        // switch(currentCategory) {
        //   case promo:
        //     app.u.dump('got promo');
        //     description = r.vars.getCategoryDescription(promo);
        //     break;
        //   case aboutGsi:
        //     app.u.dump('got about');
        //     description = r.vars.getCategoryDescription(aboutGsi);
        //     break;
        // }

        description = r.vars.getCategoryDescription(currentCategory);

        if (description) {
          $tag.html(description);
        }
      },

      subcatProductList : function($tag,data) {
        // app.u.dump("BEGIN store_prodlist.renderFormats.productList");
        // app.u.dump(" -> data.bindData: "); app.u.dump(data.bindData);
        var navcat = data.value;
        var productList = r.vars.getValueFromSubcatData(navcat, 'products');
        // app.u.dump(navcat);
        // app.u.dump([productList]);

        if(app.u.isSet(productList)) {
          data.bindData.csv = productList;
          app.ext.store_prodlist.u.buildProductList(data.bindData,$tag);
          $tag.show();
        }else {
          $tag.parent('div').hide();
        }
      },

      showObjectIfSet : function($tag,data) {
        //      app.u.dump('BEGIN control.renderFormats.hideorShowTab');
        //      app.u.dump(' -> data.value'+data.value);
        if(data.value)  {
          //        app.u.dump(' -> setting $tag.show()');
          if (typeof data.value == 'object') {
            if (data.value.length < 1) {
              return;
            }
          }
          $tag.show().css('display','block'); //IE isn't responding to the 'show', so the display:block is added as well.
        }
      }
    }// renderformats
  }; //r object.

  return r;
};