class UserView{
    constructor(){
        this.form = document.querySelector('form')
        this.btnSubmit = document.querySelector('#btn-submit')
        this.tbody = document.querySelector('tbody')
        this.inputFile = document.querySelector('#foto');
        this.imgProfile = document.querySelector('.img-profile img')
        this.settingsDisplay = document.querySelector('.settings')
        this.tableDisplay = document.querySelector('.user')
        this.formDisplay = document.querySelector('.register')
        this.updateDisplay = document.querySelector('.update')
        this.cardAdmin = document.querySelector('#admin-number');
        this.cardUser = document.querySelector('#user-number');
        this.currentRow = null
    }

    resetFormulario(){
        this.form.reset()
        this.imgProfile.src = 'img/user.png'
    }

    resetStyle(){
        [...this.form.elements].forEach(input => {
            let parent = input.parentElement
            parent.classList.remove('required-field')
        })
    }

    getDadosFormulario(form){
        let
         obj = {};
        [...form.elements].forEach(input => {
            if (input.name === 'sexo'){
                if (input.checked){
                    obj[input.name] = input.value
                }
            }else if (input.name === 'admin'){
                obj[input.name] = input.checked
            }else{
                obj[input.id] = input.value
            }
        })

        return obj 
    }

    validaFormulario(form){
        let ok = true
        const REQUIRED = ['nome', 'data-nascimento', 'email', 'senha'];
        [...form.elements].forEach(item => {
            if (REQUIRED.indexOf(item.id) > -1){
                if (!item.value){
                    const parent = item.parentElement
                    parent.classList.add('required-field');
                    ok = false
                }
            }
        })

        return ok
    }

    removeFormUpdate(){
        this.updateDisplay.classList.remove('visible')
        let registerDisplay = document.querySelector('.register');
        registerDisplay.classList.remove('hide')
        let botaoEdit = this.currentRow.querySelector('.button-disabled')
        botaoEdit.classList.remove('button-disabled')
    }

    addFormUpdate(){
        this.updateDisplay.classList.add('visible')
        let registerDisplay = document.querySelector('.register');
        registerDisplay.classList.add('hide')
    }

    resetFormUpdate(){
        let form = this.updateDisplay.querySelector('form')
        form.reset()

        let img = form.querySelector('img')
        img.src = 'img/user.png'
    }

    formUpdateContent(dados){
        let form = this.updateDisplay.querySelector('form');
        [...form.elements].forEach(input => {
            if(input.name === 'sexo'){
                if (input.value === dados.sexo)
                    input.checked = true
            }else if(input.id === 'admin-update'){
                input.checked = dados[input.name]
            }else if(input.classList.contains('update-input')){
                input.value = dados[input.id] 
            }
                
        })

        let updateImgProfile = this.updateDisplay.querySelector('form img')
        updateImgProfile.src = dados.foto
    }

    updateCard(){
        let tds = document.querySelectorAll('.td-admin')
        let admin = 0
        let user = 0

        tds.forEach(td => {
            if (td.innerText === 'Sim'){
                admin++
            }

            user++
        })

        this.cardAdmin.innerText = admin
        this.cardUser.innerText = user
    }

    adicionarLinha(dados){
        let tr = document.createElement('tr');

        tr.innerHTML = `
        <td class="col-img">
            <div class="img-tabela">
                <img src="${dados.foto}" alt="">
            </div>
        </td>
        <td>${dados.nome}</td>
        <td>${dados.email}</td>
        <td class="td-admin">${(dados.admin) ? 'Sim' : 'Não'}</td>
        <td class="botoes">
            <button class="action-button button-edit">
                <i class="far fa-edit"></i>
            </button>
            <button class="action-button button-delete">
                <i class="far fa-trash-alt"></i>
            </button>
        </td>`

        tr.dataset.atributos = JSON.stringify(dados)

        let btnEdit = tr.querySelector('.button-edit')
        let btnDelete = tr.querySelector('.button-delete')

        btnEdit.addEventListener('click', () => {
            if (!btnEdit.classList.contains('button-disabled')){
                this.resetFormUpdate()
                let botaoAtivo = document.querySelector('.button-disabled')
                if (botaoAtivo)
                    botaoAtivo.classList.remove('button-disabled')

                btnEdit.classList.add('button-disabled')
                this.addFormUpdate()
                this.formUpdateContent(JSON.parse(tr.dataset.atributos))
                this.currentRow = tr
            }
        })
        
        btnDelete.addEventListener('click', () => {
            this.updateCard()
            tr.remove()
        })

        this.tbody.appendChild(tr)
        this.updateCard()
    }
}