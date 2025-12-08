function SearchButton() {
    let cidade = document.getElementById("input-cidade").value;

    buscarCidade('forecast', cidade);
    console.log("Procurando: " + cidade);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const cidade = document.getElementById("input-cidade").value;
        buscarCidade('forecast', cidade);
    }
});


const key = "6f689218d9446702bdd80d7aa57ac4c6";

async function buscarCidade(endPoint, cidade) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${cidade}&appid=${key}&lang=pt_br&units=metric`; // "weather" foi alterado para "forecast ou endPoint" para obter a previsão

    const dados = await fetch(apiUrl).then(resposta => resposta.json());

    colocaDadosNaTela(dados);
    console.log("Dados encontrados!");
    console.log(dados);
    return dados;
}

async function endPoint(cidade) { //renderiza endPoint no console
    const tempoData = await buscarCidade('weather', cidade)

    console.log(tempoData)
}

function colocaDadosNaTela(dados) {
    let resCidade = document.getElementById("res-cidade");
    let resGraus = document.getElementById("res-graus");
    let resImg = document.getElementById("res-img")
    let resTempo = document.getElementById("res-tempo");

    resCidade.innerHTML = dados.city.name;
    resGraus.innerHTML = Number.parseInt(dados.list[0].main.temp) + "°C";
    resImg.src = `https://openweathermap.org/img/wn/${dados.list[0].weather[0].icon}.png`;
    resTempo.innerHTML = dados.list[0].weather[0].description;

    // Renderizar próximos 5 dias
    for (let i = 0; i < 5; i++) {
        const dia = dados.list[i * 8]; // A cada 8 posições são ~24h depois
        const diaDiv = document.getElementById(`dia-${i + 1}`);
        
        diaDiv.querySelector('.dia-img').src = `https://openweathermap.org/img/wn/${dia.weather[0].icon}.png`;
        diaDiv.querySelector('.dia-temp').innerHTML = Number.parseInt(dia.main.temp) + " °C";
    }

    console.log("Completo!");
}
