function addLocations() {
    for(const project of data["projects"]) {
        if(project.hasOwnProperty("rlLocation")) {
            if(project["rlLocation"]["lat"] != undefined && project["rlLocation"]["long"] != undefined) {
                var lat = project["rlLocation"]["lat"];
                var long = project["rlLocation"]["long"];
                L.marker([lat, long]).addTo(map)
                    .bindPopup(project["name"] + "<br>By " + project["author"] + "<br>" + getLinks(project));
            }
        }
    }
}

function getLinks(project) {
    var links = "";
    if(project.hasOwnProperty("websiteLink")) {
        links += "<a href='" + project["websiteLink"] + "' target='_blank'>Website</a>";
    }
    if(project["collaborativeProject"]) {
        links += " | <a href='" + project["collaborativeLink"] + "' target='_blank'>Github</a>";
    }
    if(project["onWiki"]) {
        links += " | <a href='" + project["wikiLink"] + "' target='_blank'>Wiki</a>";
    }
    return links;
}