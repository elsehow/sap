#!/usr/bin/python
import sys
from Adafruit_Thermal import *
printer = Adafruit_Thermal("/dev/ttyAMA0", 19200, timeout=5)

# global vars
bold = False
underline = False

def has_match (symbol, rest_of_string):
  return rest_of_string.find(symbol) > -1

def handle_bold (line):
  char = line[0]
  if char == '*':
    global bold
    if bold:
      bold = False
      printer.boldOff()
      return True
    if not bold and has_match('*', line[1:]):
      bold = True
      printer.boldOn()
      return True
  return False

def handle_underline (line):
  char = line[0]
  if char == '/':
    global underline
    if underline:
      underline = False
      printer.underlineOff()
      return True
    if not underline and has_match('/', line[1:]):
      underline = True
      printer.underlineOn(2)
      return True
  return False

def my_print (line):
  h_b = handle_bold(line)
  h_u = handle_underline(line)
  if not h_b and not h_u:
    printer.prnt(line[0])
  # if this is the last char, we're done
  if len(line) == 1:
    return
  # otherwise, go through recursively with the rest of the line
  return my_print(line[1:])

def check_heading (line):
  if line.startswith('# '):
    printer.setSize('L')
    return line.split('# ')[1]
  elif line.startswith('## '):
    printer.setSize('M')
    return line.split('## ')[1]
  printer.setSize('N')
  return line

# print whatever came over the cli
for line in sys.stdin:
  l = check_heading(line)
  my_print(l)

# print some blank lines for clean tearing
printer.feed(3)





# handle headings








# later
# play with stdin script
# could be fun/cool
# (or more failure-prone)
# tbseen
