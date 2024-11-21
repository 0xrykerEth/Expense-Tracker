function saveToLocalStorage(event) {
  event.preventDefault(); 


  const expenseAmount = document.getElementById('expense').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  if (!expenseAmount || !description) {
    alert('Please fill in all fields!');
    return;
  }

 
  const expense = {
    expenseAmount,
    description,
    category,
  };

 
  const expenseKey = `expense-${Date.now()}`;
  localStorage.setItem(expenseKey, JSON.stringify(expense));

 
  addExpenseToList(expense, expenseKey);

  document.getElementById('expense').value = '';
  document.getElementById('description').value = '';
  document.getElementById('category').value = 'fuel';
}

function addExpenseToList(expense, expenseKey) {
  const parentUl = document.getElementById('parent');

  const li = document.createElement('li');
  li.id = expenseKey;
  
  li.innerHTML = `
    ${expense.expenseAmount} - ${expense.description} (${expense.category})
    <button onclick="editExpense('${expenseKey}')">Edit</button>
    <button onclick="deleteExpense('${expenseKey}')">Delete</button>
  `;

  parentUl.appendChild(li);
}

function deleteExpense(expenseKey) {
 
  localStorage.removeItem(expenseKey);

  const expenseItem = document.getElementById(expenseKey);
  expenseItem.remove();
}

function editExpense(expenseKey) {
  
  const expense = JSON.parse(localStorage.getItem(expenseKey));

  document.getElementById('expense').value = expense.expenseAmount;
  document.getElementById('description').value = expense.description;
  document.getElementById('category').value = expense.category;

  deleteExpense(expenseKey);
}
