const url = 'http://localhost/vehiculoAereoTerrestre.php';
let vehiculos = [];

const cargarTabla = (tabla, columnas, datos) => {
    tabla.innerHTML = "";
    const primerFila = document.createElement("tr");
    columnas.forEach((c, i) => {
                    const celda = primerFila.insertCell(i);
                    celda.innerHTML = c;
                });
    primerFila.insertCell(columnas.length).innerHTML = "Modificar";
    primerFila.insertCell(columnas.length + 1).innerHTML = "Eliminar";
    tabla.appendChild(primerFila);
    datos.forEach((dato) => {
        if (!dato) {
            return;
        }
        
        const fila = document.createElement("tr");
        fila.id = dato.id;
        
        columnas.forEach((c, i) => {
            const celda = fila.insertCell(i);
            celda.innerHTML = dato[c] === undefined ? "N/A" : dato[c];
        });
        cargarBotonesDeFila(fila);
        
        fila.addEventListener("dblclick", (e) => {
            const vehiculo = vehiculos.find(v => v.id == fila.id);
            cargarABM(vehiculo);
        });
        
        tabla.appendChild(fila);
    });
};

const cargarBotonesDeFila = (fila) => {
    const botonModificar = document.createElement("button");
    botonModificar.textContent = 'Modificar';
    botonModificar.onclick = () => {
        const vehiculo = vehiculos.find(v => v.id == fila.id);
        cargarABM(vehiculo);
    };
    botonModificar.style.height = '100%';
    botonModificar.style.width = '100%';

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.onclick = () => {
        eliminarVehiculo(fila.id);
    };
    botonEliminar.style.height = '100%';
    botonEliminar.style.width = '100%';

    const celdaMod = fila.insertCell(columnas.length);
    celdaMod.appendChild(botonModificar);

    const celdaDel = fila.insertCell(columnas.length + 1);
    celdaDel.appendChild(botonEliminar);
};

const cargarABM = (vehiculo) => {
    const formDatos = document.getElementById("FormDatos");
    formDatos.style.display = "none";
    const formABM = document.getElementById("FormABM");
    formABM.style.display = "block";
    const camposExtra = document.getElementById("camposExtra");
    const botonesABM = document.getElementById("botonesABM");
    cargarCamposAereo(camposExtra);

    if (!vehiculo) {
        document.getElementById("selectTipoContainer").style.display = "block";
        const selectTipo = document.getElementById("selectTipo");
        selectTipo.addEventListener("change", (e) => {
            if (selectTipo.value === "Aereo") {
                cargarCamposAereo(camposExtra);
            } else {
                cargarCamposTerrestre(camposExtra);
            }
        });
        const botonAgregar = document.createElement("button");
        botonAgregar.textContent = "Agregar";
        botonAgregar.addEventListener("click", (e) => {
            e.preventDefault();
            agregarVehiculo();
        });
        botonesABM.appendChild(botonAgregar);
    }

    if (vehiculo) {
        const idVehiculo = document.getElementById("idVehiculo");
        idVehiculo.value = vehiculo.id;
        document.getElementById("modeloInput").value = vehiculo.modelo;
        document.getElementById("anoFabInput").value = vehiculo.anoFab;
        document.getElementById("velMaxInput").value = vehiculo.velMax;
        if (vehiculo instanceof Aereo) {
            cargarCamposAereo(camposExtra, vehiculo);
        }
        if (vehiculo instanceof Terrestre) {
            cargarCamposTerrestre(camposExtra, vehiculo);
        }

        const botonModificar = document.createElement("button");
        botonModificar.textContent = "Modificar";
        botonModificar.addEventListener("click", (e) => {
            e.preventDefault();
            modificarVehiculo();
        });
        botonesABM.appendChild(botonModificar);
    }

    const botonCancelar = document.createElement("button");
    botonCancelar.textContent = "Cancelar";
    botonCancelar.addEventListener("click", cerrarABM);
    botonesABM.appendChild(botonCancelar);
}

const cargarCamposAereo = (contenedor, aereo) => {
    contenedor.innerHTML = "";
    const labelAltMax = document.createElement("label");
    labelAltMax.innerHTML = "Altura Maxima (km)";
    const inputAltMax = document.createElement("input");
    inputAltMax.type = "text";
    inputAltMax.className = "inputABM";
    inputAltMax.placeHolder = "3";
    inputAltMax.id = "altMaxInput";

    const labelAutonomia = document.createElement("label");
    labelAutonomia.innerHTML = "Autonomia";
    const inputAutonomia = document.createElement("input");
    inputAutonomia.type = "number";
    inputAutonomia.className = "inputABM";
    inputAutonomia.placeHolder = "172";
    inputAutonomia.id = "autonomiaInput";

    if (aereo) {
        inputAltMax.value = aereo.altMax;
        inputAutonomia.value = aereo.autonomia;
    }

    contenedor.appendChild(labelAltMax);
    contenedor.appendChild(inputAltMax);
    contenedor.appendChild(labelAutonomia);
    contenedor.appendChild(inputAutonomia);
}

