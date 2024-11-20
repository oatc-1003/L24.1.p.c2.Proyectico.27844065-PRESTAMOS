export default class Prestamo{
    constructor({cliente, cedula, codigo, monto, meses}){
        this.cliente=cliente;
        this.cedula=cedula;
        this.codigo=codigo;
        this.monto=monto;
        this.meses=meses;
    }
    // {cliente: 'Luis',  cedula: 555,codigo: 1111,  prestamo: 1000,  meses: 3  }
    set cliente(nc){
        return this._cliente=nc;
    }
    get cliente(){
        return this._cliente;
    }

    set cedula(c){
        return this._cedula=+c;
    }
    get cedula(){
        return this._cedula;
    }

    set codigo(c){
        return this._codigo=c;
    }
    get codigo(){
        return this._codigo;
    }

    set monto(m){
        return this._monto=+m;
    }
    get monto(){
        return this._monto;
    }

    set meses(cm){
        return this._meses=+cm;
    }
    get meses(){
        return this._meses;
    }
}