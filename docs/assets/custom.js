document.addEventListener('DOMContentLoaded', () => {

    const sensors = document.querySelectorAll('.sensor');
    const sensorsGrid = listToMatrix(sensors, 10);
    const cone = document.querySelector('#cone');

    setInterval(() => {

        let randSensor = '' + Math.floor(Math.random() * 100);
        let z, x;

        let sensor = sensors[randSensor];
        let sensorNorth, sensorEast, sensorSouth, sensorWest;
        setTimeout(() => {
            for (let i = 0; i < sensorsGrid.length; i++) {
                for (let j = 0; j < sensorsGrid[i].length; j++) {
                    if (sensorsGrid[i][j] === sensor) {
                        z = i;
                        x = j;
                        if (i - 1 >= 0) sensorNorth = sensorsGrid[i - 1][j];
                        if (j + 1 <= 9) sensorEast = sensorsGrid[i][j + 1];
                        if (i + 1 <= 9) sensorSouth = sensorsGrid[i + 1][j];
                        if (j - 1 >= 0) sensorWest = sensorsGrid[i][j - 1];
                    }
                }
            }
            sensor.setAttribute('material', 'emissive', '#FFFFFF');
            if (sensorNorth) sensorNorth.setAttribute('material', 'emissive', '#AAAAAA');
            if (sensorEast) sensorEast.setAttribute('material', 'emissive', '#AAAAAA');
            if (sensorSouth) sensorSouth.setAttribute('material', 'emissive', '#AAAAAA');
            if (sensorWest) sensorWest.setAttribute('material', 'emissive', '#AAAAAA');

            setTimeout(() => {
                sensor.removeAttribute('material', 'emissive');
                if (sensorNorth) sensorNorth.removeAttribute('material', 'emissive');
                if (sensorEast) sensorEast.removeAttribute('material', 'emissive');
                if (sensorSouth) sensorSouth.removeAttribute('material', 'emissive');
                if (sensorWest) sensorWest.removeAttribute('material', 'emissive');
            }, 1000);
        }, 2500);

        z = sensor.getAttribute('position').z;
        x = sensor.getAttribute('position').x;
        cone.emit(`beamStart`, null, false);
        setTimeout(() => {
            sensor.components.sound.playSound();
        }, 1500);
        setTimeout(() => {
            cone.emit(`beamEnd`, null, false);
        }, 2500);
        cone.setAttribute('position', {x: x, y: 400, z: z})

    }, 5000);
});

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;
    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }
      matrix[k].push(list[i]);
    }
    return matrix;
}

