# font-scanner

This [phantomjs](http://phantomjs.org/)-project helps you to determine the amount of different fonts and font-styles (weight and italic) used across a page or a whole site.

It will output a list of used font-combinations in this form (delimiter is ';'):

```
Roboto, Helvetica, Arial, sans-serif;400;normal
Roboto Condensed, Helvetica, Arial, sans-serif;400;normal
```

It uses the whole font-stack, the font-weight and font-style. Font-size can also be outputted (uncomment one line). This will probably need to be done several times, to have it for all screen sizes.

## Usage
### To run a single page (_of course without the hyphens!_)

```
phantomjs font-scanner.js 'http://some-url.com'
```

### To run multiple pages (_of course without the hyphens!_)
```
phantomjs font-scanner.js ''http://some-url.com' ''http://second-url.org' ... ''http://nth-url.net'
```

### To run all pages from a sitemap (_of course without the hyphens!_)
```
phantomjs font-scanner.js $(phantomjs sitemap-scanner.js 'http://yourdomain.com/sitemap.xml')
```

All output will be written to a file called 'style'.

## Credits
Thanks to the phantomjs and jQuery developers. And also to the authors of these ressources which helped me to put this together:

http://stackoverflow.com/a/12823730/1423259

http://stackoverflow.com/a/23508177/1423259

http://stackoverflow.com/a/17000930/1423259
