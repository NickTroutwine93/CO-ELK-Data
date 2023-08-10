exports.parsingGMUData = function (data,success,hunters) {
    var payload = "<table class='data-table'><thead><tr><th>unit</th><th>bulls</th><th>cows</th><th>calves</th><th>totalHarvest</th><th>totalHunters</th><th>PercSuccess</th><th>totalDays</th><tbody>";
    var length = data["units"].length;
    var returnLenght = 0;
    for(var i = 0; i<length; i++){
        if(data["units"][i]["PercSuccess"]>=success&&data["units"][i]["totalHunters"]<=hunters){
            returnLenght++;
            console.log(data["units"][i])
            var unit = data["units"][i]["unit"];
            var bulls = data["units"][i]["bulls"];
            var cows = data["units"][i]["cows"];
            var calves = data["units"][i]["calves"];
            var totalHarvest = data["units"][i]["totalHarvest"];
            var totalHunters = data["units"][i]["totalHunters"];
            var PercSuccess = data["units"][i]["PercSuccess"];
            var totalDays = data["units"][i]["totalDays"];

            payload+= "<tr><td>"+unit+"</td><td>"+bulls+"</td><td>"+cows+"</td><td>"+calves+"</td><td>"+totalHarvest+"</td><td>"+totalHunters+"</td><td>"+PercSuccess+"</td><td>"+totalDays+"</td></tr>"
        }
    }
    payload+="</tbody></table>"
    console.log(returnLenght);
    return payload;
}