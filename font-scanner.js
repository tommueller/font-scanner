var page = require('webpage').create(), system = require('system'), fs = require('fs');
var path = 'styles', count = 1, allItems = [];

if (system.args.length === 1) {
  console.log('Usage: font-scanner.js <list of n URLs>');
  phantom.exit();
}

// sort array and delete duplicates based on there properties
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

// set viewportsize
page.viewportSize = { width: 1920, height: 1200 };

function handle_page(url){

  console.log('Evaluating ' + url);

  page.open(url, function(status){
    if (status !== 'success') {
      console.log('FAIL to load the address');
      phantom.exit();
    } else {

      page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js', function() {

        var items = page.evaluate(function() {

          var styles = [];
          var items = document.body.getElementsByTagName("*");

          for (var i = 0; i < items.length; i++) {
            var $this = items[i];
            styles.push({
              // "font-size": $($this).css('font-size'),
              "font-family": $($this).css('font-family').replace('\'', '').replace('\"', '').replace('\'', ''),
              "font-weight": $($this).css('font-weight').replace('\'', '').replace('\"', '').replace('\'', ''),
              "font-style": $($this).css('font-style').replace('\'', '').replace('\"', '').replace('\'', '')
            });
          }

          styles.push({'url' : 'egal'});

          return styles;
        });

        allItems = allItems.concat(items);
        setTimeout(next_page(),100);
      });
    }
  });
}

function next_page() {
  var url = system.args[count++];
  if(!url) {

    var finalItems = unique(allItems);

    for (var i = 0; i < finalItems.length; i++) {
      var $this = finalItems[i];
      if (i === 0) {
        fs.write(path, $this['font-family'] + ';' + $this['font-weight'] + ';' + $this['font-style'] + '\n', 'w');
      } else {
        fs.write(path, $this['font-family'] + ';' + $this['font-weight'] + ';' + $this['font-style'] + '\n', 'a');
      }
    }
    phantom.exit();
  }
  handle_page(url);
}

next_page();
