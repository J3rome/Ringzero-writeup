import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('ringzer0team.com',username='number',password='Z7IwIMRC2dc764L',port=12643)

#stdin,stdout,stderr = ssh.exec_command("",timeout=5)

#stdin.close()

chan = ssh.invoke_shell()
chan.settimeout(5)

found = False
waitingNbInput = True

counter=0

while not found:
	while waitingNbInput:
		if chan.recv_ready():
			line = str(chan.recv(1024))

			print("Line : ")
			print(line)

			if 'number>' in line:
				waitingNbInput = False

	print("Got Number Input")

	while not chan.send_ready():
		print("Waiting send ready")

	counter+=1
	chan.exec_command("5000")
	#print(chan.sendall('5000'))
	waitingNbInput = True
	if counter == 5:
		found=True


print("Finished")