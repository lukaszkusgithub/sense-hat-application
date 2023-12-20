import threading
import time
from read_temperature import read_temperature
from read_pressure import read_pressure
from read_humidity import read_humidity
from read_rpy import read_rpy
import signal
import os
import configparser

PATH_TO_PRES_DATA = "../data/pressure"
PATH_TO_RPY_DATA = "../data/rpy"
PATH_TO_TEMP_DATA = "../data/temperature"
PATH_TO_HUM_DATA = "../data/humidity"

def check_directory(dir):
    if not os.path.exists(dir):
        try:
            os.makedirs(dir)
        except Exception as e:
            print(e)

check_directory(PATH_TO_HUM_DATA)
check_directory(PATH_TO_PRES_DATA)
check_directory(PATH_TO_RPY_DATA)
check_directory(PATH_TO_TEMP_DATA)

config = configparser.ConfigParser()

script_dir = os.path.dirname(os.path.realpath(__file__))
os.chdir(script_dir)

config.read('../config.ini')

delay_in_seconds = float(config['General']['delay'])
temperature_sensor = float(config['Sensors']['temperature'])
humidity_sensor = float(config['Sensors']['humidity'])
pressure_sensor = float(config['Sensors']['pressure'])
rpy_sensor = float(config['Sensors']['rpy'])
exit_program = False
threads = []
exit_event = threading.Event()

def handle_sensor_temperature(exit_event):
    while not exit_event.is_set():
        read_temperature()
        time.sleep(delay_in_seconds)


def handle_sensor_humidity(exit_event):
    while not exit_event.is_set():
        read_humidity()
        time.sleep(delay_in_seconds)


def handle_sensor_pressure(exit_event):
    while not exit_event.is_set():
        read_pressure()
        time.sleep(delay_in_seconds)


def handle_sensor_rpy(exit_event):
    while not exit_event.is_set():
        read_rpy()
        time.sleep(delay_in_seconds)


def exit_handler():
    global exit_program
    exit_program = True
    print("Oczekiwanie na zakończenie wątków...")
    exit_event.set()

def handle_sigint(sig, frame):
    print("Otrzymano sygnał Ctrl+C. Oczekiwanie na zakończenie wątków...")
    exit_handler()


signal.signal(signal.SIGINT, handle_sigint)
signal.signal(signal.SIGTERM, handle_sigint)


if temperature_sensor == 1:
    temp = threading.Thread(target=handle_sensor_temperature, args=(exit_event,))
    threads.append(temp)

if pressure_sensor == 1:
    press = threading.Thread(target=handle_sensor_pressure, args=(exit_event,))
    threads.append(press)

if rpy_sensor == 1:
    rpy = threading.Thread(target=handle_sensor_rpy, args=(exit_event,))
    threads.append(rpy)

if humidity_sensor == 1:
    hum = threading.Thread(target=handle_sensor_humidity, args=(exit_event,))
    threads.append(hum)


for thread in threads:
    thread.start()


try:
    for thread in threads:
        thread.join()

except KeyboardInterrupt:
    print("Wykryto Ctrl+C. Oczekiwanie na zakończenie wątków...")



exit_handler()
