"use strict"

window.addEventListener("load", () => {

    /* MOCK DATA STRUCTURE BEFORE BACKEND FUNCTIONALITY IS APPLIED */
    let items = []
    let startingCash = 0
    let currentIndex = 1
    /* MOCK DATA STRUCTURE BEFORE BACKEND FUNCTIONALITY IS APPLIED */

    // Starting cash
    let startingCashInput = document.querySelector("#starting-cash")
    // Remainder
    let remainderWrapper = document.querySelector("#remainder-wrapper")
    let remainderSpan = document.querySelector("#remainder")
    // Spendings assorted
    let spendingsLowSpan = document.querySelector("#spendings-low")
    let spendingsMediumSpan = document.querySelector("#spendings-medium")
    let spendingsHighSpan = document.querySelector("#spendings-high")
    let totalSpendingsSpan = document.querySelector("#total-spendings")

    let spendings = {
        low: 0,
        medium: 0,
        high: 0,
        total: 0
    }

    let itemForm = document.querySelector("#itemForm")
    let itemTableBody = document.querySelector("#itemTableBody")

    /* === IN-APP OPERATIONS === */
    
        itemForm.addEventListener("submit", (event) => {
            event.preventDefault()
            let name = document.forms["itemForm"].elements["name"].value
            let price = document.forms["itemForm"].elements["price"].value
            let priority = document.forms["itemForm"].elements["priority"].value
            saveItem(name, price, priority)
        })

        startingCashInput.addEventListener("keyup", () => {
            refreshStatus()
        })

        startingCashInput.value = ""
        refreshStatus()
        
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
            refreshStatus()
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
            refreshStatus()
        }

        function refreshStatus() {
            refreshStartingCash()
            refreshInputs()
            refreshSpendings()
            refreshCounters()
            refreshTable()
        }

        function refreshStartingCash() {
            startingCash = parseFloat(startingCashInput.value)
        }
        function refreshInputs() {
            document.forms["itemForm"].elements["name"].value = ""
            document.forms["itemForm"].elements["price"].value = ""
            document.forms["itemForm"].elements["priority"].value = ""
        }
        function refreshSpendings() {
            spendings.low = 0
            spendings.medium = 0
            spendings.high = 0
            spendings.total = 0

            if(items.length > 0) {
                items.forEach((item) => {
                    spendings.total += parseFloat(item.price)
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
        }
        function refreshCounters() {
            spendingsLowSpan.innerHTML = spendings.low.toFixed(2)
            spendingsMediumSpan.innerHTML = spendings.medium.toFixed(2)
            spendingsHighSpan.innerHTML = spendings.high.toFixed(2)
            totalSpendingsSpan.innerHTML = spendings.total.toFixed(2)

            let remainder = parseFloat(startingCashInput.value) - parseFloat(spendings.total)
            remainder = !remainder ? (0 - spendings.total) : remainder
            remainderSpan.innerHTML = remainder.toFixed(2)
            changeRemainderWrapperClass()
        }
        function refreshTable() {
            itemTableBody.innerHTML = ""

            if(items.length === 0) {
                displayNoItemsMessage()
            }
            else {
                fillTable()
            }
        }

        // ALTERNATIVE SOLUTION WITH LESS CODE, BUT LESS PERFORMANT
        /* 
        function getSpendingsAmountByPriority(priority) {
            let returnValue = 0
            if(items.length > 0)
                items.forEach((item) => {
                    if(item.priority.toLowerCase() === priority.toLowerCase())
                        returnValue += parseFloat(item.price)
                })
            return returnValue
        } */

        function displayNoItemsMessage() {
            let th = document.createElement("th")
            th.setAttribute("colspan", "4")

            let heading = document.createElement("h6")
            heading.classList.add("text-center")
            heading.classList.add("text-secondary")
            heading.classList.add("mt-5")
            heading.classList.add("mb-4")
            // heading.classList.add("mb-sm-5")
            heading.innerHTML = "No items added yet."

            th.appendChild(heading)
            itemTableBody.appendChild(th)
        }

        function fillTable() {
            items.forEach((item) => {
                let tableRow = document.createElement("tr")
                let nameCell = document.createElement("td")
                let priceCell = document.createElement("td")
                let priorityCell = document.createElement("td")
                let deleteCell = document.createElement("td")
                let deleteButton = document.createElement("button")
        
                nameCell.innerHTML = item.name
                priceCell.innerHTML = "$" + parseFloat(item.price).toFixed(2)
                priorityCell.innerHTML = item.priority

                deleteCell.classList.add("text-center")
                deleteCell.classList.add("rounded-end")

                deleteButton.classList.add("btn")
                deleteButton.classList.add("btn-danger")
                deleteButton.classList.add("m-0")
                deleteButton.style = "width: 100%; height: 100%; padding: 1ch 0"
                deleteButton.innerHTML = "<i class=\"bi bi-trash-fill\"></i>"
                deleteButton.addEventListener("click", () => {
                    deleteItem(item.id)
                })
                deleteCell.appendChild(deleteButton)

                tableRow.appendChild(nameCell)
                tableRow.appendChild(priceCell)
                tableRow.appendChild(priorityCell)
                tableRow.appendChild(deleteCell)
                tableRow.classList.add("rounded-end")

                switch(item.priority) {
                    case "low":
                            tableRow.classList.add("table-danger")
                        break
                    case "medium":
                            tableRow.classList.add("table-warning")
                        break
                    case "high":
                            tableRow.classList.add("table-success")
                        break
                    default:
                        break
                }
                
                nameCell.classList.add("py-2")
                nameCell.classList.add("m-0")
                priceCell.classList.add("py-2")
                priceCell.classList.add("m-0")
                priorityCell.classList.add("py-2")
                priorityCell.classList.add("m-0")
                deleteCell.classList.add("p-0")
                deleteCell.classList.add("m-0")
                priorityCell.classList.add("fw-semibold")

                itemTableBody.appendChild(tableRow)
            })
        }

        function changeRemainderWrapperClass() {
            try { remainderWrapper.classList.remove("alert-danger") } catch(e) { console.log(e) }
            try { remainderWrapper.classList.remove("alert-warning") } catch(e) { console.log(e) }
            try { remainderWrapper.classList.remove("alert-success") } catch(e) { console.log(e) }
            try { remainderWrapper.classList.remove("border-5") } catch(e) { console.log(e) }
            try { remainderWrapper.classList.remove("my-1") } catch(e) { console.log(e) }
            try { remainderWrapper.classList.remove("mb-1") } catch(e) { console.log(e) }
            remainderWrapper.classList.add("my-1")

            if(parseFloat(remainderSpan.innerHTML) > (parseFloat(startingCashInput.value) / 2))
                remainderWrapper.classList.add("alert-success")
            else if(parseFloat(remainderSpan.innerHTML) > 100)
                remainderWrapper.classList.add("alert-warning")
            else {
                remainderWrapper.classList.add("alert-danger")
                if(parseFloat(remainderSpan.innerHTML) < 0) {
                    remainderWrapper.classList.add("border-5")
                    remainderWrapper.classList.add("mb-1")
                    remainderWrapper.classList.remove("my-1")
                }
            }
        }

    /* === FILE IMPORT/EXPORT ROUTINES === */

        // let uploadForm = document.querySelector("#jsonUploadForm")
        let uploadFile = document.querySelector("#jsonFileInput")
        let uploadButton = document.querySelector("#jsonUploadButton")
        let downloadButton = document.querySelector("#jsonDownloadButton")
        
        uploadButton.addEventListener("click", () => {

            // If there is no file, prompt modal and abort function
            if(!uploadFile.value.length) {
                document.querySelector("#btn-invalidFileModalTrigger").click()
                document.querySelector("#dismissInvalidFileModal").addEventListener("click", () => {
                    document.querySelector("#btn-loadBudget").click()
                })
                return
            }

            // Create a new FileReader object
            let reader = new FileReader()

            // Set up the callback event to run when the file is loaded
            // reader.onload = logFile // ONLY WHILE IN DEVELOPMENT
            reader.onload = function(event) {
                // Cosmetic loading screen
                showLoader("Reading budget file...")
                setTimeout(1000)

                let json = loadBudget(event)

                items = json["items"]
                currentIndex = json["items"].length
                startingCash = json["startingCash"]
                startingCashInput.value = startingCash

                hideLoader()
                document.querySelector("#dismissJsonUploadModal").click()
                refreshStatus()
            } // ONLY WHILE IN PRODUCTION

            // Read the file
            reader.readAsText(uploadFile.files[0])
        })

        downloadButton.addEventListener("click", () => {
            showLoader("Preparing budget file for export...")
            setTimeout(1000)

            saveBudget({
                "startingCash": startingCash,
                "items": items
            })

            hideLoader()
            refreshStatus()
        })
})