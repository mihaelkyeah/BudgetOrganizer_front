'use strict'

window.addEventListener("load", () => {

    let startingCashInput = document.querySelector("#starting-cash")
    let remainderWrapper = document.querySelector("#remainder-wrapper")
    let remainderSpan = document.querySelector("#remainder")
    let spendingsLowSpan = document.querySelector("#spendings-low")
    let spendingsMediumSpan = document.querySelector("#spendings-medium")
    let spendingsHighSpan = document.querySelector("#spendings-high")
    let totalSpendingsSpan = document.querySelector("#total-spendings")

    let spendings = {
        low: 0,
        medium: 0,
        high: 0,
    }

    /* MOCK DATA STRUCTURE BEFORE BACKEND FUNCTIONALITY IS APPLIED */
    let items = []
    let currentIndex = 1
    /* MOCK DATA STRUCTURE BEFORE BACKEND FUNCTIONALITY IS APPLIED */

    let itemForm = document.querySelector("#itemForm")
    let itemTableBody = document.querySelector("#itemTableBody")
    
    itemForm.addEventListener("submit", (event) => {
        event.preventDefault()
        let name = document.forms["itemForm"].elements["name"].value
        let price = document.forms["itemForm"].elements["price"].value
        let priority = document.forms["itemForm"].elements["priority"].value
        saveItem(name, price, priority)
    })
    
    function saveItem(name, price, priority) {
        /* CREATE JSON */
        let item = {
            "id": currentIndex,
            "name": name,
            "price": price,
            "priority": priority
        }

        /* ACTUALIZE ARTIFICIAL ITEM ID (WITHOUT BACKEND) */
        currentIndex++

        /* SAVE TO DATA STRUCTURE (ARRAY) */
        items.push(item)
        refreshTable()
    }

    function deleteItem(id) {
        let itemCollectionIndex = 0
        let found = false
        while(!found && itemCollectionIndex < items.length) {
            if(items[itemCollectionIndex].id !== id)
                itemCollectionIndex++
            else {
                items.splice(itemCollectionIndex, 1)
                found = true
            }
        }
        refreshTable()
    }
    
    function refreshTable() {
        itemTableBody.innerHTML = ""

        if(items.length === 0) {
            let th = document.createElement("th")
            th.setAttribute("colspan", "4")

            let heading = document.createElement("h6")
            heading.classList.add("text-center")
            heading.classList.add("text-secondary")
            heading.classList.add("mt-3")
            heading.classList.add("mb-0")
            heading.innerHTML = "No items added yet."

            th.appendChild(heading)
            itemTableBody.appendChild(th)
        }
        else {
            items.forEach((item) => {
                let tableRow = document.createElement("tr")
                let nameCell = document.createElement("td")
                let priceCell = document.createElement("td")
                let priorityCell = document.createElement("td")
                let deleteCell = document.createElement("td")
                let deleteButton = document.createElement("button")
        
                nameCell.innerHTML = item.name
                priceCell.innerHTML = "$" + item.price
                priorityCell.innerHTML = item.priority

                deleteCell.classList.add("text-center")
                deleteButton.classList.add("btn")
                deleteButton.classList.add("btn-danger")
                deleteButton.innerHTML = "<i class=\"bi bi-trash-fill\"></i>"
                deleteButton.addEventListener("click", () => {
                    deleteItem(item.id)
                })
                deleteCell.appendChild(deleteButton)

                tableRow.appendChild(nameCell)
                tableRow.appendChild(priceCell)
                tableRow.appendChild(priorityCell)
                tableRow.appendChild(deleteCell)

                switch(item.priority) {
                    case "low":
                        priorityCell.classList.add("bg-danger")
                        priorityCell.classList.add("text-white")
                        break
                    case "medium":
                        priorityCell.classList.add("bg-warning")
                        break
                    case "high":
                        priorityCell.classList.add("bg-success")
                        priorityCell.classList.add("text-white")
                        break
                    default:
                        break
                }

                priorityCell.classList.add("fw-semibold")

                itemTableBody.appendChild(tableRow)
            })
        }
        refreshInputs()
        refreshCounters()
    }

    function refreshInputs() {
        document.forms["itemForm"].elements["name"].value = ""
        document.forms["itemForm"].elements["price"].value = ""
        document.forms["itemForm"].elements["priority"].value = ""
    }

    function refreshCounters() {
        let totalSpendings = 0
        spendings.low = 0
        spendings.medium = 0
        spendings.high = 0
        if(items.length > 0) {
            items.forEach((item) => {
                totalSpendings += parseFloat(item.price)
                switch(item.priority) {
                    case "low":
                        spendings.low += parseFloat(item.price)
                        break
                    case "medium":
                        spendings.medium += parseFloat(item.price)
                        break
                    case "high":
                        spendings.high += parseFloat(item.price)
                        break
                    default:
                        break
                }
            })
        }
        let remainder = parseFloat(startingCashInput.value) - parseFloat(totalSpendings)
        totalSpendingsSpan.innerHTML = totalSpendings
        remainderSpan.innerHTML = remainder
        
        spendingsLowSpan.innerHTML = spendings.low
        spendingsMediumSpan.innerHTML = spendings.medium
        spendingsHighSpan.innerHTML = spendings.high
    }

    startingCashInput.value = ""
    refreshTable()

})