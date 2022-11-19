class Vehiculo {
    constructor(id, modelo, anoFab, velMax) {
        if (!id || !modelo || !anoFab || !velMax ) {
            throw new Error("Datos obligatorios (id, modelo, anoFab, velMax)");
        }
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
    }
}

class Aereo extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
        super(id, modelo, anoFab, velMax);
        this.altMax = altMax;
        this.autonomia = autonomia;
    }
}

class Terrestre extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
        super(id, modelo, anoFab, velMax);
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }
}