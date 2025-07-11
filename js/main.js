var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var bookmarkTable =document.getElementById("bookmarkTable");

var nameRegex =/^[A-Za-z0-9]{3,}$/ ;
var urlRegex = /^(https?:\/\/)[\w\-\.]+/;

if(localStorage.getItem("bookmarks") == null){
    bookmarks = [];
}
else{
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    display();
}

submitBtn.onclick = function(){
    if(!isNameValid(siteName.value) || !isUrlValid(siteUrl.value)) return;

    var bookmark = {
        name :siteName.value,
        url:siteUrl.value
    }
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks) );
    display();
    clear();

}

function display(){
    marks = ``;
    for(var i = 0; i < bookmarks.length; i++){
        marks += `<tr>
        <td>${i}</td>
        <td>${bookmarks[i].name}</td>
        <td><a href=" ${bookmarks[i].url}" target="_blank"><button class="btn btn-success">Visit</button></a></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`
            console.log(bookmarks[i].url);
    }
    bookmarkTable.innerHTML = marks;

}

function clear()
{
    siteName.value = "";
    siteUrl.value = "";
}
 function deleteBookmark(index){
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    display();

 }

 function isNameValid(name){
    if(nameRegex.test(name)){
        return true;
    }
    else{
        alert("Name must be at least 3 characters long and contain only letters and numbers.");
        return false;
    }

 }

 function isUrlValid(url){
    if(urlRegex.test(url))
    {
        return true;
    }
    else{
        alert("Please enter a valid URL starting with http:// or https://");
        return false;
    }
 }