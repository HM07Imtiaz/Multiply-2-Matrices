export default function handler(req, res) {
  try {
    const A = JSON.parse(req.query.A);
    const B = JSON.parse(req.query.B);

    if (!Array.isArray(A) || !Array.isArray(B)) {
      return res.status(400).json({ error: 'Inputs must be 2D arrays.' });
    }

    const aRows = A.length;
    const aCols = A[0].length;
    const bRows = B.length;
    const bCols = B[0].length;

    if (A.some(row => row.length !== aCols) || B.some(row => row.length !== bCols)) {
      return res.status(400).json({ error: 'All rows must be of the same length.' });
    }

    if (aCols !== bRows) {
      return res.status(400).json({ error: 'Number of columns in A must match number of rows in B.' });
    }

    const result = Array.from({ length: aRows }, () => Array(bCols).fill(0));

    for (let i = 0; i < aRows; i++) {
      for (let j = 0; j < bCols; j++) {
        for (let k = 0; k < aCols; k++) {
          result[i][j] += A[i][k] * B[k][j];
        }
      }
    }

    res.status(200).json({ result });
  } catch (err) {
    console.error('Matrix multiplication error:', err.message);
    res.status(400).json({ error: 'Invalid matrix format. Use valid JSON arrays like [[1,2],[3,4]].' });
  }
}
