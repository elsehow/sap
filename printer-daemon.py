#!/usr/bin/python

from Adafruit_Thermal import *
import sys
printer = Adafruit_Thermal("/dev/ttyAMA0", 19200, timeout=5)

printer.feed(1)
for line sys.stdin:
    printer.println(line)
