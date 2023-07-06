import "./style.css";

document.querySelector("#app").innerHTML = `
  <div class="container">
        <h2>Colores para elegir</h2>
        <div class="boxes"></div>

        <h2>Colores elegidos</h2>
        <div class="boxes__selected"></div>
    </div>
`;

const data = [
	{
		id: 0,
		color: "#000000",
	},
	{
		id: 1,
		color: "#4E4FEB",
	},
	{
		id: 2,
		color: "#F1C93B",
	},
	{
		id: 3,
		color: "#78C1F3",
	},
	{
		id: 4,
		color: "#862B0D",
	},
	{
		id: 5,
		color: "#7895CB",
	},
];

const dataSave = JSON.parse(localStorage.getItem("dataSave")) || {};

function printBoxes(array) {
	let html = "";

	for (const { id, color } of array) {
		html += `
            <div class="box" id="${id}" style="background-color: ${color}">
                <p class="box__text box__text--add">save</p>
            </div>
        `;
	}

	document.querySelector(".boxes").innerHTML = html;
}

function printBoxesSelected() {
	let html = "";

	for (const key in dataSave) {
		const { id, color } = dataSave[key];
		html += `
					<div class="box" id="${id}" style="background-color: ${color}">
						<p class="box__text box__text--remove">remove</p>
					</div>
				`;
	}

	document.querySelector(".boxes__selected").innerHTML = html;
}

function handleSaveBoxes() {
	document.querySelectorAll(".boxes .box").forEach((box) => {
		box.addEventListener("click", function (e) {
			const id = +e.currentTarget.id;
			if (dataSave[id]) return;
			const boxFound = data.find((box) => box.id === id);
			dataSave[boxFound.id] = boxFound;
			printBoxesSelected();

			localStorage.setItem("dataSave", JSON.stringify(dataSave));
		});
	});
}

function handleRemoveBoxes() {
	document
		.querySelector(".boxes__selected")
		.addEventListener("click", function (e) {
			const id = +e.target.closest(".box").id;
			delete dataSave[id];
			printBoxesSelected();
			localStorage.setItem("dataSave", JSON.stringify(dataSave));
		});
}

printBoxes(data);
printBoxesSelected();
handleSaveBoxes();
handleRemoveBoxes();
