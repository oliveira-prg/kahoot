 <script>
async function salvarNome() {
    const nome = document.getElementById('nome').value.trim();
    const saudacao = document.getElementById('saudacao');
    if (!nome) {
        saudacao.textContent = 'Por favor, insira seu nome!';
        return;
    }

    try {
        const response = await fetch('http://localhost:3036/nomes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome })
        });

        if (response.ok) {
            const data = await response.json();
            saudacao.textContent = `Boa sorte, ${data.nome}! 🚀`;
            localStorage.setItem('kahoot_nome', data.nome);
            document.getElementById('nome').value = '';
        } else {
            const error = await response.json();
            saudacao.textContent = `Erro: ${error.error}`;
        }
    } catch (err) {
        saudacao.textContent = 'Erro ao conectar ao servidor!';
        console.error('Erro:', err);
    }
}

function prosseguir() {
    const nome = localStorage.getItem('kahoot_nome');
    if (!nome) {
        alert('Por favor, insira seu nome antes de prosseguir!');
        return;
    }
    window.location.href = 'participar.html';
}
</script>
