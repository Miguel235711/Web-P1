// Create a class for the element
class DataTable extends HTMLElement {
  static get observedAttributes() {
    return ['data'];
  }
  shadow = undefined
  build(){
    // Create a shadow root
    // Create spans
    const wrapper = document.createElement('span')
    const headers = JSON.parse(this.getAttribute('headers'))
    const data = JSON.parse(this.getAttribute('data'))
    const addClickF = this.getAttribute('add-click')
    const removeClickF = this.getAttribute('remove-click')
  
    const style = document.createElement('style');

    style.textContent = `
      table{
        border: 1px solid black;
        border-collapse: collapse;
      }
    `

    this.shadow.appendChild(wrapper)
    const table = document.createElement('table')
    wrapper.appendChild(style)
    console.log(style.isConnected)
    wrapper.appendChild(table)

    ///headers
    const thead  = document.createElement('thead')
    table.appendChild(thead)
    const tr = document.createElement('tr')
    thead.appendChild(tr)

    headers.forEach(content=>{
      const th = document.createElement('th')
      th.textContent=content
      tr.appendChild(th)
    })

    for(let i = 0; i < 2 ; i ++)
      tr.appendChild(document.createElement('th'))

      //rows
      const tbody = document.createElement('tbody')
      table.appendChild(tbody)

    data.forEach((row,index)=>{
      const tr = document.createElement('tr')
      row.forEach((content,index)=>{
        const td = document.createElement('td')
        td.textContent=(index==3||index==4?'$':'')+content
        tr.appendChild(td)
      })
      
      let addButton = document.createElement('button')
        
      addButton.textContent='+'
      addButton.addEventListener('click',()=>{
        eval(`${addClickF}(${index})`)
      })
        tr.appendChild(addButton)
        let removeButton = document.createElement('button')
        removeButton.addEventListener('click',()=>{
          eval(`${removeClickF}(${index})`)
        })
        removeButton.textContent='-'
        tr.appendChild(removeButton)
        tbody.appendChild(tr)
      })
    }
  constructor() {
    // Always call super first in constructor
    super()
    this.shadow = this.attachShadow({mode: 'open'})
    this.build()
    
  }
  get data(){
    return  this.getAttribute('data')
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('changed')
    while(this.shadow.lastElementChild)
      this.shadow.removeChild(this.shadow.lastElementChild)
    this.build()
  }
}

// Define the new element
customElements.define('data-table', DataTable);