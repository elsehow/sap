#!/usr/bin/python

from Adafruit_Thermal import *
import sys
printer = Adafruit_Thermal("/dev/ttyAMA0", 19200, timeout=5)
lines=sys.stdin.read().splitlines()
for line in lines:
  printer.println(line)
