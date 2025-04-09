document.getElementById('frmRemocao').addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = document.getElementById('txtLogin').value;
    const tipo = 'remocao';

    const response = await fetch('/api/mysql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dados, tipo })
    });

    const result = await response.json();
    console.log(result.message);
});