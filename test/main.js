
const emptyChars = /^\s*$/

code = ['','','3','3','3','0','afd']
name = ['','3','','3','3','0','ad']
amount = ['','3','2','','3','0','0']
price = ['','3','2','3','','0','0']

for(let i = 0 ; i < code.length; i ++){
    console.log(emptyChars.test(code[i])|| emptyChars.test(name[i]) || price[i]=='' || isNaN(price[i]) ||!( (/^[1-9][0-9]*$/).test(amount[i]) || amount[i]=='0')
        ? 'no valid' : 'valid'
    )
}
//console.log(isNaN(''))