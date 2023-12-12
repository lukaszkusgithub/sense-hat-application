import argparse
# from sense_hat import SenseHat
from sense_emu import SenseHat
import json
from datetime import datetime

senseHat = SenseHat()


def read_measurement(arg):
    if arg == "f":
        return senseHat.get_temperature() *  9/5 + 32
    return senseHat.get_temperature()


def main():
    data = {}
    data["value"] = f'{read_measurement(args.u)}'
    if args.u == "f":
        data["unit"] = f'{args.u}'
    else:
        data["unit"] = f'{"C"}'

    data["date"] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    res = json.dumps(data)
    print(res, end="")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-u', default=0)
    args = parser.parse_args()
    main()