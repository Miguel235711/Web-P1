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
  
    //console.log(data)

    //wrapper.setAttribute('class', 'wrapper')

    /*const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0);

    const info = document.createElement('span');
    info.setAttribute('class', 'info');*/

    // Take attribute content and put it inside the info span
    /*const text = this.getAttribute('data-text');
    info.textContent = text;*/

    // Insert icon
    /*let imgUrl;
    if(this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img');
    } else {
      imgUrl = 'img/default.png';
    }

    const img = document.createElement('img');
    img.src = imgUrl;
    icon.appendChild(img);*/

    // Create some CSS to apply to the shadow dom
    /*const style = document.createElement('style');
    console.log(style.isConnected);

    style.textContent = `
      .wrapper {
        position: relative;
      }
      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }
      img {
        width: 1.2rem;
      }
      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;*/

    // Attach the created elements to the shadow dom
    //shadow.appendChild(style);
    //console.log(style.isConnected);
    

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

      //console.log('end of constructor')
      //console.log(`table: ${table}`)
      /*wrapper.appendChild(icon);
      wrapper.appendChild(info);*/
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