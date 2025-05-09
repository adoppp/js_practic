const classListElem = document.querySelector("[data-list]");
const addButton = document.querySelector("#add");

const DEFAULT_DATA = [
    {
        "class": "5H",
        "students": [
            {
                "name": "Olexander"
            },
            {
                "name": "Daniil"
            },
            {
                "name": "Mahdi"
            },
            {
                "name": "Alex"
            }
        ]
    },
    {
        "class": "6D",
        "students": [
            {
                "name": "Ali"
            },
            {
                "name": "Mango"
            },
            {
                "name": "Oleg"
            },
            {
                "name": "Sasha"
            },
            {
                "name": "Pasha"
            }
        ]
    }
];

// set data from local-storage in list
const setData = () => {
    const KEY = "class";
    
    if (!localStorage.getItem(KEY)) {
        localStorage.setItem(KEY, JSON.stringify(DEFAULT_DATA))
    }
    
    const classesList = JSON.parse(localStorage.getItem(KEY));

    const liItems = classesList.map(e => {
        return `<li class="class_item"><h3>${e.class}</h3><span>${e.students.length}P.</span></li>`;
    })
    .reduce((perv, next) => {
        return perv.concat("", next);
    }, "");

    classListElem.insertAdjacentHTML("beforeend", liItems);
};

setData();

//data-generator
addButton.addEventListener("click", () => {
    const liItems = DEFAULT_DATA.map(e => {
        return `<li class="class_item"><h3>${e.class}</h3><span>${e.students.length}P.</span></li>`;
    })
    .reduce((perv, next) => {
        return perv.concat("", next);
    }, "");

    classListElem.insertAdjacentHTML("beforeend", liItems);
});