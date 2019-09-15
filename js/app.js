console.log("Inside App.js");
showNotes();
// if user Adds a note, add it to localstorage
let addBtn= document.getElementById('addBtn');
addBtn.addEventListener("click", (e)=>{
    let addTxt= document.getElementById("addTxt");
    let noteTitle= document.getElementById("noteTitle");
    let titles= localStorage.getItem("titles");
    let notes= localStorage.getItem("notes");
    if(notes==null){
        notesTitleObj=[];
        notesObjForArray=[];
    }else{
        notesTitleObj= JSON.parse(titles);
        notesObjForArray= JSON.parse(notes);
    }
    notesTitleObj.push(noteTitle.value);
    notesObjForArray.push(addTxt.value);
    localStorage.setItem("titles", JSON.stringify(notesTitleObj));
    localStorage.setItem("notes", JSON.stringify(notesObjForArray));
    noteTitle.value= "";
    addTxt.value= "";
    //console.log(notesObjForArray);
    
    showNotes();
});
//function to show all notes from Local Storage
function showNotes(){
    let notes= localStorage.getItem("notes");
    let titles= localStorage.getItem("titles");
    if(notes==null){
        notesTitleObj=[];
        notesObjForArray=[];
    }else{
        notesTitleObj= JSON.parse(titles);
        notesObjForArray= JSON.parse(notes);
    }
    let html= "";
    let noteTitle= document.getElementsByClassName("noteTitle");
    
    notesObjForArray.forEach((element, index)=>{
        html += `
        <div class=" noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="cardTitle">${notesTitleObj[index]}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" href="#" class="btn btn-primary">Delete</button>
                </div>
                
            </div> `;
    });
    let notesElm= document.getElementById("notes");
    if(notesObjForArray.length!=0){
        notesElm.innerHTML= html;
    }else{
        notesElm.innerHTML=`No Notes yet`;
    }
}

//function to delete a note
function deleteNote(index){
    //console.log("deleting this note", index);
    let notes= localStorage.getItem("notes");
    let titles= localStorage.getItem("titles");
    if(notes==null){
        notesTitleObj=[];
        notesObjForArray=[];
    }else{
        notesTitleObj= JSON.parse(titles);
        notesObjForArray= JSON.parse(notes);
    }
    notesTitleObj.splice(index+1);
    notesObjForArray.splice(index,1);
    localStorage.setItem("titles", JSON.stringify(notesTitleObj));
    localStorage.setItem("notes", JSON.stringify(notesObjForArray));
    showNotes();
}
let search = document.getElementById("searchTxt");
search.addEventListener("input", ()=>{
    //console.log("trying to search notes");
    let inputVal= search.value.toLowerCase();  
    let noteCards= document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach((element)=>{
        // seaching by title 
        let cardTxt= element.getElementsByTagName("h5")[0].innerText;
        //searching by cardTxt
        // let cardTxt= element.getElementsByTagName("p")[0].innerText;//here we are taking only one paragraph
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }
    })
});