const deleteListItem = document.querySelectorAll(".fa-trash");

Array.from(deleteListItem).forEach((element) => {
	element.addEventListener("click", deleteItem);
});

async function deleteItem() {
	const liItem = this.parentNode.parentNode.childNodes[1].innerText.trim();

	try {
		const response = await fetch("deleteItem", {
			method: "delete",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				listItem: liItem,
			}),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}

const item = document.querySelectorAll(".fa-square");
const completedItem = document.querySelectorAll(".fa-check-square");

Array.from(item).forEach((element) => {
	element.addEventListener("click", completeItem);
});

async function completeItem() {
	const liItem = this.parentNode.parentNode.childNodes[1].innerText.trim();
	// const completed = checkbox.checked;
	// console.log(liItem, completed);

	try {
		const response = await fetch("completedItem", {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				listItem: liItem,
			}),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}

Array.from(completedItem).forEach((element) => {
	element.addEventListener("click", incompleteItem);
});

async function incompleteItem() {
	const liItem = this.parentNode.parentNode.childNodes[1].innerText.trim();
	// const completed = checkbox.checked;
	// console.log(liItem, completed);

	try {
		const response = await fetch("incompleteItem", {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				listItem: liItem,
			}),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}
