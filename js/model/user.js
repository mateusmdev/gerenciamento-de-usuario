class User{
    constructor(nome, sexo, data, pais, email, senha, foto, admin){
        this._nome = nome
        this._sexo = sexo
        this._data = data
        this._pais = pais
        this._email = email
        this._senha = senha
        this._foto = foto
        this._admin = admin
    }

    get nome(){
        return this._nome
    }

    set nome(value){
        this._nome = value
    }

    get sexo(){
        return this._sexo
    }

    set sexo(value){
        this._sexo = value
    }

    get data(){
        return this._data
    }

    set data(value){
        this._data = value
    }

    get pais(){
        return this._pais
    }

    set pais(value){
        this._pais = value
    }

    get email(){
        return this._email
    }

    set email(value){
        this._email = value
    }

    get senha(){
        return this._senha
    }

    set senha(value){
        this._senha = value
    }

    get foto(){
        return this._foto
    }

    set foto(value){
        this._foto = value
    }

    get admin(){
        return this._admin
    }

    set admin(value){
        this._admin = value
    }
}