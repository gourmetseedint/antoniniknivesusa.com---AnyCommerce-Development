var store_print_friendly = function() {
  var r = {
    vars : {},

    calls : {},

    callbacks : {
      //callbacks.init need to return either a true or a false, depending on whether or not the file will execute properly based on store account configuration.
      init : {
        onSuccess : function()  {
          // app.u.dump('BEGIN app.ext.store_navcats.init.onSuccess ');
          return true;
        },
        onError : function()  {
          app.u.dump('print friendly error');
        }
      },

      // used when page is printed. set printme=1 on URI.
      printPage : {
        onSuccess : function(tagObj)  {
          
          // var containerPID = app.ext.mob_customizer.vars.uriParams.s2;
          // var imageID = app.data['appProductGet|'+containerPID]['%attribs']['zoovy:prod_image1'];
          // $('#configuratorContainer').prepend("<div class='floatRight displayNone showInPrint'>"+app.u.makeImage({"h":"300","w":"300","b":"ffffff","name":imageID,"tag":1})+"<\/div>");
          window.print();
        },
        onError : function(responseData,uuid) {
          app.u.handleErrors(responseData,uuid);
        }
      }
    }, //callbacks

    actions : {},

    renderFormats : {},
    
    u : {}
    
  }; //r object.
  return r;
};