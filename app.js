let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

document.getElementById("date").valueAsDate = new Date();

function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function closeModalByBackground(event) {
    if (event.target.id === "modal") {
        closeModal();
    }
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
        id: Date.now(),
        date,
        amount,
        category,
        memo
    });

    saveExpenses();

    document.getElementById("amount").value = "";
    document.getElementById("memo").value = "";

    closeModal();
    render();
}

function deleteExpense(id) {
    const ok = confirm("이 내역을 삭제할까요?");

    if (!ok) {
        return;
    }

    expenses = expenses.filter(item => item.id !== id);

    saveExpenses();
    render();
}

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function render() {
    const list = document.getElementById("expenseList");
    list.innerHTML = "";

    let total = 0;

    expenses.forEach(item => {
        total += item.amount;

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="item-row">
                <div>
                    <div class="item-category">${item.category}</div>
                    <div class="item-date">
                        ${item.date}${item.memo ? " · " + item.memo : ""}
                    </div>
                </div>

                <div class="item-right">
                    <div class="item-amount">
                        ${item.amount.toLocaleString()}원
                    </div>

                    <button class="delete-btn" onclick="deleteExpense(${item.id})">
                        삭제
                    </button>
                </div>
            </div>
        `;

        list.appendChild(li);
    });

    document.getElementById("total").innerText = total.toLocaleString();
}

render();