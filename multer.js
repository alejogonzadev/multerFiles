const express = require("express")
const app = express()
const port = 3000

var path = require("path")
var multer = require("multer")

app.post("/subir-archivo", function(request, response){

    //  configurando multer
    const storage = multer.diskStorage ({
        destination: (request,file,cb) => {
            cb(null, "uploads/") // Carpeta de destino para guardar los archivos, debe existir en el proyecto
        },
        filename: (request, file, cb) => {
            cb(null,`${timestamp}-${file.originalname}`) //nombre con el que va a quedar el archivo
        }
    });

    // filtrando los archivos
    const fileFilter = (request, file, cb) => {
        const extensionsesSoportadas = [".jpg", ".jpeg", ".png", ".gif"]  //Extensiones permitidas

        var ext = path.extnname(file.originalname).toLocaleLowerCase()

        if(extensionsesSoportadas.includes(ext)) {
            //Aceptar el archivo
            cb(null, true)
        }else {
            //Rechazar el archivo
            cb({mensaje: "Archivo no autorizado, solo soportamos" + extensionsesSoportadas.join("/")},false)
        }
    }

    const upload = multer({storage, fileFilter}).single("archivo")

    upload(request, response, function(err) {
        if(err) {
            console.log(err)
            resizeBy.json({state:false, mensaje: err.mensaje})
        } else {
            console.log("Todo Ok")
            res.json ({ state: true, mensaje: "Archivo Cargado"})
        }
    })
})


//Escuchando desde el puerto 3000
app.listern(port, () => {
    console.log ("Servidor funcionando por el puerto " + port)
})
