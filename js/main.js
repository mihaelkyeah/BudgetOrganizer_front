'use strict'

window.addEventListener("load", () => {

    let items = []
    let itemForm = document.querySelector("#itemForm")
    let itemTableBody = document.querySelector("#itemTableBody")
    
    itemForm.addEventListener("submit", (event) => {
        event.preventDefault()
        
        let name = document.forms["itemForm"].elements["name"].value
        let price = document.forms["itemForm"].elements["price"].value
        let priority = document.forms["itemForm"].elements["priority"].value
        saveItem(name, price, priority)
        refreshTable()
    })
    
    function saveItem(name, price, priority) {
        /* CREATE JSON */
        let item = {
            "name": name,
            "price": price,
            "priority": priority
        }

        /* SAVE TO DATA STRUCTURE (ARRAY) */
        items.push(item)
    }
    
    function refreshTable() {
        itemTableBody.innerHTML = ""

        items.forEach((item) => {
            let tableRow = document.createElement("tr")
            let nameCell = document.createElement("td")
            let priceCell = document.createElement("td")
            let priorityCell = document.createElement("td")
    
            nameCell.innerHTML = item.name
            priceCell.innerHTML = item.price
            priorityCell.innerHTML = item.priority

            tableRow.appendChild(nameCell)
            tableRow.appendChild(priceCell)
            tableRow.appendChild(priorityCell)

            itemTableBody.appendChild(tableRow)
        })
    }

})