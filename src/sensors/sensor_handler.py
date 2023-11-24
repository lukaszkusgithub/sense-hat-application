from sense_hat import SenseHat

class SensorHandler:
    def __init__(self):
        self.sense = SenseHat()

    def get_sensor_data(self):
        temperature = round(self.sense.get_temperature(), 2)
        humidity = round(self.sense.get_humidity(), 2)
        pressure = round(self.sense.get_pressure(), 2)
        return {'temperature': temperature, 'humidity': humidity, 'pressure': pressure}
