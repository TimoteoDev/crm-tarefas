const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');

// Aqui, vai carregar as tarefas ao iniciar
window.onload = () => {
  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefasSalvas.forEach(({ texto, concluida }) => {
    adicionarTarefaNaTela(texto, concluida);
  });
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const texto = input.value.trim();
  if (texto === '') return;

  adicionarTarefaNaTela(texto, false);
  salvarTarefas();
  input.value = '';
});

function adicionarTarefaNaTela(texto, concluida) {
  const li = document.createElement('li');

  const spanTexto = document.createElement('span');
  spanTexto.textContent = texto;

  if (concluida) li.classList.add('concluida');

  const btnConcluir = document.createElement('button');
  btnConcluir.textContent = 'Concluir';
  btnConcluir.classList.add('btn-concluir')
  btnConcluir.onclick = () => {
    li.classList.toggle('concluida');
    salvarTarefas();
  };

  const btnEditar = document.createElement('button');
  btnEditar.textContent = 'Editar';
  btnEditar.classList.add('btn-editar')
  btnEditar.onclick = () => {
    const novoTexto = prompt('Editar tarefa:', spanTexto.textContent);
    if (novoTexto !== null && novoTexto.trim() !== '') {
      spanTexto.textContent = novoTexto.trim();
      salvarTarefas();
    }
  };

  const btnExcluir = document.createElement('button');
btnExcluir.textContent = 'Excluir';
btnExcluir.classList.add('btn-excluir');
btnExcluir.onclick = () => {
  li.remove();
  salvarTarefas();
};

  li.appendChild(spanTexto);
  li.appendChild(btnConcluir);
  li.appendChild(btnEditar);
  li.appendChild(btnExcluir);
  lista.appendChild(li);
}

function salvarTarefas() {
  const tarefas = [];
  lista.querySelectorAll('li').forEach(li => {
    const texto = li.querySelector('span')?.textContent || '';
    tarefas.push({
      texto: texto,
      concluida: li.classList.contains('concluida')
    });
  });
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
