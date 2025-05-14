"use strict";
//data
// const DEFAULT_DATA: Data = [
//     {
//         class: "5H",
//         students: [
//             {
//                 name: "Olexander"
//             },
//             {
//                 name: "Daniil"
//             },
//             {
//                 name: "Mahdi"
//             },
//             {
//                 name: "Alex"
//             }
//         ]
//     },
//     {
//         class: "6D",
//         students: [
//             {
//                 name: "Ali"
//             },
//             {
//                 name: "Mango"
//             },
//             {
//                 name: "Oleg"
//             },
//             {
//                 name: "Sasha"
//             },
//             {
//                 name: "Pasha"
//             }
//         ]
//     }
// ];
//variables
const KEY = "class";
//elements
const classListElem = document.querySelector("[data-list]");
const addButton = document.querySelector("#add");
const addPopUp = document.querySelector('#addPopUp');
const closeAddBtn = document.querySelector('#closeAddBtn');
const addClassForm = document.querySelector('#addClassForm');
const classNameInput = document.querySelector('#name');
//set data from local-storage 
const setData = () => {
    // if (!localStorage.getItem(KEY)) {
    //     localStorage.setItem(KEY, JSON.stringify(DEFAULT_DATA));
    // }
    let raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    return data;
};
//html code generator
const generateClassListItems = (data) => {
    return data
        .map((e) => `<li class="class_item">
            <h3>${e.class}</h3>
            <span>${e.students.length}P.</span>
        </li>`)
        .join("");
};
//render data into HTML
const renderData = () => {
    const data = setData();
    const liItems = generateClassListItems(data);
    classListElem === null || classListElem === void 0 ? void 0 : classListElem.insertAdjacentHTML("beforeend", liItems);
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
    const newClass = {
        class: className,
        students: []
    };
    actualData.push(newClass);
    localStorage.setItem(KEY, JSON.stringify(actualData));
    const updatedData = setData();
    const lastClass = updatedData[updatedData.length - 1];
    if (classListElem) {
        classListElem.insertAdjacentHTML("beforeend", `<li class="class_item">
                <h3>${lastClass.class}</h3>
                <span>${lastClass.students.length}P.</span>
            </li>`);
    }
    if (classNameInput) {
        classNameInput.value = "";
    }
    ;
    addPopUp ? toggleVisibility(addPopUp) : console.log("Type of 'addPopUp' is null");
});
//app-start
renderData();
