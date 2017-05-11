# -*- coding: utf-8 -*-
from __future__ import division

import string


class CalcRecUtil:
    def okrug2(num, depth=2):
        """Округление числа до двух знаком после запятой
        
        Результат – число типа float
        
        """

        return float(u"%.2f" % num)
        # return int(num * 10 ** depth + 0.5) / 10 ** depth

    def rub_comma(dot_num, new_format=False):
        """ Замена десятичной точки на запятую.
         
        Замена десятичной точки на запятую с добавлением сокращения «руб.»    
        Если new_format=True, добавляется знак ₽ вместо «руб.»
        
        """
        if new_format:
            return u"{0}₽".format(string.replace(u"%.2f" % dot_num, ".", ","))
        else:
            return u"{0} руб.".format(string.replace(u"%.2f" % dot_num, ".", ","))


class Record:
    def getAll(self):
        import psycopg2
        try:
            dbConnectionParam = "dbname=rio user=rio password=---===  host=127.0.0.1"
            rioConnection = psycopg2.connect(dbConnectionParam)

            return rioConnection
        except BaseException as strExcaption:
            errStr = str.decode(("%s" % strExcaption), "cp1251")
            return errStr
