/* === COSMETIC LOADER === */

function showLoader(message) {
    let jsonFileHandler_Container = document.createElement("div")
    let jsonFileHandler_Dialogue = document.createElement("div")
    let jsonFileHandler_Heading = document.createElement("h5")
    let jsonFileHandler_Loading = document.createElement("div")

    jsonFileHandler_Container.classList.add("jsonFileHandler-container")
    jsonFileHandler_Dialogue.classList.add("jsonFileHandler-dialogue")
    jsonFileHandler_Heading.classList.add("jsonFileHandler-heading")
    jsonFileHandler_Loading.classList.add("lds-dual-ring")

    jsonFileHandler_Heading.innerHTML = message

    jsonFileHandler_Dialogue.appendChild(jsonFileHandler_Heading)
    jsonFileHandler_Dialogue.appendChild(jsonFileHandler_Loading)
    jsonFileHandler_Container.appendChild(jsonFileHandler_Dialogue)

    document.body.appendChild(jsonFileHandler_Container)
}

function hideLoader() {
    let loaders = document.querySelectorAll(".jsonFileHandler-container")
    Array.prototype.forEach.call(loaders, (loader) => {
        document.body.removeChild(loader)
    })
}