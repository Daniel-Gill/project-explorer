var availableTags = getTags();

$("#search").autocomplete({
  source: availableTags
});

function getTags() {
  var tags = [];
  for(const project of data["projects"]) {
    if(!tags.includes("Country:" + project["country"]) && project["country"] != undefined) {
      tags.push("Country:" + project["country"]);
    }
    if(!tags.includes("Category:" + project["websiteCategory"])) {
      tags.push("Category:" + project["websiteCategory"]);
    }
    if(!tags.includes("Author:" + project["author"])) {
      tags.push("Author:" + project["author"]);
    }
  }
  tags.push("Collaborative");
  return tags;
}

function searchURL() {
  var value = $("#search").val();
  window.location.href = "index.html?" + value.replace(":", "=");
}