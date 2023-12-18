import argparse
# from sense_hat import SenseHat
from sense_emu import SenseHat
import json
from datetime import datetime
import os

senseHat = SenseHat()

hPa_to_mmHg_Scaller = 0.75006157584566


def read_measurement(arg):
    if arg == "mmHg":
        return senseHat.get_pressure() * hPa_to_mmHg_Scaller
    return senseHat.get_pressure()


def read_pressure():
    parser = argparse.ArgumentParser()
    parser.add_argument('-u', default=0)
    args = parser.parse_args()

    data = {"value": f'{read_measurement(args.u)}'}
    if args.u == "mmHg":
        data["unit"] = f'{args.u}'
    else:
        data["unit"] = f'{"hPa"}'

    data["date"] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    current_date = datetime.now().strftime('%Y-%m-%d')

    file_name = f'measurements-{current_date}.json'
    file_path = os.path.join('../data/pressure', file_name)

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
    read_pressure()
