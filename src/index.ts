//types
type Student = {
    name: string;
    id: number;
    isHere: boolean;
};
    
type SchoolClass = {
    class: string;
    id: number;
    students: Student[];
};
    
type Data = SchoolClass[];

//variables
const KEY: string = "class";

//elements
const classListElem = document.querySelector<HTMLUListElement>('[data-list]');
const addButton = document.querySelector<HTMLButtonElement>('#add');
const addPopUp = document.querySelector<HTMLDivElement>('#addPopUp');
const closeAddBtn = document.querySelector<HTMLDivElement>('#closeAddBtn');
const addClassForm = document.querySelector<HTMLFormElement>('#addClassForm');
const classNameInput = document.querySelector<HTMLInputElement>('#name');
const classNameTitle = document.querySelector<HTMLTitleElement>('.class_name_title');

//set data from local-storage 
const setData = (): Data => {    
    let raw: string | null = localStorage.getItem(KEY);

    const data: Data = raw ? JSON.parse(raw) : localStorage.setItem(KEY, "[]");

    return data;   
};

//id generator
const idGeneration = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

//html code generator
const generateClassListItems = (data: Data): string => {
    return data
    .map((e) => 
        liItemGenerator(e)
    )
    .join("");
};

//render data into HTML
const renderData = (): void => {
    const data: Data = setData();
    const liItems: string = generateClassListItems(data);

    classListElem?.insertAdjacentHTML("beforeend", liItems !== "" ? liItems : '<li style="text-align: center; font-weight: 500; font-size: 19px;">Sie haben noch keine Klassen</li>');
};

//li item generator
const liItemGenerator = (e: SchoolClass): string => {
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
            </li>`
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
    const id: number = idGeneration(1, 1000000);
    const newClass: SchoolClass = {
        class: className,
        id, 
        students: []
    };

    actualData.push(newClass);
    localStorage.setItem(KEY, JSON.stringify(actualData));
    

    classListElem!.innerHTML = "";
    renderData()
    
    classNameInput!.value = "";

    addPopUp ? toggleVisibility(addPopUp) : console.log("Type of 'addPopUp' is null");
});

//delete class
classListElem?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    const button = target.closest("button[data-id]") as HTMLButtonElement;
    if (!button) return;

    const id = parseInt(button.dataset.id!);
    const actualData: Data = setData();

    const newData: Data = actualData.filter(item => item.id !== id);

    localStorage.setItem(KEY, JSON.stringify(newData));

    classListElem.innerHTML = "";
    renderData();
});

//app-start
renderData();
