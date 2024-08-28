document.addEventListener("DOMContentLoaded", function () {
  // Biểu đồ Chart.js
  const fanButton = document.getElementById("fan-button");
  const acButton = document.getElementById("ac-button");
  const lightButton = document.getElementById("light-button");

  // Hàm để chuyển đổi trạng thái bật/tắt
  function toggleDevice(button) {
    if (button.textContent === "Off") {
      button.textContent = "On";
      button.classList.remove("off");
      button.classList.add("on");
    } else {
      button.textContent = "Off";
      button.classList.remove("on");
      button.classList.add("off");
    }
  }

  // Gán sự kiện click cho từng nút nếu tồn tại
  if (fanButton) {
    fanButton.addEventListener("click", function () {
      toggleDevice(fanButton);
    });
  }
  if (acButton) {
    acButton.addEventListener("click", function () {
      toggleDevice(acButton);
    });
  }
  if (lightButton) {
    lightButton.addEventListener("click", function () {
      toggleDevice(lightButton);
    });
  }

  const labels = ["0h", "4h", "8h", "12h", "0h", "16h", "22h"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: [26, 29, 25, 20, 21, 15, 22],
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
        lineTension: 0,
        yAxisID: "y",
      },
      {
        label: "Humidity (%)",
        data: [20, 55, 60, 60, 65, 22, 25],
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
        lineTension: 0,
        yAxisID: "y1",
      },
      {
        label: "Light (lux)",
        data: [60, 24, 45, 72, 53, 45, 50],
        borderColor: "rgba(255, 206, 86, 1)",
        fill: false,
        lineTension: 0,
        yAxisID: "y2",
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
          title: {
            display: true,
            text: "(°C)",
          },
          min: 0,
          max: 50,
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "(%)",
          },
          grid: {
            drawOnChartArea: false,
          },
          min: 0,
          max: 100,
        },
        y2: {
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "(lux)",
          },
          grid: {
            drawOnChartArea: false,
          },
          offset: true,
          min: 0,
          max: 100,
        },
      },
    },
  };

  const chartElement = document.getElementById("myChart");
  if (chartElement) {
    const myChart = new Chart(chartElement, config);

    // Cập nhật dữ liệu biểu đồ sau 2 giây
    function updateChartData() {
      const newTemperatureData = [36, 49, 45, 30, 31, 35, 42];
      const newHumidityData = [60, 35, 40, 75, 40, 55, 80];
      const newLightData = [50, 44, 35, 62, 43, 65, 70];

      myChart.data.datasets[0].data = newTemperatureData;
      myChart.data.datasets[1].data = newHumidityData;
      myChart.data.datasets[2].data = newLightData;

      myChart.update();
    }
    setTimeout(updateChartData, 2000);
  }

  // Phân trang cho bảng history
  const rowsPerPage = 8;
  const table = document.querySelector("table");
  const tbody = table ? table.querySelector("tbody") : null;
  const pagination = document.getElementById("pagination");

  if (table && tbody && pagination) {
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const pageCount = Math.ceil(rows.length / rowsPerPage);

    function showPage(page) {
      rows.forEach((row, index) => {
        row.style.display =
          Math.floor(index / rowsPerPage) === page - 1 ? "" : "none";
      });
    }

    function createPagination() {
      pagination.innerHTML = "";
      for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", () => {
          showPage(i);
          document
            .querySelectorAll("#pagination button")
            .forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
        });
        if (i === 1) button.classList.add("active");
        pagination.appendChild(button);
      }
    }

    showPage(1);
    createPagination();
  } else {
    console.error("Cannot find table, tbody or pagination elements.");
  }
});
