/* ----------------------
Calculation
-------------------------*/
let data = {
    item : {
        inc: [],
        exp: []
    },
    total: 0,
    inc: 0,
    exp: 0
}

//income class
class Income {
    constructor(id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }
}

//expense class
class Expense {
    constructor(id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }
}


/* ----------------------
UI Controlling
-------------------------*/
const DOMselector = {
    day: document.querySelector('.calender__day'),
    date: document.querySelector('.calender__date'),
    total: document.querySelector('.calculate__total--value'),
    totalIncome: document.querySelector('.calculate__inc--value'),
    totalExpense: document.querySelector('.calculate__exp--value'),
    inputArea : document.querySelector('.add'),
    addType : document.querySelector(".add__type"),
    addDescription : document.querySelector(".add__description"),
    addValue : document.querySelector(".add__value"),
    addBtn: document.querySelector(".add__btn"),
    incomeList: document.querySelector(".income-list"),
    expenseList: document.querySelector(".expense-list"),
    itemDeleteBtn: document.querySelector(".item__delete"),
    incomeExpenseList: document.querySelector('.inc-exp-list')
}


//insert item to the UI
const insertListItem = (type, description, value) => {
    let HTML, ID, newHTML, newItem, element

    if (data.item[type].length > 0) {
        ID = data.item[type][data.item[type].length - 1].id + 1
    }
    else {
        ID = 0
    }

    if (type === 'inc') {
        newItem = new Income(ID, description, value)
        element = DOMselector.incomeList
        DOMselector.totalIncome.innerHTML = data.inc
    }
    else if (type === 'exp') {
        newItem = new Expense(ID, description, value)
        element = DOMselector.expenseList
        DOMselector.totalExpense.innerHTML = data.exp
    }

    data.item[type].push(newItem) 

    HTML = `<div id="${type}-${ID}" class="item item--${type}"><div class="item__id">%ID%</div><div class="item__description">%DESCRIPTION%</div><div class="item__value">${type === 'inc' ? '+ ' : '- '}%VALUE% <button class="item__delete"> &#10005;</button></div></div>`

    newHTML = HTML.replace('%ID%', ID+1)
    newHTML = newHTML.replace('%DESCRIPTION%', description)
    newHTML = newHTML.replace('%VALUE%', value)

    element.insertAdjacentHTML('beforeend', newHTML)
}

// delete item from UI
const deleteListItem = (el, type, targetId) => {
    let selectId, ids, dataItem
    dataItemType = data.item[type]
    ids = dataItemType.map( (val) => {
        return val.id
    })

    targetIndex = ids.indexOf(targetId)
    if (targetIndex !== -1) { 
        data[type] -= (dataItemType[targetIndex].value)
        data.total = data.inc - data.exp
        dataItemType.splice(targetIndex, 1)

        DOMselector.totalIncome.innerHTML = data.inc
        DOMselector.totalExpense.innerHTML = data.exp
        DOMselector.total.innerHTML = data.total

        el.parentNode.removeChild(el)
    }
}

//controlling adding item and calculation
const cntrlAddListItem = (type) => {
    if (DOMselector.addDescription.value != '' && DOMselector.addValue.value != NaN && DOMselector.addValue.value != '') {
        let val = parseFloat(DOMselector.addValue.value)
        let des = DOMselector.addDescription.value
        data[type] += val
        
        insertListItem(type, des, val)
        
        data.total = data.inc - data.exp
        DOMselector.total.innerHTML = data.total

        DOMselector.addDescription.value = ''
        DOMselector.addDescription.focus()
        DOMselector.addValue.value = ''
    }
}

//controlling deleting item and calculation
const cntrlDeleteListItem = (event) => {
    let el, targetId, splitId,type
    el = event.target.parentNode.parentNode
    if (el.id) {
        splitId = el.id.split('-')
        type = splitId[0]
        targetId = parseInt(splitId[1])

        deleteListItem(el, type, targetId)
    }
    
}

//Date setting
const setDate = () => {
    let newDate, year, month, day, months, days, date
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    
    newDate = new Date()
    date = newDate.getDate()
    day = days[newDate.getDay()]
    month = months[newDate.getMonth()]
    year = newDate.getFullYear()
    
    DOMselector.day.innerHTML = `Today is ${day}`
    DOMselector.date.innerHTML = `${date} ${month}, ${year}`
}

const startApp = () => {
    //changing focus when select income or expense
    DOMselector.addType.addEventListener('change', function () {
        DOMselector.inputArea.classList.toggle('red-focus')
    })
        
    //enter or addbutton to add element to the ui and data structure
    DOMselector.addValue.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            cntrlAddListItem(DOMselector.addType.value)
        }
    }) 
    DOMselector.addBtn.addEventListener('click', function () {
        cntrlAddListItem(DOMselector.addType.value)
    })

    //delete button to delete the item
    DOMselector.incomeExpenseList.addEventListener('click', cntrlDeleteListItem)

    //setting up date
    setDate()
}

/* ----------------------
Main Controller
-------------------------*/
{
    let init = () => {
        console.log(`Application has started`)
        data = {
            item: {
                inc: [],
                exp: []
            },
            total: 0,
            inc: 0,
            exp: 0
        }

        startApp()
    }

    init()
}
