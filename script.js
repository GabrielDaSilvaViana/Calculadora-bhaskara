let chartInstance = null;

function calcularBhaskara() {
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const c = parseFloat(document.getElementById('c').value);

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    alert("Por favor, insira valores válidos para todos os coeficientes.");
    document.getElementById('result').textContent = "";
    apagarGrafico();
    return;
  }

  if (a === 0) {
    alert("O coeficiente 'a' não pode ser zero em uma equação quadrática.");
    document.getElementById('result').textContent = "";
    apagarGrafico();
    return;
  }

  const discriminante = b * b - 4 * a * c;
  let resultado = "";

  if (discriminante > 0) {
    const raiz1 = (-b + Math.sqrt(discriminante)) / (2 * a);
    const raiz2 = (-b - Math.sqrt(discriminante)) / (2 * a);
    resultado = `As raízes são: x₁ = ${raiz1.toFixed(2)} e x₂ = ${raiz2.toFixed(2)}`;
  } else if (discriminante === 0) {
    const raiz = -b / (2 * a);
    resultado = `A raiz única é: x = ${raiz.toFixed(2)}`;
  } else {
    const parteReal = -b / (2 * a);
    const parteImaginaria = Math.sqrt(-discriminante) / (2 * a);
    resultado = `As raízes são complexas: x₁ = ${parteReal.toFixed(2)} + ${parteImaginaria.toFixed(2)}i e x₂ = ${parteReal.toFixed(2)} - ${parteImaginaria.toFixed(2)}i`;
  }

  document.getElementById('result').textContent = resultado;

  gerarGrafico(a, b, c);
}

function apagarGrafico() {
  if(chartInstance){
    chartInstance.destroy();
    chartInstance = null;
  }
}

function gerarGrafico(a, b, c) {
  const ctx = document.getElementById('graphCanvas').getContext('2d');

  // Apaga gráfico anterior se existir
  apagarGrafico();

  const pontosX = [];
  const pontosY = [];

  // Escolher intervalo para o gráfico para ficar mais dinâmico dependendo dos coeficientes
  const minX = -10;
  const maxX = 10;

  for (let x = minX; x <= maxX; x += 0.5) {
    pontosX.push(x.toFixed(1));
    pontosY.push(a * x * x + b * x + c);
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: pontosX,
      datasets: [{
        label: 'y = ax² + bx + c',
        data: pontosY,
        borderColor: '#4fa3d1',
        backgroundColor: 'rgba(79, 163, 209, 0.25)',
        fill: true,
        tension: 0.3,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'x',
            color: '#555',
            font: { size: 16, weight: 'bold' }
          },
          ticks: {
            maxTicksLimit: 11,
            color: '#333'
          },
          grid: {
            color: '#ddd'
          }
        },
        y: {
          title: {
            display: true,
            text: 'y',
            color: '#555',
            font: { size: 16, weight: 'bold' }
          },
          ticks: {
            color: '#333'
          },
          grid: {
            color: '#ddd'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#4fa3d1',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        tooltip: {
          enabled: true,
          mode: 'nearest',
          intersect: false
        }
      }
    }
  });
}
