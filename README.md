# font-scanner

Phantomjs-Project to scan all used font-variations or combinations on a website. I created a companies website and did not include google fonts like you should be (add specific weight, style by time), but I added all of them and wanted to remove the unused one later on.

It will output a list of JSON-Objects following this form:

```json
{
    "font-family": "Roboto, Helvetica, Arial, sans-serif",
    "font-style": "normal",
    "font-weight": "400"
}
{
    "font-family": "'Roboto Condensed', Helvetica, Arial, sans-serif",
    "font-style": "normal",
    "font-weight": "400"
}
```

It uses the whole font-stack, the font-weight and font-style. Font-size can also be outputted (uncomment one line). This will probably need to be done several times, to have it for all screen sizes.

## Usage
```
phantomjs font-scanner.js 'some-url.com'
```
_of course without the hyphens!_

All output will be written to a file called 'style'.

## Credits
Thanks to the phantomjs and jQuery developers. And also to the authors of these ressources which helped me to put this together:

http://stackoverflow.com/a/12823730/1423259

http://stackoverflow.com/a/23508177/1423259
