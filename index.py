# -*-coding: utf-8-*-
import sys

import tornado.ioloop
import tornado.web


# print "Content-Type: text/html"     # HTML is following
# print                               # blank line, end of headers
#
# print "<html>"
# print "<header>"
# print '<meta charset="utf-8">'
# print '<style>'
# print 'body{font-family: "PT Mono"}'
# print '</style>'
# print '<body>'

class Index(tornado.web.RequestHandler):
    def get(self):
        self.write("Python version: %s" % sys.version)


def makeApp():
    return tornado.web.Application([
        (r"/", Index),
    ])


app = makeApp()
app.listen(8888)
tornado.ioloop.IOLoop.current().start()