const cargarCamposTerrestre = (contenedor, terrestre = null) => {
    contenedor.innerHTML = "";
    const labelCantPue = document.createElement("label");
    labelCantPue.innerHTML = "Cantidad de Puertas";
    const inputCantPue = document.createElement("input");
    inputCantPue.type = "number";
    inputCantPue.className = "inputABM";
    inputCantPue.placeHolder = "5";
    inputCantPue.id = "cantPueInput";

    const labelCantRue = document.createElement("label");
    labelCantRue.innerHTML = "Cantidad de Ruedas";
    const inputCantRue = document.createElement("input");
    inputCantRue.type = "number";
    inputCantRue.className = "inputABM";
    inputCantRue.placeHolder = "4";
    inputCantRue.id = "cantRueInput";

    if (terrestre) {
        inputCantPue.value = terrestre.cantPue;
        inputCantRue.value = terrestre.cantRue;
    }

    contenedor.appendChild(labelCantPue);
    contenedor.appendChild(inputCantPue);
    contenedor.appendChild(labelCantRue);
    contenedor.appendChild(inputCantRue);
};

const cerrarABM = () => {
    const idInput = document.getElementById("idVehiculo");
    idInput.value = "";
    document.getElementById("modeloInput").value = "";
    document.getElementById("anoFabInput").value = "";
    document.getElementById("velMaxInput").value = "";
    document.getElementById("FormABM").style.display = "none";
    document.getElementById("botonesABM").innerHTML = "";
    document.getElementById("FormDatos").style.display = "block";
};

const validarVehiculo = (vehiculo, rol) => {
    const camposAereo = ["modelo", "anoFab", "velMax", "altMax", "autonomia"];
    const camposTerrestre = ["modelo", "anoFab", "velMax", "cantPue", "cantRue"];
    const camposNecesarios = rol === "Aereo" ? camposAereo : camposTerrestre;

    camposNecesarios.forEach((c) => {
        if (!vehiculo[c] && vehiculo[c] !== 0) {
            throw new Error(`Ingrese ${c} para continuar`);
        }
    });

    if (rol === "Aereo") {
        if (isNaN(vehiculo.altMax) || vehiculo.altMax < 1) {
            throw new Error("La altura maxima no puede ser menor a 1km");
        }
        if (isNaN(vehiculo.autonomia) || vehiculo.autonomia < 1) {
            throw new Error("La autonomia no puede ser menor a 1");
        }
    }

    if (rol === "Terrestre") {
        if (isNaN(vehiculo.cantPue) || vehiculo.cantPue < 1) {
            throw new Error("Si no tiene puertas, no es valido");
        }
        if (isNaN(vehiculo.cantRue) || vehiculo.cantRue < 1) {
            throw new Error("Si no tiene ruedas, no es valido");
        }
    }
}

const agregarVehiculo = () => {
    const rol = document.getElementById("selectTipo").value;
    const modelo = document.getElementById("modeloInput").value;
    const anoFab = document.getElementById("anoFabInput").value;
    const velMax = document.getElementById("velMaxInput").value;
    let vehiculo;
    
    if (rol === "Aereo") {
        const altMax = document.getElementById("altMaxInput").value;
        const autonomia = document.getElementById("autonomiaInput").value;
        vehiculo = {modelo, anoFab, velMax, altMax, autonomia};
    }
    
    if (rol === "Terrestre") {
        const cantPue = document.getElementById("cantPueInput").value;
        const cantRue = document.getElementById("cantRueInput").value;
        vehiculo = {modelo, anoFab, velMax, cantPue, cantRue};
    }
        
    try {
        validarVehiculo(vehiculo, rol);
    } catch(err) {
        alert(err.message);
        return null;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 1) {
            controlarSpinner(true);
        }

        if (this.readyState === 4) {
            controlarSpinner(false);
            if (this.status === 200) {
                const id = JSON.parse(xhttp.responseText).id;
                const v = vehiculo;
                if (v.altMax) {
                    nuevoVehiculo = new Aereo(id, v.modelo, v.anoFab, v.velMax, v.altMax, v.autonomia);
                } else {
                    nuevoVehiculo = new Terrestre(id, v.modelo, v.anoFab, v.velMax, v.cantPue, v.cantRue);
                }
                vehiculos.push(nuevoVehiculo);
                cargarTabla(tabla, columnas, vehiculos);
                cerrarABM();
            } else {
                alert("Lo sentimos, el servicio no esta disponible");
            }
        }
    };
    xhttp.open("PUT", url);
    xhttp.setRequestHeader(
        "Content-Type",
        `application/json`
    );
    xhttp.send(JSON.stringify(vehiculo));
}

