<script>
        let interval = null;
        let tempo = 15;
        const respondido = {};
        let currentTab = 1;

        function iniciarTimer(tabIndex) {
            const timerDiv = document.getElementById('timer' + tabIndex);
            tempo = 15;
            timerDiv.textContent = `Tempo restante: ${tempo} segundos`;
            updateProgressBar(tabIndex);
            
            if (interval) clearInterval(interval);
            const radios = document.querySelectorAll(`#tab${tabIndex} input[type="radio"]`);
            if (!respondido[tabIndex]) {
                radios.forEach(r => r.disabled = false);
            }
            const btnProxima = document.getElementById('btn-proxima-' + tabIndex);
            if (btnProxima) btnProxima.style.display = 'none';

            interval = setInterval(() => {
                tempo--;
                if (tempo > 0) {
                    timerDiv.textContent = `Tempo restante: ${tempo} segundos`;
                    updateProgressBar(tabIndex, tempo);
                } else {
                    timerDiv.textContent = "Tempo esgotado!";
                    clearInterval(interval);
                    radios.forEach(r => r.disabled = true);
                    if (!respondido[tabIndex]) {
                        respondido[tabIndex] = true;
                        if (btnProxima) btnProxima.style.display = 'inline-block';
                        if (tabIndex < 10 && !document.querySelector(`input[name="resposta${tabIndex}"]:checked`)) {
                            setTimeout(() => {
                                showTab(tabIndex + 1);
                            }, 2000);
                        }
                    }
                }
            }, 1000);
        }

        function updateProgressBar(tabIndex, currentTime = 15) {
            const progressBar = document.getElementById('progress-bar');
            if (progressBar) {
                const widthPercentage = (currentTime / 15) * 100;
                progressBar.style.width = widthPercentage + '%';
            }
            const questionIndicator = document.getElementById('question-indicator');
            if (questionIndicator) {
                questionIndicator.textContent = `Pergunta ${tabIndex} de 10`;
            }
        }

        function showTab(tabIndex) {
            currentTab = tabIndex;
            for (let i = 1; i <= 10; i++) {
                const tab = document.getElementById('tab' + i);
                if (tab) tab.classList.remove('active');
            }
            const activeTab = document.getElementById('tab' + tabIndex);
            if (activeTab) activeTab.classList.add('active');
            iniciarTimer(tabIndex);
        }

        function selecionarOpcao(tab, opcao) {
            if (respondido[tab]) {
                alert("Você já respondeu esta pergunta e não pode trocar a opção.");
                return;
            }
            const radios = document.querySelectorAll(`#tab${tab} input[type="radio"]`);
            if (radios.length && radios[0].disabled) {
                alert("O tempo para responder esta pergunta acabou!");
                return;
            }
            const total = (tab === 3 || tab === 10) ? 2 : (tab === 2 || tab === 5 || tab === 6 || tab === 7 || tab === 8 || tab === 9) ? 4 : 5;
            for (let i = 1; i <= total; i++) {
                const label = document.getElementById(`label-opcao${tab}-${i}`);
                if (label) label.classList.remove('selected');
            }
            const selected = document.getElementById(`label-opcao${tab}-${opcao}`);
            if (selected) selected.classList.add('selected');
        }

        function enviarResposta(tabIndex) {
            clearInterval(interval);
            document.getElementById('timer' + tabIndex).textContent = "Resposta enviada!";
            respondido[tabIndex] = true;
            const radios = document.querySelectorAll(`#tab${tabIndex} input[type="radio"]`);
            radios.forEach(r => r.disabled = true);
            const btnProxima = document.getElementById('btn-proxima-' + tabIndex);
            if (btnProxima) btnProxima.style.display = 'inline-block';
        }

        window.onload = function () {
            document.getElementById('progress-bar').style.width = '100%';
            showTab(1);
        };
    </script>
