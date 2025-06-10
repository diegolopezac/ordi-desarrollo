// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/alumno', (req, res) => {
    const { cuenta, nombre, promedio, grado, grupo } = req.body;

    if (!cuenta || !nombre || !promedio || !grado || !grupo) {
        return res.status(400).send('Faltan datos del alumno');
    }

    const alumno = { cuenta, nombre, promedio, grado, grupo };
    const filePath = path.join(__dirname, 'alumnos.json');

    let alumnos = [];
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        alumnos = JSON.parse(fileContent);
    }

    alumnos.push(alumno);
    fs.writeFileSync(filePath, JSON.stringify(alumnos, null, 2));

    res.status(201).send('Alumno guardado correctamente');
});

app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});