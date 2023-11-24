# from sense_hat import SenseHat
from sense_emu import SenseHat
import sys


color = sys.argv[1]
x = int(sys.argv[2])
y = int(sys.argv[3])

size = (8,8)

sense = SenseHat()

def is_valid_pos(x, y):
    return x >= 0 and x < size[0] and y >= 0 and y < size[1]


def main():
    rgb_color = [int(color[i:i+2], 16) for i in (0, 2, 4)]

    print(rgb_color)
    if not is_valid_pos(x,y):
        return

    sense.set_pixel(x, y, rgb_color[0], rgb_color[1], rgb_color[2])

if __name__ == "__main__":
    main()
