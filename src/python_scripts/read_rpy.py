import argparse
# from sense_hat import SenseHat
from sense_emu import SenseHat
import json
from datetime import datetime
import os


degreeToRadianScaller = 0.0174532925

senseHat = SenseHat()


def read_data(val, unit):
    return senseHat.get_orientation()[val] if unit == 'degree' else senseHat.get_orientation()[val] * degreeToRadianScaller


def read_pitch(unit):
    return read_data("pitch", unit)


def read_yaw(unit):
    return read_data("yaw", unit)


def read_roll(unit):
    return read_data("roll", unit)


def read_rpy():
    parser = argparse.ArgumentParser()
    parser.add_argument('-u', default="degree")
    args = parser.parse_args()

    data = {"roll": {}}

    data["roll"]["value"] = f'{read_roll(args.u)}'

    if args.u == "degree":
        data["roll"]["unit"] = f'{args.u}'
    else:
        data["roll"]["unit"] = f'{"rad"}'

    data["pitch"] = {}
    data["pitch"]["value"] = f'{read_pitch(args.u)}'

    if args.u == "degree":
        data["pitch"]["unit"] = f'{args.u}'
    else:
        data["pitch"]["unit"] = f'{"rad"}'

    data["yaw"] = {}
    data["yaw"]["value"] = f'{read_yaw(args.u)}'

    if args.u == "degree":
        data["yaw"]["unit"] = f'{args.u}'
    else:
        data["yaw"]["unit"] = f'{"rad"}'

    data["date"] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    current_date = datetime.now().strftime('%Y-%m-%d')

    file_name = f'measurements-{current_date}.json'
    file_path = os.path.join('../data/rpy', file_name)

    if not os.path.exists(file_path):
        initial_data = []
        with open(file_path, 'w') as file:
            json.dump(initial_data, file, indent=2)

    with open(file_path, 'r') as file:
        measurements = json.load(file)

    measurements.insert(0, data)

    with open(file_path, 'w') as file:
        json.dump(measurements, file, indent=2)

    if __name__ == "__main__":
        res = json.dumps(data)
        print(res, end="")


if __name__ == "__main__":
    read_rpy()

