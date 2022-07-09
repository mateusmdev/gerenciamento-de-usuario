class UserController{
    constructor(view, model){
        this._view = view
        this._model = model

        this.initEvents()
    }

    set view(value){
        this._view = value
    }

    set model(value){
        this._model = value
    }

    initEvents(){
        this.onSubmit()
        this.onToggleDisplay()
        this.onUpdate()
        this.onCancelUpdate()

        this._view.inputFile.addEventListener('change', ()=> {
            let foto = this._view.inputFile.files[0]
            this.getFoto(foto).
            then(resultado => {
                this._view.imgProfile.src = resultado
            }).
            catch(e => console.log)
        })

        let inputUpdatePicture = this._view.updateDisplay.querySelector('#foto-update')
        inputUpdatePicture.addEventListener('change', ()=> {
            let foto = inputUpdatePicture.files[0]
            this.getFoto(foto).
            then(resultado => {
                let profile = this._view.updateDisplay.querySelector('img')
                profile.src = resultado
            }).
            catch(e => console.log)
        })
    }

    onSubmit(){
        this._view.form.addEventListener('submit', evento => {
            evento.preventDefault()
            if (this._view.validaFormulario(this._view.form)){
                this._view.btnSubmit.disabled = true
                let dados = this._view.getDadosFormulario(this._view.form);
                let fotoFile = [...this._view.form.elements].filter(item => {
                    if (item.id === 'foto')
                        return item
                })

                fotoFile = fotoFile[0]
                this.getFoto(fotoFile.files[0]).then(resultado => {
                    dados.foto = resultado
                    this._view.adicionarLinha(dados)
                    this._view.resetFormulario()
                    this._view.resetStyle()
                    this._view.btnSubmit.disabled = false
                }).catch(e => {
                    console.log(e)
                })
            }
        })
    }

    onUpdate(){
        let formUpdate = this._view.updateDisplay.querySelector('form');
        let img = formUpdate.querySelector('img')
        formUpdate.addEventListener('submit', evento => {
            evento.preventDefault()
            if (this._view.validaFormulario(formUpdate)){
                this._view.btnSubmit.disabled = true
                let dados = this._view.getDadosFormulario(formUpdate);
                let fotoFile = [...this._view.form.elements].filter(item => {
                    if (item.id === 'foto')
                        return item
                })

                fotoFile = fotoFile[0]
                this.getFoto(fotoFile.files[0], img.src).then(resultado => {
                    dados.foto = resultado
                    this._view.adicionarLinha(dados)
                    this._view.currentRow.remove()
                    this._view.resetFormulario()
                    this._view.resetStyle()
                    this._view.btnSubmit.disabled = false
                }).catch(e => {
                    console.log(e)
                })
            }
            this._view.resetFormUpdate()
            this._view.removeFormUpdate()
        })
    }

    onCancelUpdate(){
        let buttonCancel = this._view.updateDisplay.querySelector('#btn-cancel-update')
        buttonCancel.addEventListener('click', event => {
            event.preventDefault()
            this._view.resetFormulario()
            this._view.removeFormUpdate()
        })
    }
    
    onToggleDisplay(){
        let buttons = this._view.settingsDisplay.querySelectorAll('a')
        let icons = this._view.settingsDisplay.querySelectorAll('i')

        buttons.forEach((btn, indice) => {

            btn.addEventListener('click', (event) => {
                event.preventDefault()
                let indiceTroca = (indice === 0) ? 1 : 0
                if(!btn.classList.contains('selected')){
                    let aux = icons[indice].classList.value
                    icons[indice].classList.value = icons[indiceTroca].classList.value
                    icons[indiceTroca].classList.value = aux
                    buttons[indiceTroca].classList.remove('selected')
                    buttons[indice].classList.add('selected')
        
                    if (indice == 0){
                        this._view.tableDisplay.style.display = 'initial'
                        this._view.formDisplay.style.display = 'none'
                        this._view.updateDisplay.style.display = 'none'
                        if (this._view.formDisplay.classList.contains('hide')){
                            //this._view.updateDisplay.classList.remove('visible')
                        }
                    }else{
                        this._view.tableDisplay.style.display = 'none'
                        this._view.formDisplay.style.display = 'initial'
                        if (this._view.formDisplay.classList.contains('hide')){
                            console.log('dsfads')
                           // this._view.updateDisplay.classList.add('visible')
                        }
                    }
                }
            })
        })
    }

    getFoto(file, padrao = 'img/user.png'){
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader()
            
            fileReader.onload = ()=> {
                resolve(fileReader.result)
            }

            fileReader.onerror = () => {
                reject()
            }
            if (!file)
                resolve(padrao)
            

            fileReader.readAsDataURL(file);
        })
    }
}