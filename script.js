function calcularBhaskara() {
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const c = parseFloat(document.getElementById('c').value);

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    document.getElementById('result').textContent = "Por favor, insira valores válidos.";
    document.getElementById('result').classList.add('error');
    document.getElementById('result').classList.remove('success');
    return;
  }

  const discriminante = b * b - 4 * a * c;
  let resultado = "";

  if (discriminante > 0) {
    const raiz1 = (-b + Math.sqrt(discriminante)) / (2 * a);
    const raiz2 = (-b - Math.sqrt(discriminante)) / (2 * a);
    resultado = `As raízes são: x₁ = ${raiz1.toFixed(2)} e x₂ = ${raiz2.toFixed(2)}`;
    document.getElementById('result').classList.add('success');
    document.getElementById('result').classList.remove('error');
  } else if (discriminante === 0) {
    const raiz = -b / (2 * a);
    resultado = `A raiz única é: x = ${raiz.toFixed(2)}`;
    document.getElementById('result').classList.add('success');
    document.getElementById('result').classList.remove('error');
  } else {
    const parteReal = -b / (2 * a);
    const parteImaginaria = Math.sqrt(-discriminante) / (2 * a);
    resultado = `As raízes são complexas: x₁ = ${parteReal.toFixed(2)} + ${parteImaginaria.toFixed(2)}i e x₂ = ${parteReal.toFixed(2)} - ${parteImaginaria.toFixed(2)}i`;
    document.getElementById('result').classList.add('success');
    document.getElementById('result').classList.remove('error');
  }

  document.getElementById('result').textContent = resultado;
}
