
let _id = localStorage.getItem("_id");
if (!_id) {
  window.location.replace("index.html");
}

function logOut() {
  localStorage.removeItem("_id");
  localStorage.removeItem("name");
  window.location.replace("index.html");

}


