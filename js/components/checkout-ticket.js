// Create a class for the element
class CheckoutTicket extends HTMLElement { /// data = [[code,name,amount,price,total],[code,name,amount,price,total]] |
  shadow = undefined

  static get observedAttributes() {
    return ['data'];
  }
  //headers 
      build() {
      console.log('checkout-ticket build')
      // Create spans
      const wrapper = document.createElement('span')
      this.shadow.appendChild(wrapper)
      
      const data = JSON.parse(this.getAttribute('data'))

      const companyName = document.createElement('h4')
      companyName.className = 'center'
      companyName.textContent = 'Cadena Comercial Oxxo S.A. de C.V.'

      const code = document.createElement('h4')
      code.className = 'center'
      code.textContent = 'CCO-860523-1H4'

      const store = document.createElement('h2')
      store.className = 'center'
      store.textContent = 'XOCHITEC'

      const address = document.createElement('h4')
      address.className = 'center'
      address.textContent = 'Edison Nte. Número 1235 Colonia talleres Monterrey, Nuevo León C.P. 64480 Regimen de Opcional para Grupos de Sociedades'
      
      let acum = 0
      for(let i = 0 ; i < data.length; i ++)
        acum += Number(data[i][4])

      const total = document.createElement('h4')
      total.style='text-align: right; margin: 0px;'
      total.textContent=`Total: $${acum}`

      const taxes = document.createElement('h4')
      taxes.style='text-align: right; margin: 0px;'
      taxes.textContent=`IVA INCLUIDO: $${acum*0.16}`

      wrapper.appendChild(companyName)
      wrapper.appendChild(code)
      wrapper.appendChild(store)
      wrapper.appendChild(address)

      for(let i = 0 ; i < 2 ; i ++){
        const separator = document.createElement('p')
        separator.style=`
          border-top: 3px dashed black;
        `
        wrapper.appendChild(separator)
      }

    ///table
    ///headers

    //const thead  = document.createElement('thead')

    const footer = ["MUCHAS GRACIAS POR SU COMPRA", "PAGO EN UNA SOLA EXHIBICION", "LUGAR DE EXPEDICION", "FELIPE CARRILLO PUERTO", "QUINTANA ROO", "MANZANA 25 ZONA 1 #LOTE 1"]
    const contact = ["email: atencionaclientes@oxxo.com Tel. Myt. 83 20 20 20", "Teléfono sin costo 01 (81) 83 20 20 20"]

    const table = document.createElement('table')
    wrapper.appendChild(table)
    wrapper.appendChild(total)
    wrapper.appendChild(taxes)
    footer.forEach( row => {
      const textNode = document.createElement("p")
      textNode.textContent = row
      textNode.className = 'center'
      wrapper.appendChild(textNode)
    })
    contact.forEach( row => {
      const textNode = document.createElement("p")
      textNode.textContent = row
      textNode.className = 'center'
      wrapper.append(textNode)
    })
    table.className='center'

    //rows
    const tbody = document.createElement('tbody')

    table.appendChild(tbody)

    data.forEach(row=>{
      const tr = document.createElement('tr')
      row.forEach(content=>{
        const td = document.createElement('td')
        td.textContent=content
        tr.appendChild(td)
      })
      tbody.appendChild(tr)
    })

    //style
      const style = document.createElement('style');

      style.textContent = `
        .center{
          text-align:center;
          margin-left: auto;
          margin-right: auto;
        }
      `;
      
      wrapper.appendChild(style)
    }

    constructor() {
      // Always call super first in constructor
      super()
      this.shadow = this.attachShadow({mode: 'open'})
      this.build()
    }
    get data(){
      return this.getAttribute('data')
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      console.log('changed checkouot-ticket')
      while(this.shadow.lastElementChild)
        this.shadow.removeChild(this.shadow.lastElementChild)
      this.build()
    }
  }

  // Define the new element
  customElements.define('checkout-ticket', CheckoutTicket);