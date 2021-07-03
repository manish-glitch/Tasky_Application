const taskContainer = document.querySelector(".task__container");

const generateNewCard = (taskData) =>`<div class="col-md-6 col-lg-4 mt-5" id=${taskData.id}>
<div class="card ">
    <div class="card-header d-flex justify-content-end gap-1">
        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
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

const saveChanges = () =>{
    const taskData = {
        id : `${Date.now()}`,  //unique number
        imageUrl : document.getElementById("imageUrl").value,
        taskTitle : document.getElementById("tasktitle").value,
        taskType : document.getElementById("tasktype").value,
        taskDescription : document.getElementById("taskdescription").value,
    };

 

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData) );
};
