const express = require("express");
const app = express();
const mysql = require("mysql")
const cors =require("cors")

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "empleados"
});

app.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const correo = req.body.correo;

    db.query('INSERT INTO empleado(nombre,edad,pais,cargo,correo) VALUES(?,?,?,?,?)', [nombre, edad, pais, cargo, correo],
        (err, result) => {
            if (err) {
                console.log(err);

            } else {
                res.send("Empleado registrado con exito!!");
            }
        }
    );
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const correo = req.body.correo;

    db.query('UPDATE empleado SET nombre=?, edad=?, pais=?, cargo=?, correo=? WHERE id=?',
        [nombre, edad, pais, cargo, correo, id],
        (err, result) => {
            if (err) {
                console.log(err);

            } else {
                res.send("Empleado Actualizo con exito!!");
            }
        }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM empleado WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.get("/empleados", (req,res)=>{

    db.query('SELECT * FROM empleado',
        (err, result) => {
            if (err) {
                console.log(err);

            } else {
                res.send(result);
            }
        }
    );
});

app.listen(3001, () => {
    console.log("corriendo el puerto 3001 ")
})