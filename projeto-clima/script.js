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
    const semana = document.querySelectorAll('.dia-titulo');
    for (let i = 0; i < semana.length ; i++) {
        const elementoSemana = semana[i];

        const data = new Date();
        const dia = data.getDate() + i + 1;
        const mes = data.getMonth() + 1;

        elementoSemana.innerHTML = `${dia}/${mes}`;
        console.log(elementoSemana);
    }

    const imgs = document.querySelectorAll('.dia-img');
    for (let i = 0; i < imgs.length ; i++) {
        const img = imgs[i];
        img.src = `https://openweathermap.org/img/wn/${dados.list[i * 8].weather[0].icon}.png`; // Pega o ícone
    }

    const temps = document.querySelectorAll('.dia-temp');
    for (let i = 0; i < temps.length ; i++) {
        const temp = temps[i];

        temp.innerHTML = Number.parseInt(dados.list[i * 8].main.temp) + "°C"; // Pega a temperatura
        
    }
    console.log("Completo!");
}
