function writeProjects(body) {
    for(const project of data["projects"]) {
        if(checkFilter(project)) {
            body.append(createProject(project));
        }
    }
}

function createProject(project) {
    const outer = $("<div>").addClass("col-sm-6 col-lg-4 mb-4");
    const projectDiv = $("<div>").addClass("card route-tile");
    const projectCard = $("<div>").addClass("card-body");
    const image = $("<img>").addClass("card-img-top").attr("src", project["imageLink"]);
    const title = $("<h5>").addClass("card-title").text(project["name"]);
    const author = $("<h6>").addClass("card-subtitle mb-2 text-muted").text("By " + project["author"]);
    const description = $("<p>").addClass("card-text").text(project["shortDescription"]);
    const link = $("<a>").addClass("card-link").attr("href", project["websiteLink"]).text("Website").attr("target", "_blank");
    const links = $("<p>").append(link);
    const tags = $("<div>");
    if(project["collaborativeProject"]) {
        const link = $("<a>").addClass("card-link").attr("href", project["collaborativeLink"]).text("GitHub").attr("target", "_blank");
        links.append(link);
        const tag = $("<button>").addClass("col badge rounded-pill bg-secondary btn").text("Collaborative").attr("onclick", "window.location.href='index.html?collaborative'");
        tag.css("margin-right", ".5em");
        tags.append(tag);
    }
    if(project.hasOwnProperty("rlLocation")) {
        const mapLink = $("<a>").addClass("card-link").attr("href", "https://www.openstreetmap.org/search?query=" + project["rlLocation"]["lat"] + "," + project["rlLocation"]["long"]).text("Map").attr("target", "_blank");
        links.append(mapLink);
    }
    if(project["onWiki"]) {
        const link = $("<a>").addClass("card-link").attr("href", project["wikiLink"]).text("Wiki").attr("target", "_blank");;
        links.append(link);
    }
    if(project["country"] != project["websiteCategory"]) {
        const tag = $("<button>").addClass("col badge rounded-pill bg-secondary btn").text(project["country"]).attr("onclick", "window.location.href='index.html?" + project["country"] + "'");
        tag.css("margin-right", ".5em");
        tags.append(tag);
    }
    var tag = $("<button>").addClass("col badge rounded-pill bg-secondary btn").text(project["author"]).attr("onclick", "window.location.href='index.html?" + project["author"] + "'");
    tag.css("margin-right", ".5em");
    tags.append(tag);
    tag = $("<button>").addClass("col badge rounded-pill bg-secondary btn").text(project["websiteCategory"]).attr("onclick", "window.location.href='index.html?" + project["websiteCategory"] + "'");
    tag.css("margin-right", ".5em");
    tags.append(tag);
 
    projectCard.append(image);
    projectCard.append(title);
    projectCard.append(author);
    projectCard.append(description);
    projectCard.append(links);
    projectCard.append(tags);

    projectDiv.append(projectCard);

    outer.append(projectDiv);

    return outer;
}

function checkFilter(project) {
    const query = window.location.search;
    if(query == "") {
        return true;
    }
    var search = decodeURI(query.substring(1));
    search = search.toLowerCase();
    console.log(search);
    if(search == "collaborative") {
        return project["name"].toLowerCase().includes(search) || project["shortDescription"].toLowerCase().includes(search) || project["author"].toLowerCase().includes(search) || project["collaborativeProject"] || project["websiteCategory"].toLowerCase().includes(search);
    }
    if(project["country"] != null) {
        return project["name"].toLowerCase().includes(search) || project["shortDescription"].toLowerCase().includes(search) || project["author"].toLowerCase().includes(search) || project["country"].toLowerCase().includes(search) || project["websiteCategory"].toLowerCase().includes(search);
    }
    return (project["name"].toLowerCase().includes(search) || project["shortDescription"].toLowerCase().includes(search) || project["author"].toLowerCase().includes(search));
}