#!/bin/bash

python3 "python_scripts/sensor_handler.py" &

ipv4=$(hostname -I | awk '{print $1}')

php -S "$ipv4:8080" -t "./"

#pkill -f "sensor_handler.py"
