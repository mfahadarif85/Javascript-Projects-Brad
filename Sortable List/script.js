const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellision",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

const listItems = [];
let dragStartIndex;

createlist();

// Insert List items into DOM
function createlist() {
  [...richestPeople].forEach((person, index) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-index", index);
    listItem.innerHTML = `
          <span class="number">${index + 1}</span>
          <div class="person-name">
            <p className="person-name">${person}</p>
            <i className="fas fa-grip-lines"></i>
          </div>
        `;

    listItems.push(listItem);
    draggable_list.appendChild(listItem);
  });
}
