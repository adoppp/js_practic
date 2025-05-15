"use strict";
//variables
const KEY = "class";
//elements
const classListElem = document.querySelector('[data-list]');
const addButton = document.querySelector('#add');
const addPopUp = document.querySelector('#addPopUp');
const closeAddBtn = document.querySelector('#closeAddBtn');
const addClassForm = document.querySelector('#addClassForm');
const classNameInput = document.querySelector('#name');
const classNameTitle = document.querySelector('.class_name_title');
//set data from local-storage 
const setData = () => {
    let raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : localStorage.setItem(KEY, "[]");
    return data;
};
//id generator
const idGeneration = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
//html code generator
const generateClassListItems = (data) => {
    return data
        .map((e) => liItemGenerator(e))
        .join("");
};
//render data into HTML
const renderData = () => {
    const data = setData();
    const liItems = generateClassListItems(data);
    classListElem === null || classListElem === void 0 ? void 0 : classListElem.insertAdjacentHTML("beforeend", liItems !== "" ? liItems : '<li style="text-align: center; font-weight: 500; font-size: 19px;">Sie haben noch keine Klassen</li>');
};
//li item generator
const liItemGenerator = (e) => {
    return `<li class="class_item">
                <h3>${e.class}</h3>
                <div>
                    <button type="button" id="deleteClassButton" data-id="${e.id}">
                        <svg>
                            <use href="./public/symbol-defs.svg#trash" />
                        </svg>
                    </button>
                    <span>${e.students.length}P.</span>
                </div>
            </li>`;
};
//toggleVisibility callback
const toggleVisibility = (element) => {
    const isHidden = element === null || element === void 0 ? void 0 : element.classList.contains("hidden");
    document.body.style.overflow = isHidden ? "hidden" : "visible";
    isHidden ? element === null || element === void 0 ? void 0 : element.classList.remove("hidden") : element === null || element === void 0 ? void 0 : element.classList.add("hidden");
};
//addPopUp open
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", () => addPopUp ? toggleVisibility(addPopUp) : console.log("Type of 'addPopUp' is null"));
//addPopUp close
closeAddBtn === null || closeAddBtn === void 0 ? void 0 : closeAddBtn.addEventListener("click", () => {
    addPopUp ? toggleVisibility(addPopUp) : console.log("Type of 'addPopUp' is null");
});
//add class form
addClassForm === null || addClassForm === void 0 ? void 0 : addClassForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const className = classNameInput === null || classNameInput === void 0 ? void 0 : classNameInput.value.trim();
    if (!className)
        return;
    const actualData = setData();
    const id = idGeneration(1, 1000000);
    const newClass = {
        class: className,
        id,
        students: []
    };
    actualData.push(newClass);
    localStorage.setItem(KEY, JSON.stringify(actualData));
    classListElem.innerHTML = "";
    renderData();
    classNameInput.value = "";
    addPopUp ? toggleVisibility(addPopUp) : console.log("Type of 'addPopUp' is null");
});
//delete class
classListElem === null || classListElem === void 0 ? void 0 : classListElem.addEventListener("click", (event) => {
    const target = event.target;
    const button = target.closest("button[data-id]");
    if (!button)
        return;
    const id = parseInt(button.dataset.id);
    const actualData = setData();
    const newData = actualData.filter(item => item.id !== id);
    localStorage.setItem(KEY, JSON.stringify(newData));
    classListElem.innerHTML = "";
    renderData();
});
//app-start
renderData();
