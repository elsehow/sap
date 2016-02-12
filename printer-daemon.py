#!/usr/bin/python

from Adafruit_Thermal import *
import sys
printer = Adafruit_Thermal("/dev/ttyAMA0", 19200, timeout=5)

# print whatever came over argv[1]
printer.println(sys.argv[1])

# print some blank lines for clean tearing
printer.println("")
printer.println("")
printer.println("")
