export default class Oficina{
    constructor({montoDisponible, porcComisionMensual}){
        
        this.prestamos=[]
        this.montoDisponible=montoDisponible;
        this.porcComisionMensual=porcComisionMensual;
    }

    agregarPrestamo(prestamo){
        prestamo.aPagar= this.calcMontoPagar(prestamo.meses, prestamo.monto)
        
        this.prestamos.push(prestamo)
    }

    eliminarPrestamo(codigoPrestamo){

        for (let i = 0; i < this.prestamos.length; i++){
            if (this.prestamos[i].codigo === codigoPrestamo){
                this.prestamos.splice(i, 1);
                break
            }
        }

    }

    montoDisponibleRestante(){
        let montoUsado=this.prestamos.reduce((suma, prestamo) => suma + prestamo.monto, 0);

        return this.montoDisponible - montoUsado
    }

    prestamosPorCantidadMeses(meses){
        let prestamosFiltrados =this.prestamos.filter(prestamo=>prestamo.meses===meses)
        
        return prestamosFiltrados
    }

    prestamosMinimos(){
        let montoMinimo=Math.min(...this.prestamos.map(prestamo=>prestamo.monto))
        
        let prestamosFiltrados=this.prestamos.filter(prestamo=>prestamo.monto===montoMinimo)
       
        return prestamosFiltrados

    }
    calcMontoPagar(meses, montoPrestamo){
        let porcDecimal=this.porcComisionMensual / 100

        let comision=montoPrestamo * porcDecimal

        let montoTotal=montoPrestamo + (comision * meses)

        return montoTotal
    }
}