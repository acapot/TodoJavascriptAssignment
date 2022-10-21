'use strict';

const allTodoContainer = document.querySelector('#allTodoContainer');
const todoContainer = document.getElementsByClassName('todoContainer');
const bodyTag    = document.querySelector('#bodyId');
const btnComplete  = document.getElementsByClassName('complete');
const allTodoComplete  = document.getElementsByClassName('classtrue');
const allTodoUncomplete  = document.getElementsByClassName('classfalse');
const btnDelete    = document.getElementsByClassName('delete');
const btnAdd       = document.querySelector('#add');
const addTodoInput = document.getElementById('addTodoInput');
const slctTodoFilter = document.querySelector('#todoFilter');

let todoList = [
                {
                  nameTodo: 'Cook the lunch',
                  complete: false
                },
                {
                  nameTodo: 'Lunch',
                  complete: false
                },
                {
                  nameTodo: 'Grocery shopping',
                  complete: false
                },
                {
                  nameTodo: 'Buy a new pc',
                  complete: false
                },
              ];

const addToList = function(tl , i){
  const todoContainerToAdd = `<div class="todoContainer class${tl.complete}" id="todo${i}">
        <h2 id="h${i}">${tl.nameTodo}</h2>
        <input class="complete" type="button" name="${i}" value="✔">
        <input class="delete" type="button" name="${i}" value="🗑">
      </div>`;

      allTodoContainer.insertAdjacentHTML('afterbegin', todoContainerToAdd);
     
} 

todoList.forEach(function(tl, i){
  addToList(tl,i);
});

const btnAddFunction = function(e){
  let addTodoInputValue = {nameTodo: addTodoInput.value,
                            complete: false
                          }
  const addTodoInputIndex = todoList.push(addTodoInputValue)-1;
  addToList(addTodoInputValue,addTodoInputIndex);
  e.preventDefault();
  //todoList.forEach(val => console.log("after: "+val.complete));  
  addEventListenerBtnDelete();
  addEventListenerBtnCom();
}

 btnAdd.addEventListener('click', btnAddFunction);

const btnDelFunction = function (e) {
  e.preventDefault();
  const elementNameAttibut = e.target.getAttribute('name');
  const elementToDelete = document.getElementById("todo"+elementNameAttibut);
  todoList.splice(elementNameAttibut, 1);
  elementToDelete.className = 'displayNone';
}

const addEventListenerBtnDelete = function(){
  for (const btnDel of btnDelete){  
    btnDel.addEventListener('click', btnDelFunction);
  }
}

addEventListenerBtnDelete();

const btnComFunction = function (e) {
  e.preventDefault();
  const elementNameAttibut = e.target.getAttribute('name');
  const elementComplete = document.getElementById("todo"+elementNameAttibut);
 
  if(elementComplete.matches('.classfalse')){
    elementComplete.className = "todoContainer classtrue";
    e.target.style.backgroundColor = 'salmon';
    todoList[elementNameAttibut].complete=true;
    todoList.forEach(val => console.log("despues: "+val.nameTodo,val.complete));
  }else{
    elementComplete.className = "todoContainer classfalse";
    e.target.style.backgroundColor = 'rgb(4, 127, 14)';
    todoList[elementNameAttibut].complete=false;
    todoList.forEach(val => console.log("despues: "+val.nameTodo,val.complete));
  }  
}

const addEventListenerBtnCom = function(){
  for (const btnCom of btnComplete){  
    btnCom.addEventListener('click', btnComFunction);
  }
}

addEventListenerBtnCom();

const slctComFunction = function(e){

  for (const val of todoContainer){
    val.classList.remove("displayNone");
  }
  
  if(e.target.value === "uncomplete"){
    
    for (const val of todoContainer){
      if(val.matches('.classfalse')){
        val.classList.remove("displayNone");
      }
      else{
        val.className = "todoContainer classtrue displayNone";
      }
    }
   
  }
  else if(e.target.value === "complete"){
    for (const val of todoContainer){
      if(val.matches('.classtrue')){
        val.classList.remove("displayNone");
      }
      else{
        val.className = "todoContainer classfalse displayNone";
      }
    }
  }
}

slctTodoFilter.addEventListener('change', slctComFunction)