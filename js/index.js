data = [[1,2,3,4,5],[6,7,8,9,10]]

const updateDataInHTML = ()=> {
          document.querySelector('data-table').setAttribute('data',JSON.stringify(data))
}

updateDataInHTML()

const addClick = (index) =>{
    Swal.fire({
        title: '<strong>Agregar Producto</strong>',
        icon: 'info',
        html:
            `<form>
            <div>
                Código: <input type='text' id='in_code'/>
            </div>
            <div>
                Nombre: <input type='text' id='in_name'/>
            </div>
            <div>
                Cantidad: <input type='number' id='in_amount'/>
            </div>
            <div>
                Precio: <input type='number' id='in_price'/>
            </div>
            </form>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        allowOutsideClick:false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> ¡Agregar!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> Cancelar',
        cancelButtonAriaLabel: 'Thumbs down'
        }).then(result=>{
        if(result.dismiss!='cancel'){
            const code = document.querySelector('#in_code').value
            const name = document.querySelector('#in_name').value
            const amount = Number(document.querySelector('#in_amount').value)
            const price = Number(document.querySelector('#in_price').value)
            data.splice(index+1,0,[code,name,amount,price,amount*price])
            updateDataInHTML()
        }
        })
    }
    
const removeClick = (index)=>{
    Swal.fire({
        title: '<strong>Borra producto</strong>',
        icon: 'error',
        text: '¿Está seguro de borrar el producto?',
        showCloseButton: true,
        showCancelButton: true,
        allowOutsideClick:false,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Borrar',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> Cancelar',
        cancelButtonAriaLabel: 'Thumbs down'
    }).then(result=> {
        if(result.dismiss!='cancel'){
            data.splice(index,1)
            updateDataInHTML()
        }
    })
}