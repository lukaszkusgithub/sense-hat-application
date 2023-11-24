# from sense_hat import SenseHat
from sense_emu import SenseHat
import json

sense = SenseHat()

def main():
    pixel_list = sense.get_pixels()
    response = json.dumps(pixel_list)
    print(response, end="")


if __name__ == "__main__":
    main()
