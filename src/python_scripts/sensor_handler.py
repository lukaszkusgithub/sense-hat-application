import threading
import time
from read_temperature import read_temperature
from read_pressure import read_pressure
from read_humidity import read_humidity
from read_rpy import read_rpy
import signal
import os
import configparser

config = configparser.ConfigParser()
config.read('../config.ini')

delay_in_seconds = float(config['General']['delay'])
temperature_sensor = float(config['Sensors']['temperature'])
humidity_sensor = float(config['Sensors']['humidity'])
pressure_sensor = float(config['Sensors']['pressure'])
rpy_sensor = float(config['Sensors']['rpy'])
exit_program = False
threads = []


def handle_sensor_temperature():
    while True:
        read_temperature()
        time.sleep(delay_in_seconds)


def handle_sensor_humidity():
    while True:
        read_humidity()
        time.sleep(delay_in_seconds)


def handle_sensor_pressure():
    while True:
        read_pressure()
        time.sleep(delay_in_seconds)


def handle_sensor_rpy():
    while True:
        read_rpy()
        time.sleep(delay_in_seconds)


def exit_handler():
    global exit_program
    exit_program = True
    print("Program zakończony.")
    os._exit(0)


def handle_sigint(sig, frame):
    print("Otrzymano sygnał Ctrl+C. Oczekiwanie na zakończenie wątków...")
    exit_handler()


signal.signal(signal.SIGINT, handle_sigint)
signal.signal(signal.SIGTERM, handle_sigint)


if temperature_sensor == 1:
    temp = threading.Thread(target=handle_sensor_temperature)
    threads.append(temp)

if pressure_sensor == 1:
    press = threading.Thread(target=handle_sensor_pressure)
    threads.append(press)

if rpy_sensor == 1:
    rpy = threading.Thread(target=handle_sensor_rpy)
    threads.append(rpy)

if humidity_sensor == 1:
    hum = threading.Thread(target=handle_sensor_humidity)
    threads.append(hum)


for thread in threads:
    thread.start()


for thread in threads:
    thread.join()



