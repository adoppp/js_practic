//types
type Student = {
    name: string;
};
    
type SchoolClass = {
    class: string;
    students: Student[];
};
    
type Data = SchoolClass[];

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
const KEY: string = "class";

//elements
const classListElem = document.querySelector<HTMLUListElement>("[data-list]");
const addButton = document.querySelector<HTMLButtonElement>("#add");
const addPopUp = document.querySelector<HTMLDivElement>('#addPopUp');
const closeAddBtn = document.querySelector<HTMLDivElement>('#closeAddBtn');
const addClassForm = document.querySelector<HTMLFormElement>('#addClassForm');
const classNameInput = document.querySelector<HTMLInputElement>('#name');

//set data from local-storage 
const setData = (): Data => {
    // if (!localStorage.getItem(KEY)) {
    //     localStorage.setItem(KEY, JSON.stringify(DEFAULT_DATA));
    // }
    
    let raw: string | null = localStorage.getItem(KEY);

    const data: Data = raw ? JSON.parse(raw) : [];

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

//toggleVisibility callback
const toggleVisibility = (element: HTMLElement): void => {
    const isHidden = element?.classList.contains("hidden");

    document.body.style.overflow = isHidden ? "hidden" : "visible";
    isHidden ? element?.classList.remove("hidden") : element?.classList.add("hidden");
};

//addPopUp open
addButton?.addEventListener("click", () =>
    addPopUp ? toggleVisibility(addPopUp) : console.log("Type of 'addPopUp' is null")
);

//addPopUp close
closeAddBtn?.addEventListener("click", () => {
    addPopUp ? toggleVisibility(addPopUp) : console.log("Type of 'addPopUp' is null")
});

//add class form
addClassForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const className = classNameInput?.value.trim();
    if (!className) return;
    
    const actualData: Data = setData();
    const newClass: SchoolClass = {
        class: className, 
        students: []
    };   

    actualData.push(newClass);
    localStorage.setItem(KEY, JSON.stringify(actualData));
    
    const updatedData = setData();
    const lastClass = updatedData[updatedData.length - 1];

    if (classListElem) {
        classListElem.insertAdjacentHTML(
            "beforeend",
            `<li class="class_item">
                <h3>${lastClass.class}</h3>
                <span>${lastClass.students.length}P.</span>
            </li>`
        );
    }
    
    if (classNameInput) {
        classNameInput.value = "";
    };

    addPopUp ? toggleVisibility(addPopUp) : console.log("Type of 'addPopUp' is null");
})

//app-start
renderData();