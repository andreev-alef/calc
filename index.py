# -*-coding: utf-8-*-
import sys

import tornado
import tornado.ioloop
import tornado.web
import string


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
        indexTemplate = string.Template(open("./static/index.html", "r").read())
        self.write(indexTemplate.substitute())


class Plan(tornado.web.RequestHandler):
    def get(self):
        indexTemplate = string.Template(open("./static/plan.html", "r").read())
        self.write(indexTemplate.substitute())


def makeApp():
    return tornado.web.Application([
        (r"/lib/(.*)", tornado.web.StaticFileHandler, {"path": "./static/lib"}),
        (r"/", Index),
        (r"/plan", Plan)
        # (r"/(.*)", tornado.web.StaticFileHandler, {"path":"D:/www/PycharmProjects/calc/static"})
    ])


app = makeApp()
app.listen(8888)
tornado.ioloop.IOLoop.current().start()
