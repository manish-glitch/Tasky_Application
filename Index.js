const taskContainer = document.querySelector(".task__container");

var globalStore = [];

const generateNewCard = (taskData) =>`
<div class="col-md-6 col-lg-4 mt-5" id=${taskData.id}>
<div class="card ">
    <div class="card-header d-flex justify-content-end gap-1">
        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"id=${taskData.id} onclick="editCard.apply(this, arguments)"></i></button>
        <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deletCard.apply(this, arguments)">
        <i class="fas fa-trash-alt" id=${taskData.id} onclick="deletCard.apply(this, arguments)"></i></button>
    </div>
    <img src= ${taskData.imageUrl} class="card-img-top" alt="task_image">
    <div class="card-body">
        <h5 class="card-title">${taskData.taskTitle}</h5>
        <p class="card-text">${taskData.taskDescription}</p>
        <a href="#" class="btn btn-outline-primary">${taskData.taskType}</a>
  
    </div>
    <div class="card-footer ">
        <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
    </div>
</div>
</div>`

const loadInitialCardData = () =>{
    
    const getCardData= localStorage.getItem("tasky");
    //convert to normal object
    const {cards} = JSON.parse(getCardData);
    //loop over those array of task object to create html card,
    cards.map((cardObject) =>{
        // inject it to dom
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject) );
          // update our globalstorage
        globalStore.push(cardObject);
    })
  
}
const saveChanges = () =>{
    const taskData = {
        id : `${Date.now()}`,  //unique number
        imageUrl : document.getElementById("imageUrl").value,
        taskTitle : document.getElementById("tasktitle").value,
        taskType : document.getElementById("tasktype").value,
        taskDescription : document.getElementById("taskdescription").value,
    };

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData) );

    globalStore.push(taskData);

    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));
};

const deletCard = (event) =>{

    event = window.event;

    const targetId = event.target.id;
    const tagname= event.target.tagName;



    globalStore= globalStore.filter((cardObject)=> cardObject.id !==targetId);
    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));
    

    if(tagname === "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
}

const editCard = (event) => {
    event = window.event;

    const targetId = event.target.id;
    const tagname= event.target.tagName;

    let parentElement;
    
    if(tagname === "BUTTON"){
        parentElement = event.target.parentNode.parentNode; 
    }else{
        parentElement = event.target.parentNode.parentNode.parentNode; 
    }
   
    let taskTitle=parentElement.childNodes[5].childNodes[1];
    let taskDescription=parentElement.childNodes[5].childNodes[3];
    let taskType=parentElement.childNodes[5].childNodes[5];
    let submitButton = parentElement.childNodes[7].childNodes[1]
    
    taskTitle.setAttribute("contenteditable", true);
    taskType.setAttribute("contenteditable", true);
    taskDescription.setAttribute("contenteditable", true);
    submitButton.innerHTML= "save changes";
}