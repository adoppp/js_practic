"use strict";
//variables
const DEFAULT_DATA = [
    {
        class: "5H",
        students: [
            {
                name: "Olexander"
            },
            {
                name: "Daniil"
            },
            {
                name: "Mahdi"
            },
            {
                name: "Alex"
            }
        ]
    },
    {
        class: "6D",
        students: [
            {
                name: "Ali"
            },
            {
                name: "Mango"
            },
            {
                name: "Oleg"
            },
            {
                name: "Sasha"
            },
            {
                name: "Pasha"
            }
        ]
    }
];
const KEY = "class";
//global constants
const classListElem = document.querySelector("[data-list]");
const addButton = document.querySelector("#add");
//set data from local-storage 
const setData = () => {
    if (!localStorage.getItem(KEY)) {
        localStorage.setItem(KEY, JSON.stringify(DEFAULT_DATA));
    }
    let raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : DEFAULT_DATA;
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
renderData();
//data-generator
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", () => {
    const liItems = generateClassListItems(DEFAULT_DATA);
    classListElem === null || classListElem === void 0 ? void 0 : classListElem.insertAdjacentHTML("beforeend", liItems);
});
