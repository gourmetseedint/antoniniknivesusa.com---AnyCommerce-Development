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


    var value   = 'Not set';
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

  var r = {
    vars : {

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
        $tag.html(value);
      },

      subcat_pretty_long_link : function ($tag, data) {
        var navcat = data.value;
        var value = getValueFromSubcatData(navcat, 'prettyLong');
        // change text to json value
        $tag.html(categoryLink(navcat, value));
      },

      // subcat_category_link : function ($tag, data) {
      //   var navcat = getCategory(data.value);
      //   var value = getValueFromSubcatData(navcat, 'prettyLong');
      //   // change text to json value
      //   $tag.html(categoryLink(navcat, value));
      // },

      subcat_description : function ($tag, data) {
        var value = getValueFromSubcatData(data.value, 'description');
        // change text to json value
        $tag.html(value);
      }
    }, // renderformats
    u : {} //util  
  }; //r object.
  return r;
};