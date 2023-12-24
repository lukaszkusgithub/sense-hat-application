#!/bin/bash

echo "30 seconds to start"
sleep 10
echo "20 seconds to start"
sleep 10
echo "10 seconds to start"
sleep 10

# start sense_emu
echo "Starting sense hat emulator"
sense_emu_gui &
echo "Waiting 20 seconds"
sleep 20


# start readings from sensors
echo "Starting sensor handler"
cd "/var/www/sense-hat-application/src/python_scripts"
python3 "/var/www/sense-hat-application/src/python_scripts/sensor_handler.py" &
echo "Waiting 10 seconds"
sleep 10

# php built-in server
# echo "Starting php built-in server on port 8080"
#ipv4=$(hostname -I | awk '{print $1}')
#php -S "$ipv4:8080" -t "./"

# apache server
status=$(systemctl is-active apache2)

if [ "$status" != "active" ] 
then
	echo "Starting apache server"
	sudo systemctl start apache2
fi

echo "Waiting 10 seconds"
sleep 10

while true
do
    status=$(systemctl is-active apache2)

    if [ "$status" != "active" ] 
    then
	echo "Apache server has been closed"
        break
    fi

    sleep 5
done


# finih readings from sensors
echo "Finishing sensor handler process"
pkill -f "sensor_handler.py"

