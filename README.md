# SenseHat web application ![Raspberry Pi](https://img.shields.io/badge/-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi)

## Overview 

The Sense HAT is an add-on board for Raspberry Pi, equipped with various sensors, an LED matrix, and a joystick. Creating a web application for Sense HAT allows users to remotely interact with and monitor the data from these sensors, providing a user-friendly interface for accessing information and controlling the device.

## Features

1. Real-time Sensor Data Display
View live data from sensors such as temperature, humidity, pressure, and orientation.
Visualize sensor readings through charts or graphs for easy interpretation.
2. LED Matrix Control
Remote control of the LED matrix, allowing users to display custom messages or patterns.
Integration with the web interface to design and preview LED matrix animations.


## ⚙️ Technologies Used ⚙️
Frontend:

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)

Backend:

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white) ![Shell Script](https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white)

## 🛠️ Usage 🛠️

### Requirements ⚙️

You have to install on your Raspberry Pi PHP package.
```console
$ sudo apt install php
```

If you wont to use emulator instead of Sense Hat, make sure that it is installed on your device: [Installation guide](https://sense-emu.readthedocs.io/en/v1.1/install.html)

### PHP built-in server ![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)

Modify `start_server.sh`:
* set proper paths
* set port (by default 8080)
* comment out lines under `"apache server"`
  
Now you can start server and sensors reading by typing following command inside `src` folder:

```
$ bash start_server.sh
```

#### Note❗

PHP built-in server does not support SSL/TLS, so if you wont to establish connection with server via `https` you need to use `stunnel4` tool.


### Apache server ![Apache](https://img.shields.io/badge/apache-%23D42029.svg?style=for-the-badge&logo=apache&logoColor=white)

1. Install apache
   
```console
$ sudo apt update
$ sudo apt install apache2
$ sudo systemctl enable apache2
```

2. Modify `ServerAdmin` and `DocumentRoot` (by default set to `/var/www/sense-hat-application/src`) properties in `.conf` files.

3. Copy the contents of the `src` folder to your `DocumentRoot` directory.
   
4. To enable the site only via port 80 copy `sensehat.local.conf` from `apache_conf/sites-available` folder to `/etc/apache2/sites-available`. Next comment line `Redirect / https://sensehat.local/` if uncommented. To enable site use following commands:

```console
$ sudo a2ensite sensehat.local.conf
$ sudo a2dissite 000-default.conf
```

5. If you wont to use port 443, copy `sensehatssl.local.conf` from `apache_conf/sites-available` folder to `/etc/apache2/sites-available`. Then, uncomment line `Redirect / https://sensehat.local/` in previously copied `sensehat.local.conf ` if commented. To enable the site, use following commands:
   
```console
$ sudo a2ensite sensehatssl.local.conf
$ sudo a2dissite default-ssl.conf
$ sudo a2enmod ssl
```

6. Make sure that properties `SSLCertificateFile` and `SSLCertificateKeyFile` points to proper files, if you don't have certificate generated yet, you can use following command to generete self-signed certificate:
```console
$ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/selfsigned.key -out /etc/ssl/certs/selfsigned.crt
```

7. Restart apache
   
```console
$ sudo systemctl restart apache2
```

#### Note❗

If you have firewall enabled you should configure it to allow access to apache server via ports 80 and 443.

### Autostart 🧰

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
### Notes ❗

If you are having any trouble running the app, check:
* whether the paths in the scripts are correct
* whether the scripts have been granted permissions
* whether you are using the appropriate environment

## License 📄
[License](LICENSE)

