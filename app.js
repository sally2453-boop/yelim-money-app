let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

document.getElementById("date").valueAsDate = new Date();

function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function addExpense() {

    const date = document.getElementById("date").value;
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const memo = document.getElementById("memo").value;

    if (!amount) {
        alert("금액을 입력하세요.");
        return;
    }

    expenses.unshift({
        date,
        amount,
        category,
        memo
    });

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    closeModal();
    render();
}

function render() {

    const list =
        document.getElementById("expenseList");

    list.innerHTML = "";

    let total = 0;

    expenses.forEach(item => {

        total += item.amount;

        const li =
            document.createElement("li");

        li.innerHTML = `
            <div class="item-category">
                ${item.category}
            </div>

            <div class="item-amount">
                ${item.amount.toLocaleString()}원
            </div>

            <div class="item-date">
                ${item.date}
                ${item.memo ? " · " + item.memo : ""}
            </div>
        `;

        list.appendChild(li);
    });

    document.getElementById("total").innerText =
        total.toLocaleString();
}

render();