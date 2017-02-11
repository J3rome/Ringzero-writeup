import pexpect
import sys
import numpy

child = pexpect.spawn("ssh sudoku@ringzer0team.com -p 12643")
#child.logfile = sys.stdout
child.expect('password')
child.sendline("dg43zz6R0E")


moreLineToParse = True

sudokuGrid=[]

# First we parse the sudoku
while moreLineToParse:
	try:
		child.expect("\|",timeout=0.5)
		child.expect("\+")
		line = child.before.replace(" ","").replace('|\r\n','')

		sudokuGrid.append(line.split("|"))
	except pexpect.TIMEOUT:
		moreLineToParse = False

nbOfCol = len(sudokuGrid[0])
nbOfRow = len(sudokuGrid)

print("Length of array "+ str(nbOfRow)+" Rows by "+str(nbOfCol)+" Cols\r\n")

counter=0
emptySpotByRow=[]
print("Printing parsed sudoku")
for line in sudokuGrid:
	print(line)
	for elem in line:
		if elem == '':
			counter+=1
	emptySpotByRow.append(counter)
	counter = 0

emptySpotByCol = []
for line in numpy.transpose(sudokuGrid):
	for elem in line:
		if elem == '':
			counter+=1
	emptySpotByCol.append(counter)
	counter = 0



print("\r\nNb of empty space by row : ")
for line in emptySpotByRow:
	print(line)


print("\r\nNb of empty space by col : ")
for line in emptySpotByCol:
	print(line)