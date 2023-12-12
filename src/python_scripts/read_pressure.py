import argparse
# from sense_hat import SenseHat
from sense_emu import SenseHat
import json
from datetime import datetime

senseHat = SenseHat()

hPa_to_mmHg_Scaller = 0.75006157584566


def read_measurement(arg):
    if arg == "mmHg":
        return senseHat.get_pressure() * hPa_to_mmHg_Scaller
    return senseHat.get_pressure()


def main():
    data = {}
    data["value"] = f'{read_measurement(args.u)}'
    if args.u == "%":
        data["unit"] = f'{args.u}'
    else:
        data["unit"] = f'{"units"}'

    data["date"] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    res = json.dumps(data)
    print(res, end="")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-u', default=0)
    args = parser.parse_args()
    main()