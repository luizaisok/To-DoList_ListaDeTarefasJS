const data = new Date();
document.getElementById("data").innerHTML = data.toLocaleDateString();

function adicionar(){
    let tBody = document.querySelector('#tabelaTarefas tbody');
    let linha = document.createElement('tr');

    let tarefa = document.createElement('td');
    let relevancia = document.createElement('td');
    let data = document.createElement('td');
    let edicao = document.createElement('td');

    let inputTarefa = document.createElement('input');
    inputTarefa.type = 'text';
    tarefa.appendChild(inputTarefa);

    let inputRelevancia = document.createElement('input');
    inputRelevancia.type = 'text';
    relevancia.appendChild(inputRelevancia);

    let inputData = document.createElement('input');
    inputData.type = 'date';
    data.appendChild(inputData);

    let botaoSalvar = document.createElement('button');
    botaoSalvar.textContent = 'Salvar';
    botaoSalvar.onclick = function(){
        tarefa.innerHTML = inputTarefa.value;
        relevancia.innerHTML = inputRelevancia.value;
        data.innerHTML = inputData.value;
        edicao.innerHTML = `<button onclick="editar(this)">Editar</button>
        <button onclick="excluir(this)">Excluir</button>`;
    };

    edicao.appendChild(botaoSalvar);

    linha.appendChild(tarefa);
    linha.appendChild(relevancia);
    linha.appendChild(data);
    linha.appendChild(edicao);
    
    tBody.appendChild(linha);
}

function editar(button){
    let linha = button.parentNode.parentNode; // .parentNode pega o elemento pai. Aí 1x = td e 2x = tr;

    let tarefa = linha.querySelector('td:nth-child(1)');
    let relevancia = linha.querySelector('td:nth-child(2)');
    let data = linha.querySelector('td:nth-child(3)');

    let inputTarefa = document.createElement('input'); // Cria de novo o input
    inputTarefa.type = 'text';
    inputTarefa.value = tarefa.textContent; // Bota o valor anterior dentro do input

    let inputRelevancia = document.createElement('input');
    inputRelevancia.type = 'text';
    inputRelevancia.value = relevancia.textContent;

    let inputData = document.createElement('input');
    inputData.type = 'date';
    inputData.value = data.textContent;

    tarefa.innerHTML = ''; // Limpa o conteúdo das células antes de botar os inputs
    relevancia.innerHTML = '';
    data.innerHTML = '';

    tarefa.appendChild(inputTarefa); // Bota os inputs dentro dessas mesmas células
    relevancia.appendChild(inputRelevancia);
    data.appendChild(inputData);

    button.textContent = 'Salvar';

    button.onclick = function(){
        tarefa.innerHTML = inputTarefa.value;
        relevancia.innerHTML = inputRelevancia.value;
        data.innerHTML = inputData.value;

        button.textContent = 'Editar';
        button.onclick = function(){
            editar(button);
        };
    };
}

function excluir(button){
    let linha = button.parentNode.parentNode;
    linha.remove();
}

// Salvando local -=-=-=-=-=-=-=-=-=-=-=-=-=-=-

let tarefas = [];

function salvarTarefa(titulo, relevancia, data){
    tarefa = {
        titulo: titulo,
        relevancia: relevancia,
        data: data
    };

    tarefas.push(tarefa);

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas(){
    let tarefasSalvas = localStorage.getItem('tarefas');
    if(tarefasSalvas){
        tarefas = JSON.parse(tarefasSalvas);
        tarefas.foreach(t => adicionarNaTabela(t));
    }
}

function adicionarNaTabela(tarefa){
    let tBody = document.querySelector('#tabelaTarefas tbody');
    let linha = document.createElement('tr');

    linha.innerHTML = `
        <td>${tarefa.titulo}</td>
        <td>${tarefa.relevancia}</td>
        <td>${tarefa.data}</td>
        <td><button onclick="editar(this)">Editar</button>
        <td><button onclick="excluir(this)">Excluir</button>
    `;

    tBody.appendChild(linha);
}