export async function getAnalysis(text) {
  console.log(text);
  const res = await fetch(`http://127.0.0.1:8000/analyze-sentiment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  const { score, label } = await res.json();
  console.log(score, label);

  return { score, label };
}
