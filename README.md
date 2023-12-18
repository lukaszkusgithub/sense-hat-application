# SenseHat web application 

## Overview

The Sense HAT is an add-on board for Raspberry Pi, equipped with various sensors, an LED matrix, and a joystick. Creating a web application for Sense HAT allows users to remotely interact with and monitor the data from these sensors, providing a user-friendly interface for accessing information and controlling the device.

## Features

1. Real-time Sensor Data Display
View live data from sensors such as temperature, humidity, pressure, and orientation.
Visualize sensor readings through charts or graphs for easy interpretation.
2. LED Matrix Control
Remote control of the LED matrix, allowing users to display custom messages or patterns.
Integration with the web interface to design and preview LED matrix animations.


## Technologies Used
Frontend:

HTML, CSS, JavaScript, jQuery

Backend:
Python, PHP


## Usage

In the **src** directory run the command

```php
$ php -S localhost:8080
```

## Autostart

In order to enable autostart follow these steps:
1. Insert `server-autostart.service` from `src` folder inside directory: `/etc/systemd/system/`. 
2. Modify service file and bash script by setting correct paths.
3. Change permissions for bash script:
```console
$ chmod +x start_server.sh
```
4. Start service:
```console
$ sudo systemctl daemon-reload
$ sudo systemctl enable server-autostart.service
$ sudo systemctl start server-autostart.service
```
5. Restart device
```console
$ sudo reboot
```


## License:
[License](LICENSE)
