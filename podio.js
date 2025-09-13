<script>
async function carregarPodio() {
    const rankingList = document.getElementById('ranking-list');

    try {
        // Busca os jogadores do backend
        const response = await fetch('http://localhost:3036/podio');
        const jogadores = await response.json();

        // Ordena por pontos decrescentes (por segurança)
        jogadores.sort((a, b) => b.pontos - a.pontos);

        const medalhas = ["🥇", "🥈", "🥉"];
        rankingList.innerHTML = '';

        if (jogadores.length === 0) {
            rankingList.innerHTML = `<li class="ranking-item" style="justify-content:center;">Nenhum jogador registrado ainda.</li>`;
        } else {
            jogadores.forEach((jogador, i) => {
                const li = document.createElement('li');
                li.className = 'ranking-item';
                
                // Adiciona classe da medalha
                if (i === 0) li.classList.add('gold');
                else if (i === 1) li.classList.add('silver');
                else if (i === 2) li.classList.add('bronze');

                li.innerHTML = `
                    <span class="pos">
                        ${medalhas[i] ? `<span class="medalha">${medalhas[i]}</span>` : ''}${i + 1}º
                    </span>
                    <span class="nome">${jogador.nome}</span>
                    <span class="pontos">${jogador.pontos} pts</span>
                `;
                rankingList.appendChild(li);
            });
        }
    } catch (err) {
        console.error('Erro ao carregar pódio:', err);
        rankingList.innerHTML = `<li class="ranking-item" style="justify-content:center;">Erro ao carregar pódio.</li>`;
    }
}

// Chama a função ao carregar a página
carregarPodio();
</script>
