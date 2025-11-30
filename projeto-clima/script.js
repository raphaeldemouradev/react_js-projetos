const key = "6f689218d9446702bdd80d7aa57ac4c6";

async function buscarCidade(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());

    colocaDadosNaTela(dados);
    console.log("Dados encontrados!");
}

function colocaDadosNaTela(dados) {
    let resCidade = document.getElementById("res-cidade");
    let resGraus = document.getElementById("res-graus");
    let resImg = document.getElementById("res-img")
    let resTempo = document.getElementById("res-tempo");

    resCidade.innerHTML = "Tempo em " + dados.name + ":";
    resGraus.innerHTML = Number.parseInt(dados.main.temp) + "°C";
    resImg.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    resTempo.innerHTML = dados.weather[0].description;

    console.log("Completo!");
}

function SearchButton() {
    let cidade = document.getElementById("input-cidade").value;

    buscarCidade(cidade);
    console.log("Procurando: " + cidade);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const cidade = document.getElementById("input-cidade").value;
        buscarCidade(cidade);
    }
});