const modificarVehiculo = async () => {
    const idInput = document.getElementById("idVehiculo");
    const id = Number(idInput.value)
    const vehiculo = vehiculos.find((v) => v.id === id);
    const rol = vehiculo instanceof Aereo ? "Aereo" : "Terrestre";
    const modelo = document.getElementById("modeloInput").value;
    const anoFab = document.getElementById("anoFabInput").value;
    const velMax = document.getElementById("velMaxInput").value;
    let datosVehiculo;
    
    
    if (rol === "Aereo") {
        const altMax = document.getElementById("altMaxInput").value;
        const autonomia = document.getElementById("autonomiaInput").value;
        datosVehiculo = {id, modelo, anoFab, velMax, altMax, autonomia};
    }
    
    if (rol === "Terrestre") {
        const cantPue = document.getElementById("cantPueInput").value;
        const cantRue = document.getElementById("cantRueInput").value;
        datosVehiculo = {id, modelo, anoFab, velMax, cantPue, cantRue};
    }
        
    try {
        validarVehiculo(datosVehiculo, rol);
    } catch(err) {
        alert(err.message);
        return null;
    }

    controlarSpinner(true);

    const exito = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosVehiculo),
    }).then((response) => {
        if (response.status === 200) {
            return response;
        } else {
            throw new Error();
        }
    }).catch((err) => console.error(err));

    if (!exito) {
        alert("Lo sentimos, no se pudo realizar la operacion");
    }

    if (exito) {
        vehiculo.modelo = datosVehiculo.modelo;
        vehiculo.anoFab = datosVehiculo.anoFab;
        vehiculo.velMax = datosVehiculo.velMax;
        if (rol === "Aereo") {
            vehiculo.altMax = datosVehiculo.altMax;
            vehiculo.autonomia = datosVehiculo.autonomia;
        }
        if (rol === "Terrestre") {
            vehiculo.cantPue = datosVehiculo.cantPue;
            vehiculo.cantRue = datosVehiculo.cantRue;
        }
        cargarTabla(tabla, columnas, vehiculos);
    }

    cerrarABM();
    controlarSpinner(false);
}

const eliminarVehiculo = async (id) => {
    controlarSpinner(true);
    const exito = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
    }).then((response) => {
        if (response.status === 200) {
            return response;
        } else {
            throw new Error();
        }
    }).catch((err) => console.error(err));

    if (!exito) {
        alert("Lo sentimos, no se pudo realizar la operacion");
    }

    if (exito) {
        console.log(exito);
        vehiculos = vehiculos.filter(v => Number(v.id) !== Number(id));
        cargarTabla(tabla, columnas, vehiculos);
    }

    controlarSpinner(false);
}

const selectFiltro = document.getElementById("selectFiltro");
selectFiltro.addEventListener("change", (e) => {
    let datosFiltrados = [];
    
    switch (selectFiltro.value) {
        case "Todos":
            datosFiltrados = vehiculos;
            break;
            case "Aereos":
                datosFiltrados = vehiculos.filter(v => v instanceof Aereo);
            break;
        case "Terrestres":
            datosFiltrados = vehiculos.filter(v => v instanceof Terrestre);
            break;
            default:
                break;
            }
            cargarTabla(tabla, columnas, datosFiltrados);
});

const controlarSpinner = (activar) => {
    const spinnerContainer = document.getElementById("spinnerContainer");
    spinnerContainer.style.display = activar ? "flex" : "none";
};

const columnas = ["id", "modelo", "anoFab", "velMax", "altMax", "autonomia", "cantPue", "cantRue"];
const tabla = document.getElementById("TablaDatos");

const cargarDatos = ()  => {
    controlarSpinner(true);
    fetch(url).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error();
        }
    }).then((data) => {
        vehiculos = data.map((v) => {
            if (v.altMax) {
                return new Aereo(v.id, v.modelo, v.anoFab, v.velMax, v.altMax, v.autonomia);
            } else {
                return new Terrestre(v.id, v.modelo, v.anoFab, v.velMax, v.cantPue, v.cantRue);
            }
        });
    }).catch(() => {
        alert('Lo sentimos, no se pudo realizar la operación');
    }).then(() => {
        cargarTabla(tabla, columnas, vehiculos);
        controlarSpinner(false);
    });
};


document.getElementById("buttonAgregar").addEventListener("click",(e) => {
    e.preventDefault();

    cargarABM();
});

cargarDatos();