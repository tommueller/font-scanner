var page = require('webpage').create(), system = require('system'), out = '';

if (system.args.length === 1) {
  console.log('Usage: sitemap-scanner.js <some URL>');
  phantom.exit();
}

page.open(system.args[1], function() {
  var content = page.content;
  parser = new DOMParser();
  xmlDoc = parser.parseFromString(content,'text/xml');
  var loc = xmlDoc.getElementsByTagName('loc');
  for(var i=0; i < loc.length; i++)
  {
    var url=loc[i].textContent;
    out = out.concat(url + ' ');
  }

  console.log(out.trim());
  phantom.exit();
});
