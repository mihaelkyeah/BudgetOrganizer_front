/* TEST PROCESS TO SEE DATA*/
function logFile(event) {
    let str = event.target.result;
    let json = JSON.parse(str)
    console.log("string: "+str+"\n\n")
    console.log("json:")
    console.log(json)
    console.log("Items: "+json.items.length)
}
function loadBudget(event) {
    let str = event.target.result;
    let json = JSON.parse(str)    
    return json
}
function saveBudget(jsonData) {
    let filename = "budget-organizer-"+Date.now()+".json";
    // The third argument in JSON.stringify (tab sizing) enables pretty printing
    let jsonStr = JSON.stringify(jsonData, null, 2);

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}