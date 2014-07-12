pouch-todo
==========

A simple todo-app similar to TodoMVC, using AngularJS amd PouchDB to abstract browser storage and potentially sync to CouchDB. This is based on 
[a blog post](http://www.mircozeiss.com/sync-multiple-angularjs-apps-without-server-via-pouchdb) by [Mirco Zeiss](https://github.com/zemirco). 

The blog post didn't include the full source, and both AngularJS and PouchDB has been updated after the publication, so there is some differences in used syntax.


Requirements
------------

- a browser that PouchDB supports, see the section Browser Support [here](http://pouchdb.com/learn.html)


Try it out
----------

- download this repo, and open in your browser of choice. It should work without a server, or then use something like the built-in Python webserver:

```bash
$ git clone https://github.com/orbitbot/pouch-todo
$ cd pouch-todo
$ python -m SimpleHTTPServer
```

Notes
-----

- the main font is Montserrat, and the icons were generated using [Fontello](http://fontello.com)
- the used fonts are covered by the Open Fonts License, see information under the licenses subfolder

Licence
=======

The MIT License (MIT)

Copyright (c) 2014 Patrik Johnson -- http://github.com/orbitbot

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
