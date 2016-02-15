# global vars
bold = False
italics = False

# returns true if
def has_match (symbol, rest_of_string):
  return rest_of_string.find(symbol) > -1

def handle_bold (line):
  char = line[0]
  if char == '*':
    global bold
    if bold:
      bold = False
      print 'UNDOING BOLD!!!!'
      return True
    if not bold and has_match('*', line[1:]):
      bold = True
      print 'DOING BOLD!!!!'
      return True
  return False

def handle_italics (line):
  char = line[0]
  if char == '/':
    global italics
    if italics:
      italics = False
      print 'UNDOING ITALICS!!!!'
      return True
    if not italics and has_match('/', line[1:]):
      bold = True
      print 'DOING ITALICS!!!!'
      return True
  return False

def my_print (line):
  handled_b = handle_bold(line)
  handled_i = handle_italics(line)
  if not handled_b and not handled_i:
    print(line[0])
  # if this is the last char, we're done
  if len(line) == 1:
    return
  # otherwise, go through recursively with the rest of the line)
  return my_print(line[1:])


# testing
ex = "this / is *fun* times"
ex2 = "/this/ is *fun times"
my_print(ex)
my_print(ex2)



# main algo
# if * and has_match(*, str):
#   if not bold:
#     turn on bold
#   else
#     turn off bold

# could make this dry-er (with underline)

# handle heading








# later
# play with stdin script
# could be fun/cool
# (or more failure-prone)
# tbseen
