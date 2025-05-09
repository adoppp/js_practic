const classListElem = document.querySelector("[data-list]");
const addButton = document.querySelector("#add");

// set data from local-storage in list
const setData = () => {
    const KEY = "data";
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
    
    if (!localStorage.key(KEY)) {
        localStorage.setItem(KEY, JSON.stringify(DEFAULT_DATA))
    }
    
    const getted = JSON.parse(localStorage.getItem(KEY));

    const liItems = getted.map(e => {
        return `<li class="class_item"><h3>${e.class}</h3><span>${e.students.length}P.</span></li>`;
    })
    .reduce((perv, next) => {
        return perv.concat("", next);
    });

    classListElem.insertAdjacentHTML("beforeend", liItems);
};

setData();

addButton.addEventListener("click", () => console.log("click"));