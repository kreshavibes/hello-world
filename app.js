document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('message').textContent = 'You clicked the button!';
});

document.getElementById('submitBtn').addEventListener('click', () => {
  const text = document.getElementById('textInput').value;
  if (text) {
    alert(text);
  }
});
