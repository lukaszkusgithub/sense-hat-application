#!/bin/bash

ipv4=$(hostname -I | awk '{print $1}')

python3 "python_scripts/sensor_handler.py"

php -S "$ipv4:8080" -t "/home/user/server"


