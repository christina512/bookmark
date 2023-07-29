let siteName = document.getElementById("siteName");
let siteURL = document.getElementById("siteURL");
let localStorageKey = "allBookmarks";
let bookmarkArr =[];


if (JSON.parse(localStorage.getItem(localStorageKey))){
  bookmarkArr =JSON.parse(localStorage.getItem(localStorageKey))
}
displayBookmark()

// add function

function addBookmark() {
  const bookmarkName = siteName.value;
  const bookmarkURL = siteURL.value;

  if (bookmarkName === "" || bookmarkURL === "") {
    sweetAlert("Please enter both the name and URL of the bookmark.");
  }else if( validNameAlert() && validUrlAlert() ){
  let checkName = true;
  for (let i = 0; i < bookmarkArr.length; i++) {
    if (bookmarkArr[i].name === bookmarkName) {
      checkName = false;
      break;
    }
  }
  
  if (checkName) {
    let bookmark = {
      name: bookmarkName,
      url: bookmarkURL,
    };

    bookmarkArr.push(bookmark);
    addToLocalStorage();
    displayBookmark();
  } else {
      sweetAlert("This name is already used for another bookmark.");
  }
  }
  clearInputs();
  clearInputBorder();
}

console.log(bookmarkArr);

// local storage function

function addToLocalStorage(){
  localStorage.setItem(localStorageKey, JSON.stringify(bookmarkArr));
}



// display function

function displayBookmark(){
    var blackBox =""
for (let i = 0; i < bookmarkArr.length; i++) {
  blackBox += ` <tr>
<td>${i + 1 }</td>
<td>${bookmarkArr[i].name}</td>
<td><button class="btn btn-success" onclick= "window.location.href='http://${bookmarkArr[i].url}';"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
<td><button class="btn btn-danger" onclick= "deleteBookmark(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
</tr>`
}
document.getElementById("bookmarkData").innerHTML = blackBox;
}



// clear function

function clearInputs (){
  siteName.value= "";
  siteURL.value= "";
}


// delete function

function deleteBookmark(index){
  bookmarkArr.splice(index,1);
  displayBookmark();
  addToLocalStorage()
}


// bookmark name validation function

function validBookmarkName(){
  let pattern = /^[A-Za-z]{3,10}$/;
  let validName = pattern.test(siteName.value);
  return validName
}
function validNameAlert(){
let name=validBookmarkName()
  if(name){
    document.getElementById("name-validation").classList.replace("d-block","d-none");
  }else{
    document.getElementById("name-validation").classList.replace("d-none","d-block");
    sweetAlert("invalid site name", "Site name must contain at least 3 characters", "error");
  }
   return name;
}


// URL validation function

function validSiteUrl(){
  let pattern = /^(www)\.([\w.-]+)\.([a-z]{2,})(:\d{2,5})?(\/[\w.-]*)*\/?(\?[a-z0-9%_.~+=-]*)?(#[\w-]*)?$/i;
   
  let validUrl = pattern.test(siteURL.value);
  return validUrl
}
function validUrlAlert(){
  let url =validSiteUrl()
  if (url){
    document.getElementById("url-validation").classList.replace("d-block","d-none");
  }else{
    document.getElementById("url-validation").classList.replace("d-none","d-block");
    sweetAlert("invalid URL", "url must be like (www.example.com)", "error");
  }
return url
}


// typing validation

function siteNameTyping(){
  if (validBookmarkName()) {
    document.getElementById("siteName").classList.add("is-valid");
    document.getElementById("siteName").classList.remove("is-invalid");
  } 
  else {
    document.getElementById("siteName").classList.add("is-invalid");
    document.getElementById("siteName").classList.remove("is-valid");
  }
}

function siteUrlTyping(){
  if (validSiteUrl()) {
    document.getElementById("siteURL").classList.add("is-valid");
    document.getElementById("siteURL").classList.remove("is-invalid");
  } else {
    document.getElementById("siteURL").classList.add("is-invalid");
    document.getElementById("siteURL").classList.remove("is-valid");
  }
}


function clearInputBorder(){
  document.getElementById("siteName").classList.remove("is-valid");
  document.getElementById("siteURL").classList.remove("is-valid");
  document.getElementById("siteURL").classList.remove("is-invalid");
  document.getElementById("siteName").classList.remove("is-invalid");

}

