data = [[1,2,3,4,5],[6,7,8,9,10]]

const updateDataInHTML = ()=> {
    document.querySelector('data-table').setAttribute('data',JSON.stringify(data))
}

updateDataInHTML()

const addProduct = (index)=>{
    console.log(`index ${index}`)
    const title = document.createElement('strong')
    title.textContent = 'Agregar Producto'
    const form = document.createElement('form');
    [
        {title:'Código',type:'text',id:'in_code'},
        {title:'Nombre',type:'text',id:'in_name'},
        {title:'Cantidad',type:'number',id:'in_amount'},
        {title:'Precio',type:'number',id:'in_price'}
    ].forEach(divConf=>{
        const div = document.createElement('div')
        const titleText = document.createTextNode(`${divConf.title}: `)
        const input = document.createElement('input')
        input.setAttribute('type',divConf.type)
        input.setAttribute('id',divConf.id)
        div.appendChild(titleText)
        div.appendChild(input)
        form.appendChild(div)
    })
    Swal.fire({
        title: title,
        icon: 'info',
        html: form,
        showCancelButton: true,
        focusConfirm: false,
        allowOutsideClick:false,
        confirmButtonText: '¡Agregar!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: 'Cancelar',
        cancelButtonAriaLabel: 'Thumbs down'
        })
        .then(
            result=>{
            console.log(`dismissed`)
            if(result.dismiss!='cancel') {
                const code = document.querySelector('#in_code').value
                const name = document.querySelector('#in_name').value
                let amount =document.querySelector('#in_amount').value
                let price = document.querySelector('#in_price').value
                const emptyChars= /^\s*$/

                if(emptyChars.test(code)|| emptyChars.test(name) || price=='' || isNaN(price) ||!( (/^[1-9][0-9]*$/).test(amount))){
                    console.log("No valid")
                    alert("Por favor llene correctamente todos los campos ")
                    return 
                }
                amount = Number(amount)
                price = Number(price)
                data.splice(index,0,[code,name,amount,price,amount*price])
                updateDataInHTML()
            }
        })
}

const addClick = (index) =>{
    addProduct(index+1)
}

const addClickGlobal = () =>{
    addProduct(data.length)
}
    
const removeClick = (index)=>{
    const title = document.createElement('strong')
    title.textContent = 'Borrar producto'
    Swal.fire({
        title: title,
        icon: 'error',
        text: '¿Está seguro de borrar el producto?',
        showCloseButton: true,
        showCancelButton: true,
        allowOutsideClick:false,
        focusConfirm: false,
        confirmButtonText: 'Borrar',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: 'Cancelar',
        cancelButtonAriaLabel: 'Thumbs down'
    }).then(result=> {
        if(result.dismiss!='cancel'){
            data.splice(index,1)
            updateDataInHTML()
        }
    })
}
addEventListener('DOMContentLoaded',()=>{
    //console.log(`data.length: ${data.length}`)
    document.querySelector('#btn_addGlobal').addEventListener('click',addClickGlobal)
    document.querySelector('#btn_createNote').addEventListener('click',()=>{
        console.log('click checkout-ticket')
        const checkoutTicketElement = document.querySelector('checkout-ticket')
        checkoutTicketElement.removeAttribute('hidden')
        checkoutTicketElement.setAttribute('data',JSON.stringify(data))
    })
})