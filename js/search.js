function searchURL() {
  var value = $("#search").val();
  window.location.href = "index.html?" + value.replace(":", "=");
}

$("#search").keypress(function(e) {
  if (e.which == 13) {
    searchURL();
  }
});