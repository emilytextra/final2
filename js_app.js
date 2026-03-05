document.addEventListener("DOMContentLoaded", function () {
  const addItemForm = document.getElementById("addItemForm");
  const inventoryTable = document.getElementById("inventoryTable").querySelector("tbody");
  const clearAllButton = document.getElementById("clearAllButton");
  const inventoryChart = document.getElementById("inventoryChart");
  let inventoryItems = [];

  // Chart.js Initialization
  let myChart = new Chart(inventoryChart, {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        label: "Item Quantity",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Add Form Submission
  addItemForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const itemName = document.getElementById("itemName").value.trim();
    const itemQuantity = parseInt(document.getElementById("itemQuantity").value);

    if (itemName && !isNaN(itemQuantity)) {
      inventoryItems.push({ name: itemName, quantity: itemQuantity });

      // Add Row in Table
      const row = document.createElement("tr");
      row.innerHTML = `<td>${itemName}</td><td>${itemQuantity}</td>`;
      inventoryTable.appendChild(row);

      // Update Chart
      updateChart();
    }
  });

  // Clear All Button
  clearAllButton.addEventListener("click", function () {
    inventoryItems = [];
    inventoryTable.innerHTML = "";
    updateChart();
  });

  // Update Chart Data
  function updateChart() {
    myChart.data.labels = inventoryItems.map(item => item.name);
    myChart.data.datasets[0].data = inventoryItems.map(item => item.quantity);
    myChart.update();
  }
});