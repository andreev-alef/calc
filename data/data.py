# -*- coding: utf-8 -*-
from __future__ import division
from app.calc import rub_comma, okrug2

# Типографские расходы
white_paper_batch_cost_65 = 80  # Цена пачки белой бумаги 65г/м2
white_sheets_per_batch_65 = 250  # Число листов в пачке 65г/м2

color_paper_batch_cost = 650  # Цена пачки цветной бумаги
color_sheets_per_batch = 250  # Число листов в пачке цветной бумаги

pages_count = 100  # Всего страиц

pages_count_tetra = pages_count  # Число страниц кратных 4-м
while pages_count_tetra % 4:
    pages_count_tetra += 1

layout_sheets = pages_count_tetra // 4  # Количество тетрадей
if layout_sheets >= 35:
    if layout_sheets % 8:
        brochure_count = layout_sheets // 8 + 1  # Количество брошюр при термоклеевом переплёте
    else:
        brochure_count = layout_sheets // 8
else:
    brochure_count = 1

number_of_copies = 100  # Тираж
defect = 3.0  # Брак в %
white_sheets_per_edition = layout_sheets * number_of_copies  # Белых листов на тираж
white_batches_per_edition = white_sheets_per_edition // white_sheets_per_batch_65  # Пачек белой бумаги на тираж
color_sheets_per_edition = number_of_copies

# ---------------------------------------------------------------------------------------------------------------------
print "Страниц всего: {0}".format(pages_count)
print "Страниц приведённых к 4-м: {0}".format(pages_count_tetra)
print "Листов макета: {0}".format(layout_sheets)
print "Число брошюр: {0}".format(brochure_count)
print "Белых листов на тираж: {0}".format(white_sheets_per_edition)
print "Пачек белой бумаги на тираж: {0}".format(white_batches_per_edition)

