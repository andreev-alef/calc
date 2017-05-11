# -*-coding: utf-8-*-

import string

import tornado
import tornado.ioloop
import tornado.web
from app.calc import Record


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

class Calc(tornado.web.RequestHandler):
    def post(self):
        # self.set_header("Content-Type", "text/plain")
        # self.write(u"Имя: {s}".format(s=self.get_argument("name")))
        try:
            rec = Record()
            self.write(rec.getAll())
        except BaseException as strExcaption:
            errStr = str.decode(("%s" % strExcaption), "cp1251")
            self.write(errStr)


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
        (r"/plan", Plan),
        (r"/calc", Calc)
    ])


app = makeApp()
app.listen(8888)
tornado.ioloop.IOLoop.current().start()
