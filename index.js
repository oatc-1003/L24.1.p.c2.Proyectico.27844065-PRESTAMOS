import Oficina from "./clases/Cl_oficina.js";
import Prestamo from "./clases/Cl_prestamo.js";
import Dt_oficina from "./Dt_oficina.js";
import Dt_prestamos from "./Dt_prestamos.js";

let $salida=document.getElementById("salida")
let $opcionSeleccionadaInput=document.getElementById("opcionSeleccionada")
let $mostrarOpcionSeleccionadaBtn=document.getElementById("mostrarOpcionSeleccionada")

let _oficina=new Oficina({montoDisponible:Dt_oficina.montoDisponible, porcComisionMensual:Dt_oficina.porcComisionMensual})
const MESES_FILTRAR_PRESTAMOS=2

Dt_prestamos.forEach(data=>{
    let {prestamo, ...resto}=data
    let _nuevoPrestamo=new Prestamo({monto:prestamo, ...resto})
    _oficina.agregarPrestamo(_nuevoPrestamo)

})

const vistaTablaPrestamos=(prestamos)=>{

    return `
    <h2>Tabla de prestamos</h2>
    <br>
    <table>
        <caption>
            -
        </caption>
        <thead>
            <tr>
            <th scope="col">Cliente</th>
            <th scope="col">Cedula</th>
            <th scope="col">Codigo</th>
            <th scope="col">Monto</th>
            <th scope="col">Cantidad de meses</th>
            <th scope="col">Monto a pagar</th>
            </tr>
        </thead>
    <tbody>
        ${prestamos.map(prestamo=>{

           return ` 
                <tr>
                    <th scope="row">${prestamo.cliente}</th>
                    <td >${prestamo.cedula}</td>
                    <td>${prestamo.codigo}</td>
                    <td>${prestamo.monto}</td>
                    <td>${prestamo.meses}</td>
                    <td>${prestamo.aPagar}</td>
                </tr>
            `
        })
        }
    </tbody>
</table>

    `

}

const vistaEstadisticasPrestamos=(montoPrestamosDisponible,prestamosPorCantidadMeses, prestamosMinimos)=>{

    return `
        <ul>
         <li> El monto final disponible es: ${montoPrestamosDisponible}</li>
         <li> Clientes que pidieron por 2 meses: ${prestamosPorCantidadMeses.map(prestamo=>`${prestamo.cliente}, `)}</li>
         <li> Clientes que pidieron el préstamo mínimo: ${prestamosMinimos.map(prestamo=>`${prestamo.cliente}, `)}</li>

    </ul>
    `
}

const vistaAgregarPrestamo=(oficina)=>{
    let _cliente= prompt("Indica el nombre del cliente");
    let _cedula= +prompt("Indica la cedula del cliente");
    let _prestamo= +prompt("Indica el monto del prestamo");
    let _meses= +prompt("Indica la cantidad de meses de prestamo");
    let _codigo=+prompt("Indica el codigo del prestamo")

        if(!_cliente || !_cedula || !_prestamo || !_meses || !_codigo)return vistaTablaPrestamos(oficina.prestamos)
        
    
    let _nuevoPrestamo= new Prestamo({cliente:_cliente, cedula:_cedula,codigo:_codigo, monto:_prestamo, meses:_meses})
    oficina.agregarPrestamo(_nuevoPrestamo)

    return vistaTablaPrestamos(oficina.prestamos)
}

const vistaEliminarPrestamo=(oficina)=>{

    let _codigo= +prompt("Indica el codigo del prestamo que deseas eliminar");

    oficina.eliminarPrestamo(_codigo)

    return vistaTablaPrestamos(oficina.prestamos)
}

    $salida.innerHTML=`${vistaTablaPrestamos(_oficina.prestamos)}`

    $mostrarOpcionSeleccionadaBtn.addEventListener("click", e=>{
        let _valorOpcionSeleccionada=+$opcionSeleccionadaInput.value

        if(isNaN(_valorOpcionSeleccionada)){
            alert("Tu opcion seleccionada debe ser un número")
        }

        switch (_valorOpcionSeleccionada){
            case 1:
                $salida.innerHTML=`${vistaTablaPrestamos(_oficina.prestamos)}`
            break;

            case 2:
                $salida.innerHTML=`${vistaEstadisticasPrestamos(_oficina.montoDisponibleRestante(),_oficina.prestamosPorCantidadMeses(MESES_FILTRAR_PRESTAMOS),_oficina.prestamosMinimos())}`
            break;

            case 3:
                $salida.innerHTML=vistaAgregarPrestamo(_oficina)
            break;

            case 4:
                $salida.innerHTML=vistaEliminarPrestamo(_oficina)
            break;

            default:
                $salida.innerHTML=`${vistaTablaPrestamos(_oficina.prestamos)}`
            break;
        }

    })