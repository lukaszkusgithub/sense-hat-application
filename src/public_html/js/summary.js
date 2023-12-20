const settings_btn = document.getElementById("settings_btn");
const settings = document.getElementById("settings");
const settings_confirm_btn = document.getElementById("settings_confirm_btn")
let pressure_unit = 'hPa';
let humidity_unit = 'units';
let rpy_unit = 'deg';
let temp_unit = 'C';

settings_btn.addEventListener('click', ()=>{
    settings.style.display = settings.style.display != 'block' ? 'block' : 'none';
})

settings_confirm_btn.addEventListener('click', ()=>{
    temp_unit = document.querySelector('input[name="temp"]:checked').value;
    humidity_unit = document.querySelector('input[name="hum"]:checked').value;
    rpy_unit = document.querySelector('input[name="rpy"]:checked').value;
    pressure_unit = document.querySelector('input[name="pressure"]:checked').value;
    settings.style.display = settings.style.display != 'block' ? 'block' : 'none';
})

function updateTemp(response, selectedUnit) {
    let value = selectedUnit === "F" ? (response[0].value * 9) / 5 + 32 : response[0].value;
    value = Math.round(value * 100) / 100
    document.getElementById("temperature_unit").innerHTML = selectedUnit;
    document.getElementById("temperature_value").innerHTML = value;
}

function updateHum(response, selectedUnit) {
    let value = selectedUnit === "units" ? response[0].value / 100 : response[0].value;
    value = Math.round(value * 100) / 100
    document.getElementById("humidity_unit").innerHTML = selectedUnit;
    document.getElementById("humidity_value").innerHTML = value;
}

function updatePres(response, selectedUnit) {
    let value = selectedUnit === "mmHg" ? response[0].value * hPa_to_mmHg_Scaller : response[0].value;
    value = Math.round(value * 100) / 100
    document.getElementById("pressure_unit").innerHTML = selectedUnit;
    document.getElementById("pressure_value").innerHTML = value;
}

function updateRPY(response, selectedUnit) {
    let valueR = selectedUnit === "rad" ? response[0].roll.value * degreeToRadianScaller : response[0].roll.value;
    let valueP = selectedUnit === "rad" ? response[0].pitch.value * degreeToRadianScaller : response[0].pitch.value;
    let valueY = selectedUnit === "rad" ? response[0].yaw.value * degreeToRadianScaller : response[0].yaw.value;
    valueR = Math.round(valueR * 100) / 100
    valueP = Math.round(valueP * 100) / 100
    valueY = Math.round(valueY * 100) / 100
    document.getElementById("roll_unit").innerHTML = selectedUnit;
    document.getElementById("pitch_unit").innerHTML = selectedUnit;
    document.getElementById("yaw_unit").innerHTML = selectedUnit;
    document.getElementById("roll_value").innerHTML = valueR;
    document.getElementById("pitch_value").innerHTML = valueP;
    document.getElementById("yaw_value").innerHTML = valueY;
}

function getFormattedDate() {
	const today = new Date();

	const year = today.getFullYear();
	const month = (today.getMonth() + 1).toString().padStart(2, "0");
	const day = today.getDate().toString().padStart(2, "0");

	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}

function getMeasurment() {
    const todayFormatted = getFormattedDate();

    const fileName = `measurements-${todayFormatted}.json`;
    const pathToTempData = "../../../data/temperature/" + fileName;
    const pathToHumData = "../../../data/humidity/" + fileName;
    const pathToRPYData = "../../../data/rpy/" + fileName;
    const pathToPresData = "../../../data/pressure/" + fileName;

    $.ajax({
        type: "GET",
        url: pathToTempData,
        dataType: "json",
        success: function (response) {
            const limit = 1;
            const limitedData = response.slice(0, limit);
            updateTemp(limitedData, temp_unit);
        },
        error: function (error) {
            // console.warn("Błąd podczas wczytywania pliku JSON", error);
        },
    });

    $.ajax({
        type: "GET",
        url: pathToHumData,
        dataType: "json",
        success: function (response) {
            const limit = 1;
            const limitedData = response.slice(0, limit);
            updateHum(limitedData, humidity_unit);
        },
        error: function (error) {
            // console.warn("Błąd podczas wczytywania pliku JSON", error);
        },
    });

    $.ajax({
        type: "GET",
        url: pathToRPYData,
        dataType: "json",
        success: function (response) {
            const limit = 1;
            const limitedData = response.slice(0, limit);
            updateRPY(limitedData, rpy_unit);
        },
        error: function (error) {
            // console.warn("Błąd podczas wczytywania pliku JSON", error);
        },
    });

    $.ajax({
        type: "GET",
        url: pathToPresData,
        dataType: "json",
        success: function (response) {
            const limit = 1;
            const limitedData = response.slice(0, limit);
            updatePres(limitedData, pressure_unit);
        },
        error: function (error) {
            // console.warn("Błąd podczas wczytywania pliku JSON", error);
        },
    });
}

$(document).ready(function () {
    var selectedTime = 100
    let intervalId = setInterval(getMeasurment, selectedTime);
});
