document.getElementById('multiplyBtn').addEventListener('click', async () => {
  const matrixA = document.getElementById('matrixA').value;
  const matrixB = document.getElementById('matrixB').value;
  const resultArea = document.getElementById('resultArea');

  try {
    const response = await fetch(`/api/multiply?A=${encodeURIComponent(matrixA)}&B=${encodeURIComponent(matrixB)}`);
    const data = await response.json();

    if (data.error) {
      resultArea.textContent = `Error: ${data.error}`;
    } else {
      resultArea.textContent = `Result:\n${JSON.stringify(data.result, null, 2)}`;
    }
  } catch (err) {
    resultArea.textContent = 'Error communicating with the server.';
  }
});
