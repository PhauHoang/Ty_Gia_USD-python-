document.addEventListener("DOMContentLoaded", function () {
  console.log("Đã tải xong index.js");
});

function fetchForexRates(action, callback) {
  fetch(`http://localhost/bt_python/api.php?action=${action}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json_data) => {
      callback(json_data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function updateTable(data) {
  let tableHTML = `
    <table class="table table-bordered table-success">
      <thead>
        <tr>
          <th>STT</th>
          <th>Base</th>
          <th>Rate</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>`;
  
  data.forEach((item, index) => {
    tableHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.base}</td>
        <td>${item.rate}</td>
        <td>${item.updated_at}</td>
      </tr>`;
  });

  tableHTML += `</tbody></table>`;
  document.getElementById("table_now").innerHTML = tableHTML;
}

function updateChart(data) {
  const rates = data.map(d => ({ x: new Date(d.updated_at), y: d.rate }));

  const ctx = document.getElementById('myChart').getContext('2d');
  if (window.myChart) {
    window.myChart.data.datasets[0].data = rates;
    window.myChart.update();
  } else {
    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Tỷ giá USD',
          data: rates,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1,
          fill: false,
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute'
            },
            title: {
              display: true,
              text: 'Thời gian'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Tỷ giá'
            }
          }
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          }
        }
      }
    });
  }
}

function refreshData() {
  fetchForexRates("get_all", (data) => {
    updateTable(data);
    updateChart(data);
  });
}

refreshData();
setInterval(refreshData, 1000 * 60); // Cập nhật mỗi 1 phút
