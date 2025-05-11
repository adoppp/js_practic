//types
type Student = {
    name: string;
};
    
type SchoolClass = {
    class: string;
    students: Student[];
};
    
type Data = SchoolClass[];

//variables
const DEFAULT_DATA: Data = [
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
const KEY: string = "class";

//global constants
const classListElem = document.querySelector<HTMLUListElement>("[data-list]");
const addButton = document.querySelector<HTMLButtonElement>("#add");

//set data from local-storage 
const setData = (): Data => {
    if (!localStorage.getItem(KEY)) {
        localStorage.setItem(KEY, JSON.stringify(DEFAULT_DATA));
    }
    
    let raw: string | null = localStorage.getItem(KEY);

    const data: Data = raw ? JSON.parse(raw) : DEFAULT_DATA;

    return data;   
};

//html code generator
const generateClassListItems = (data: Data): string => {
    return data
    .map((e) => 
        `<li class="class_item">
            <h3>${e.class}</h3>
            <span>${e.students.length}P.</span>
        </li>`
    )
    .join("");
};

//render data into HTML
const renderData = () => {
    const data: Data = setData();
    const liItems: string = generateClassListItems(data);

    classListElem?.insertAdjacentHTML("beforeend", liItems);
};


renderData();

//data-generator
addButton?.addEventListener("click", () => {
    const liItems: string = generateClassListItems(DEFAULT_DATA);

    classListElem?.insertAdjacentHTML("beforeend", liItems);
});