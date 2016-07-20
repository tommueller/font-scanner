var page = require('webpage').create(),
system = require('system'), t, address;

if (system.args.length === 1) {
  console.log('Usage: loadspeed.js <some URL>');
  phantom.exit();
}

t = Date.now();
address = system.args[1];
page.open(address, function(status) {
  if (status !== 'success') {
    console.log('FAIL to load the address');
    phantom.exit();
  } else {

    t = Date.now() - t;
    console.log('Loading ' + system.args[1]);
    console.log('Loading time ' + t + ' msec');

    page.viewportSize = { width: 1920, height: 1200 };

    var items = page.evaluate(function() {

      function unique(obj){
        var uniques=[];
        var stringify={};
        for(var i=0;i<obj.length;i++){
          var keys=Object.keys(obj[i]);
          keys.sort(function(a,b) {return a-b});
          var str='';
          for(var j=0;j<keys.length;j++){
            str+= JSON.stringify(keys[j]);
            str+= JSON.stringify(obj[i][keys[j]]);
          }
          if(!stringify.hasOwnProperty(str)){
            uniques.push(obj[i]);
            stringify[str]=true;
          }
        }
        return uniques;
      }

      var styles = [];
      var items = document.body.getElementsByTagName("*");

      for (var i = 0; i < items.length; i++) {
        var $this = items[i];
        styles.push({
          // "font-size": $($this).css('font-size'),
          "font-family": $($this).css('font-family'),
          "font-weight": $($this).css('font-weight'),
          "font-style": $($this).css('font-style')
        });
      }

      return unique(styles);
    });

    for (var i = 0; i < items.length; i++) {
      var $this = items[i];
      console.log(JSON.stringify($this, null, 4));
    }

    phantom.exit();
  }
});
