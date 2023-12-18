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
exit_program = False
threads = []


def handle_sensor_temperature(sensor_name):
    while True:
        measurement = read_temperature()
        # print(f"{sensor_name} - Temperature: {measurement} \n\n")
        time.sleep(delay_in_seconds)


def handle_sensor_humidity(sensor_name):
    while True:
        measurement = read_humidity()
        # print(f"{sensor_name} - Humidity: {measurement} \n\n")
        time.sleep(delay_in_seconds)


def handle_sensor_pressure(sensor_name):
    while True:
        measurement = read_pressure()
        # print(f"{sensor_name} - Pressure: {measurement} \n\n")
        time.sleep(delay_in_seconds)


def handle_sensor_rpy(sensor_name):
    while True:
        measurement = read_rpy()
        # print(f"{sensor_name} - RPY: {measurement} \n\n")
        time.sleep(delay_in_seconds)


def exit_handler(signum, frame):
    global exit_program
    exit_program = True
    print("Program zakończony.")
    os._exit(0)



def handle_sigint(sig, frame):
    print("Otrzymano sygnał Ctrl+C. Oczekiwanie na zakończenie wątków...")
    exit_handler(sig, frame)


signal.signal(signal.SIGINT, handle_sigint)
signal.signal(signal.SIGTERM, handle_sigint)


temp = threading.Thread(target=handle_sensor_temperature, args=("Temperature",))
hum = threading.Thread(target=handle_sensor_humidity, args=("Humidity",))
press = threading.Thread(target=handle_sensor_pressure, args=("Pressure",))
rpy = threading.Thread(target=handle_sensor_rpy, args=("RPY",))


threads.extend([temp, hum, press, rpy])

for thread in threads:
    thread.start()


for thread in threads:
    thread.join()



