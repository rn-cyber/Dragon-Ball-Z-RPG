// ===== Estado geral do jogo =====
let turno = 1
let turnoFinalizado = false
let habilidadeTocando = false
function AlternarPersonagem(estagio) {
    personagem1 = criarPersonagem1ParaEstagio(estagio);
}

const Piccolo = {
    nome: "Piccolo",
    hp: 4000,
    hpMax: 4000,
    atk: 1400,
    def: 900,
    esquiva: 18,
    critico: 15,
    ki: 1000,
    // Habilidades do Piccolo - adicione novas habilidades aqui quando estiverem prontas
    // Exemplo para adicionar segunda habilidade:
    // { codigo: "NomeDaNovaHabilidade", nome: "NomeDaNovaHabilidade", custo: 400, dano: 800 }
    habilidades: [
        { codigo: "Energy Wave", nome: "Energy Wave", custo: 400, dano: 1000 },
        { codigo: "Light Grenade", nome: "Light Grenade", custo: 600, dano: 1400}
    ],
    itens: [
        { nome: "Semente dos Deuses", cura: 500, quantidade: 3 }
    ]
};
const superVegeta = {
    nome: "Super Vegeta",
    hp: 10000,
    hpMax: 10000,
    atk: 1950,
    def: 1300,
    esquiva: 30,
    critico: 15,
    ki:5000,
    habilidades:[
        { codigo: "Final Crash", nome: "Final Crash", custo: 1500, dano: 1375},
        { codigo: "Energy Bullet", nome: "Energy Bullet", custo: 2000, dano: 2275}
    ],
    itens: [
        { nome: "Semente dos Deuses", cura: 500, quantidade: 3 }
    ]
};
const gokuBaseStats = {
    nome: "Goku",
    hp: 2000,
    hpMax: 2000,
    atk: 500,
    def: 250,
    esquiva: 12,
    critico: 5,
    ki: 750,
    // Habilidades do Goku - adicione novas habilidades aqui quando estiverem prontas
    // Exemplo para adicionar segunda habilidade:
    // { codigo: "NomeDaNovaHabilidade", nome: "NomeDaNovaHabilidade", custo: 300, dano: 600 }
    habilidades: [
        { codigo: "Kamehameha", nome: "Kamehameha", custo: 250, dano: 500 },
        { codigo: "Genki Dama", nome: "Genki Dama", custo: 1000, dano: 1100 },
        { codigo: "Super Genki Dama", nome: "Super Genki Dama", custo: 2000, dano: 2500 }
    ],
    itens: [
        { nome: "Semente dos Deuses", cura: 500, quantidade: 3 }
    ]
};

const nomesHabilidadesPorEstagio = {
    Goku: {
        "Genki Dama": {
            1: { nome: "Genki Dama", custo: 1000, dano: 1100 },
            2: { nome: "Super Genki Dama", custo: 2000, dano: 2500 }
        }
    }
};

function obterChaveHabilidade(habilidade) {
    if (!habilidade) return "";
    return habilidade.codigo || habilidade.chave || habilidade.nome || "";
}

function obterHabilidadeResolvida(personagem, habilidade, estagioAtual = estagio) {
    const base = habilidade ? { ...habilidade } : null;
    if (!base) return null;

    const chave = obterChaveHabilidade(base);
    if (!chave) return base;

    const mapeamentoPorPersonagem = personagem?.nome && nomesHabilidadesPorEstagio[personagem.nome];
    const mapeamentoPorEstagio = mapeamentoPorPersonagem?.[chave]?.[estagioAtual];

    if (!mapeamentoPorEstagio) return base;

    return {
        ...base,
        nome: mapeamentoPorEstagio.nome || base.nome || chave,
        custo: mapeamentoPorEstagio.custo ?? base.custo,
        dano: mapeamentoPorEstagio.dano ?? base.dano
    };
}

function obterNomeHabilidadeExibido(personagem, habilidade, estagioAtual = estagio) {
    const habilidadeResolvida = obterHabilidadeResolvida(personagem, habilidade, estagioAtual);
    return habilidadeResolvida?.nome || habilidade?.nome || "";
}

function criarPersonagem1ParaEstagio(estagio) {
    if (estagio === 3) {
        const personagem = JSON.parse(JSON.stringify(Piccolo));
        personagem.habilidades = personagem.habilidades.map(h => ({
            ...h,
            codigo: h.codigo || h.chave || h.nome,
            nome: h.nome || h.codigo || h.chave
        }));
        personagem.atkBase = personagem.atk;
        personagem.defBase = personagem.def;
        personagem.kiBase = personagem.ki;
        personagem.esquivaBase = personagem.esquiva;
        personagem.kaiokenAtivo = false;
        personagem.kaiokenTurnos = 0;
        personagem.powerUpAtivo=false;
        personagem.powerUpTurnos=0;
        personagem.ssjAtivo = false;
        personagem.defendendo = false;
        return personagem;
    }
    if(estagio=== 4){
        const personagem = JSON.parse(JSON.stringify(superVegeta));
        personagem.habilidades = personagem.habilidades.map(h => ({
            ...h,
            codigo: h.codigo || h.chave || h.nome,
            nome: h.nome || h.codigo || h.chave
        }));
        personagem.atkBase = personagem.atk;
        personagem.defBase = personagem.def;
        personagem.kiBase = personagem.ki;
        personagem.esquivaBase = personagem.esquiva;
        personagem.kaiokenAtivo = false;
        personagem.kaiokenTurnos = 0;
        personagem.powerUpAtivo=false;
        personagem.powerUpTurnos=0;
        personagem.ssjAtivo = false;
        personagem.defendendo = false;
        return personagem;
    }

    const multiplicador = 2 ** (estagio - 1);
    const personagem = JSON.parse(JSON.stringify(gokuBaseStats));
    personagem.hp *= multiplicador;
    personagem.hpMax *= multiplicador;
    personagem.atk *= multiplicador;
    personagem.def *= multiplicador;
    personagem.ki *= multiplicador;
    personagem.habilidades = personagem.habilidades.map(h => ({
        ...h,
        codigo: h.codigo || h.chave || h.nome,
        nome: h.nome || h.codigo || h.chave,
        dano: h.dano * multiplicador
    }));
    personagem.itens = personagem.itens.map(i => ({ ...i }));
    personagem.atkBase = personagem.atk;
    personagem.defBase = personagem.def;
    personagem.kiBase = personagem.ki;
    personagem.esquivaBase = personagem.esquiva;
    personagem.kaiokenAtivo = false;
    personagem.kaiokenTurnos = 0;
    personagem.powerUpAtivo = false;
    personagem.powerUpTurnos = 0;
    personagem.ssjAtivo = false;
    personagem.defendendo = false;
    return personagem;
}

// ===== Áudio e animações =====
let audioTrilhaEstagio = null;
let audioTelaInicial = null;
function transicaoInicio(numeroEstagio = 1) {
    const flash = document.getElementById("flash");

    // tela fica branca
    flash.style.opacity = "1";

    setTimeout(() => {

        
        document.getElementById("gameArea").style.display = "block";

        inicializarEstagio(numeroEstagio);

        // volta ao normal
        setTimeout(() => {
            flash.style.opacity = "0";
        }, 100);

    }, 800);
}
function tocarSomTelaInicial() {
    if (!audioTelaInicial) {
        audioTelaInicial = new Audio('sons/menu.mp3');
        audioTelaInicial.loop = true;
        audioTelaInicial.volume = 1;
    }

    if (audioTelaInicial.paused === false) {
        return;
    }

    audioTelaInicial.play().catch(() => {
        // Autoplay pode ser bloqueado; o áudio poderá começar ao interagir com a tela.
    });
}

function pararSomTelaInicial() {
    if (!audioTelaInicial) return;
    audioTelaInicial.pause();
    audioTelaInicial.currentTime = 0;
}

function tocarTrilhaEstagio(estagio) {
    const caminho = `sons/trilhaSonoraEstagio${estagio}.mp3`;

    if (audioTrilhaEstagio && audioTrilhaEstagio.src && audioTrilhaEstagio.src.includes(caminho)) {
        return;
    }

    if (audioTrilhaEstagio) {
        audioTrilhaEstagio.pause();
        audioTrilhaEstagio.currentTime = 0;
    }

    audioTrilhaEstagio = new Audio(caminho);
    audioTrilhaEstagio.loop = true;
    audioTrilhaEstagio.volume = 0.4;
    audioTrilhaEstagio.play().catch(() => {
        // Autoplay pode ser bloqueado; o áudio irá iniciar no próximo clique do usuário.
    });
}

function pararTrilhaEstagio() {
    if (!audioTrilhaEstagio) return;
    audioTrilhaEstagio.pause();
    audioTrilhaEstagio.currentTime = 0;
}

function escolherAnimacao(variantes) {
    return variantes[Math.floor(Math.random() * variantes.length)];
}

function criarElementoAnimacao(src) {
    if (src.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = src;
        video.autoplay = true;
        video.controls = false;
        video.loop = true;
        video.volume = 0;
        video.style.display = 'block';
        video.style.margin = '10px auto';
        video.style.maxWidth = '40%';
        return video;
    }

    const img = document.createElement('img');
    img.src = src;
    img.style.display = 'block';
    img.style.margin = '10px auto';
    img.style.maxWidth = '40%';
    return img;
}

function obterAnimacaoAtaque(atacante) {
    if (atacante.nome === 'Vegeta') {
        if (atacante.oozaruAtivo) {
            return ['imagens/oozaruAtaque2.mp4','imagens/oozaruAtaque1.mp4'];
        }
        return ['imagens/vegetaAtaque.mp4', 'imagens/vegetaAtaque2.mp4'];
    }
    if (atacante.nome ==='Super Vegeta'){
        return ['imagens/supervegetaataque1.mp4', 'imagens/supervegetaataque2.mp4']
    }

    if (atacante.nome === 'Goku') {
        if (atacante.ssjAtivo) {
            return ['imagens/gokuSSJHitFreezaMax.mp4', 'imagens/gokuSSJAtaque.mp4'];
        }
        if (estagio === 2 && atacante.ssjAtivo === false) {
            return ['imagens/gokuHitFreeza.mp4', 'imagens/gokuHitFreeza.mp4'];
        }
        if (atacante.kaiokenAtivo && atacante.ssjAtivo === false) {
            return ['imagens/ataqueKaioken.mp4', 'imagens/ataqueKaioken2.mp4'];
        }
        return ['imagens/gokuAtaque.mp4', 'imagens/gokuAtaque2.mp4'];
    }

    if (atacante.nome === 'Piccolo') {
        return ['imagens/PiccoloAtaque1.mp4', 'imagens/PiccoloAtaque2.mp4'];
    }

    if (atacante.nome === 'Cell Imperfeito') {
        return ['imagens/CellImpeAtaque1.mp4', 'imagens/CellImpeAtaque2.mp4'];
    }

    if (atacante.nome === 'Cell Semi-perfeito'){
        return ['imagens/cellSemiataque1.mp4', 'imagens/cellSemiataque2.mp4']
    }
    if (atacante.nome === 'Freeza') {
        if (atacante.transformacaoAtiva) {
            return ['imagens/freezaFullAtaque2.mp4', 'imagens/freezaFullAtaque.mp4'];
        }
    }
    return ['imagens/freezaHitGoku.mp4', 'imagens/freezaAtaque2.mp4'];
}

function obterSomHabilidade(habilidade, personagem = null, estagioAtual = estagio) {
    const habilidadeResolvida = obterHabilidadeResolvida(personagem, habilidade, estagioAtual);
    const nomeHabilidade = habilidadeResolvida?.nome || obterChaveHabilidade(habilidade);
    const mapeadorSons = {
        "Mouth Energy Wave":"sons/mouthEnergyWave.mp3",
        "Final Crash":"sons/finalCrash.mp3",
        "Energy Bullet":"sons/energyBullet.mp3",
        "Kiai":"sons/kiai.mp3",
        "Kamehamehax3":"sons/kamehamehax3.mp3",
        "Kamehameha": "sons/kamehameha.mp3",
        "Genki Dama": "sons/GenkiDama1.mp3",
        "Super Genki Dama":"sons/GenkiDama2.mp3",
        "SuperKamehameha": "sons/SuperKamehameha.mp3",
        "Kamehameha X20": "sons/kamehamehax20.mp3",
        "Galick Ho": "sons/GalickHo.mp3",
        "Death Beam": "sons/DeathBeam.mp3",
        "Death Ball": "sons/DeathBall.mp3",
        "Chou Makouhou": "sons/ChouMakouhou.mp3",
        "Energy Wave": "sons/EnergyWave.mp3",
        "Light Grenade": "sons/LightGrenade.mp3",
        "Absorcao": "sons/Absorcao.mp3"
    };
    return mapeadorSons[nomeHabilidade] || null;
}

const effectAudios = [];

function tocarSomHabilidade(habilidade, personagem = null, estagioAtual = estagio) {
    const caminho = obterSomHabilidade(habilidade, personagem, estagioAtual);

    if (!caminho) return;

    habilidadeTocando = true;

    const audio = playEffectAudio(caminho);

    audio.onended = () => {
        habilidadeTocando = false;
    };
}

function obterSomEfeito(nomeEfeito) {
    const mapeadorEfeitos = {
        "PowerUpSuperVegeta": "imagens/PowerUpSuperVegeta.mp4",
        "kiChargeCellSemi": "imagens/kiChargeCellSemi.mp4",
        "Defesa":"sons/Defesa.mp3",
        "Senzu":"sons/Senzu.mp3",
        "Critico":"sons/Critico.mp3",
        "Esquiva":"sons/Esquiva.mp3",
        "kiCharge":"sons/kiCharge.mp3",
        "Atacar":"sons/Atacar.mp3",
        "Kaiokenx20": "sons/kaiokenx20.mp3",
        "Kaioken": "sons/kaioken.mp3",
        "Super Saiyajin": "sons/gokuSSJ.mp3",
        "Oozaru": "sons/oozaru.mp3",
        "Freeza Transformacao": "sons/FreezaTransformacao.mp3",
        "GokuSSJPower": "sons/GokuSSJPower.mp3",
        "PiccoloPowerUp":"imagens/PiccoloPowerUp.mp4"
    };
    return mapeadorEfeitos[nomeEfeito] || null;
}

function tocarSomEfeito(nomeEfeito) {
    
    if (nomeEfeito === "Atacar" && habilidadeTocando) {
    return;
    }
    
    const caminho = obterSomEfeito(nomeEfeito);
    if (!caminho) return;

    playEffectAudio(caminho);
}

function playEffectAudio(caminho) {
    // Se já houver um som de efeito em reprodução, interrompe antes de tocar o próximo.
    pararEfeitosAudio();
    const audio = new Audio(caminho);
    audio.volume = 0.65;
    effectAudios.push(audio);
    audio.play().catch(() => {
        // Falha silenciosa se o áudio não puder ser reproduzido
    });
    audio.addEventListener('ended', () => {
        const index = effectAudios.indexOf(audio);
        if (index !== -1) {
            effectAudios.splice(index, 1);
        }
    });
    return audio;
}

function pararEfeitosAudio() {
    effectAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    effectAudios.length = 0;
}

function obterAnimacaoHabilidade(atacante, habilidade, estagioAtual = estagio) {
    const habilidadeResolvida = obterHabilidadeResolvida(atacante, habilidade, estagioAtual);
    const nomeHabilidade = habilidadeResolvida?.nome || obterChaveHabilidade(habilidade);

    if (atacante.nome === 'Goku') {
        if ((nomeHabilidade === 'SuperKamehameha' || nomeHabilidade === 'Super Kamehameha') && atacante.ssjAtivo && atacante.ki >= 250) {
            return ['imagens/SuperKamehameha2.mp4'];
        }
        if (atacante.kaiokenAtivo && atacante.ssjAtivo === false && estagio === 2 && atacante.ki >= 250) {
            return ['imagens/kamehamehax20.mp4'];
        }
        if (atacante.kaiokenAtivo && atacante.ki >= 250) {
            tocarSomEfeito("Kamehamehax3")
            return ['imagens/kameKaioken.mp4'];
            
        }
        if(atacante.ki>=200 && estagioAtual===2 && nomeHabilidade==="Kiai" && atacante.ssjAtivo === true){
            return['imagens/kiai.mp4'];
        }
        if(atacante.ki>=2000 && estagioAtual === 2 && nomeHabilidade==="Super Genki Dama"){
            return['imagens/SuperGenkiDama.mp4']
        }
        if(atacante.ki>=1000 && estagioAtual === 1 && nomeHabilidade==="Genki Dama"){
            return['imagens/GenkiDama01.mp4']
        }
        if (atacante.ki >= 250 && atacante.kaiokenAtivo === false && atacante.ssjAtivo === false && nomeHabilidade ==="Kamehameha") {
            return ['imagens/kamehameha.mp4'];
        }
        
        
    }

    if (nomeHabilidade === 'Energy Wave' && atacante.ki >= 400) {
        return ['imagens/EnergyWave.mp4'];
    }
    if (nomeHabilidade === 'Light Grenade' && atacante.ki >=600){
        return ['imagens/LightGrenade.mp4'];
    }
    if(nomeHabilidade=== 'Energy Bullet' && atacante.ki>=2000){
        return ['imagens/energyBullet.mp4']
    }
    if(nomeHabilidade=== 'Final Crash' && atacante.ki>=1500){
        return ['imagens/finalCrash.mp4']
    }
    if (obterChaveHabilidade(habilidade)==='Mouth Energy Wave'){
        return ['imagens/mouthEnergyWave.mp4'];
    }
    if (obterChaveHabilidade(habilidade) === 'Absorcao') {
        return ['imagens/Absorcao.mp4'];
    }

    if (obterChaveHabilidade(habilidade) === 'Galick Ho') {
        return ['imagens/galickHo.mp4'];
    }
    if (obterChaveHabilidade(habilidade) === 'Chou Makouhou') {
        return ['imagens/chouMako.mp4'];
    }
    if (obterChaveHabilidade(habilidade) === 'Death Beam') {
        return ['imagens/deathBeam.mp4'];
    }
    if (obterChaveHabilidade(habilidade) === 'Death Ball') {
        return ['imagens/DeathBall.mp4', 'imagens/DeathBall.mp4'];
    }

    return ['imagens/0.mp4', 'imagens/01.mp4'];
}

function statusDeBatalha(personagemA, personagemB) {
    logBattle(`
      <div class="status-turno">
        <p><strong>${personagemA.nome}</strong> — HP: ${personagemA.hp} — KI: ${personagemA.ki}</p>
        <p><strong>${personagemB.nome}</strong> — HP: ${personagemB.hp} — KI: ${personagemB.ki}</p>
      </div>
    `);

    GokuSSJ(personagemA);
    if (estagio >= 3) {
        atualizarPowerUp(personagemA);
        atualizarPowerUp(personagemB);
    } else {
        atualizarKaioken(personagemA);
        atualizarKaioken(personagemB);
    }
}

function getImagemStatus(personagem, estagio) {
    if (personagem.nome === "Goku") {
        if (personagem.ssjAtivo) {
            return "imagens/gokuSSJ.mp4";
        }
        return estagio === 2 ? "imagens/gokuEstagio2.mp4" : "imagens/GokuEstagio1.mp4";
    }
    if (personagem.nome === "Freeza") {
        return personagem.transformacaoAtiva ? "imagens/freeza.mp4" : "imagens/freeza.mp4";//o segundo é os status
    }
    if (personagem.nome === "Vegeta") {
        return "imagens/VegetaEstagio1.mp4";
    }
    if (personagem.nome === "Cell Imperfeito") {
        return "imagens/CellImperfeito.mp4";
    }
    if (personagem.nome === "Piccolo") {
        return "imagens/Piccolo.mp4";
    }
    if(personagem.nome==="Super Vegeta"){
        return "imagens/supervegeta.mp4";
    }
    if(personagem.nome==="Cell Semi-perfeito"){
        return "imagens/CellSemiperfeito.mp4";
    }
    return "imagens/goku.png";
}

function getStatusMediaHtml(personagem, estagio) {
    const src = getImagemStatus(personagem, estagio);
    if (src.endsWith('.mp4')) {
        return `
            <video src="${src}" autoplay loop muted playsinline style="display:block;margin:10px auto;max-width:250px;"></video>
        `;
    }
    return `
        <img src="${src}" style="display:block;margin:10px auto;max-width:250px;">
    `;
}

function getStatusHtml(personagem, estagio) {
    return `
        <div class="status-title">STATUS ${personagem.nome}</div>
        <div class="atributos">
            Ataque: ${personagem.atk} | Defesa: ${personagem.def} | HP: ${personagem.hp} | KI: ${personagem.ki} | Esquiva: ${personagem.esquiva} | Crítico: ${personagem.critico}
        </div>
        ${getStatusMediaHtml(personagem, estagio)}
    `;
}


// ===== Transformações =====
function GokuSSJ(personagem) {
    if (personagem.nome !== "Goku" || personagem.ssjAtivo || estagio === 1) return;
    if (personagem.hp <= 900) {
        personagem.ssjAtivo = true;
        personagem.kaiokenAtivo=false;
        personagem.hp += 2000;
        personagem.atk += 400;
        personagem.def += 150;
        personagem.critico += 5;
        personagem.ki += 500;
        personagem.habilidades[0].codigo = "SuperKamehameha";
        personagem.habilidades[0].nome = "SuperKamehameha";
        personagem.habilidades[0].custo += 100;
        personagem.habilidades[0].dano += 200;
        personagem.habilidades[1].codigo = "Kiai";
        personagem.habilidades[1].nome = "Kiai";
        personagem.habilidades[1].custo = 200;
        personagem.habilidades[1].dano = 500;
        logBattle(`<div class="habilidade-msg">${personagem.nome} despertou o Super Saiyajin!</div>`);
        tocarSomEfeito("Super Saiyajin");
        atualizarBotaoKaioken();
        const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/gokuSSJ.mp4";
        video.autoplay = true;
        video.controls = false;
        video.loop = false;
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.style.maxWidth = "40%";
        battleLog.appendChild(video);

        atualizarStatus(personagem, personagem2);
    }
}

function mostrarAnimDerrota(personagem) {
    const battleLog = document.getElementById("battle-log");
    const video = document.createElement("video");
    video.style.display = "block";
    video.style.margin = "10px auto";
    video.autoplay = true;
    video.controls = false;
    video.loop = true;
    video.volume = 0;
    video.style.maxWidth = "40%";

    if (personagem.nome === "Goku" && estagio === 1) {
        video.src = "imagens/vegetaKO.mp4";
    } else if (personagem.nome === "Freeza") {
        video.src = "imagens/freezaMorreGoku.mp4";
    } else if (personagem.nome === "Vegeta") {
        video.src = "imagens/gokuKO.mp4";
    } else if (personagem.nome === "Goku" && estagio === 2) {
        video.src = "imagens/gokuMorreFreeza.mp4";
    } else if (personagem.nome === "Cell Imperfeito") {
        video.loop = false
        video.src = "imagens/CellImperfeitoKO.mp4";
    } else if(personagem.nome === "Cell Semi-perfeito"){
        pararTrilhaEstagio()
        video.src = "imagens/CellSemiKO.mp4";
        video.volume = 0.5;
        video.loop = false
    }

    battleLog.appendChild(video);
}

function transformarFreeza(defensor) {
    if (defensor.nome !== "Freeza" || defensor.transformacaoAtiva) return;

    defensor.transformacaoAtiva = true;
    defensor.hp += 2500;
    defensor.atk += 50;
    defensor.def += 100;
    defensor.critico += 5;
    defensor.ki += 800
    defensor.habilidades[0].codigo = "Death Ball";
    defensor.habilidades[0].nome = "Death Ball";

    logBattle(`<div class="habilidade-msg">${defensor.nome} se transformou em sua forma final!</div>`);
    tocarSomEfeito("Freeza Transformacao");
    const battleLog = document.getElementById("battle-log");
    const video = document.createElement("video");
    video.src = "imagens/freezaTransform.mp4";
    video.autoplay = true;
    video.controls = false;
    video.loop = false;
    video.style.display = "block";
    video.style.margin = "10px auto";
    video.style.maxWidth = "40%";
    battleLog.appendChild(video);
}

// ===== Habilidades e combate =====
function atacar(atacante, defensor) {
    let chanceEsquiva = Math.floor(Math.random() * 100)
    let chanceCritico = Math.floor(Math.random() * 100)
    let dano = atacante.atk - defensor.def
    const battleLog = document.getElementById("battle-log");
    if (chanceEsquiva <= defensor.esquiva) {
        logBattle(`<div class="esquiva-msg">${defensor.nome} esquivou dos ataques de ${atacante.nome}!</div>`);
        return
    } 
    const animacao = escolherAnimacao(obterAnimacaoAtaque(atacante));
    const elementoAnimacao = criarElementoAnimacao(animacao);
    battleLog.appendChild(elementoAnimacao);
    if (defensor.defendendo) {
        dano = Math.floor(dano / 2); // reduz pela metade
        defensor.defendendo = false; // defesa vale só para um turno
        
    }
    if (chanceCritico <= atacante.critico) {
        dano *= 2
        logBattle(`<div class="critico-msg">*DANO CRÍTICO*</div>`);
        tocarSomEfeito("Critico")
    }else {
        tocarSomEfeito("Atacar");
    }
    

    if (defensor.def >= atacante.atk) {
        dano = 1
    }

    defensor.hp -= dano
    if (defensor.hp < 0) defensor.hp = 0;
    
    logBattle(`<div class="dano-msg">${atacante.nome} atacou e causou ${dano} de dano</div>`);
    if (defensor.nome === "Vegeta" && defensor.hp <= 100 && !defensor.oozaruAtivo) {
        transformarEmOozaru(defensor);
        turnoFinalizado = true; // encerra o turno aqui
        return;
    }
    if (defensor.nome === "Freeza" && defensor.hp <= 900 && !defensor.transformacaoAtiva) {
        transformarFreeza(defensor);
        turnoFinalizado = true;
        return;
    }
    if (defensor.nome === "Goku" && defensor.hp > 0 && defensor.hp <= 900 && !defensor.ssjAtivo) {
        GokuSSJ(defensor);
        turnoFinalizado = true;
        return;
    }

    if (defensor.hp <= 0) {
        mostrarAnimDerrota(defensor);
        logBattle(`<div class="derrota-title">${defensor.nome} FOI DERROTADO!</div>`);
        if (defensor === personagem1) {

            document.getElementById("game-over-overlay").style.display = "flex";
            document.getElementById("controls").style.display = "none";
        } else if (defensor === personagem2) {

            // Verifica se existe próximo estágio
            if (estagios[estagio + 1]) {
                mostrarBotaoEstagio2();
            }
        }

    }



}

/*function batalhar(personagemA, personagemB) {

    while (personagemA.hp > 0 && personagemB.hp > 0) {
        logBattle(`<div class="turno-title">TURNO ${turno}</div>`);
        // Goku decide se ataca ou usa habilidade
        if (Math.random() < 0.25) { // % de chance de usar habilidade
            usarHabilidade(personagemA, personagemB, personagemA.habilidades[0]); // Kamehameha
        } else {
            atacar(personagemA, personagemB)
        }
        if (personagemB.hp <= 0) {

            break
        }
        // Vegeta decide se ataca ou usa habilidade
        if (turnoFinalizado) {
            turnoFinalizado = false; // reseta para o próximo turno
            turno++;
            continue; // Vegeta não age nesse turno
        }
        if (Math.random() < 0.2) {
            usarHabilidade(personagemB, personagemA, personagemB.habilidades[0]); // Final Flash
        } else {
            atacar(personagemB, personagemA)
        }
        if (personagemA.hp <= 0) {

            break
        }
        statusDeBatalha(personagemA, personagemB);

    }
}
    */
function usarHabilidade(atacante, defensor, habilidade) {
    const habilidadeResolvida = obterHabilidadeResolvida(atacante, habilidade, estagio);
    const nomeExibido = habilidadeResolvida?.nome || obterNomeHabilidadeExibido(atacante, habilidade, estagio);
    logBattle(`<div class="habilidade-msg">${atacante.nome} usou ${nomeExibido}!</div>`);
    
    if((atacante.kaiokenAtivo || atacante.ssjAtivo) && obterChaveHabilidade(habilidade) === "Genki Dama"){
        logBattle(`<div class="esquiva-msg">${atacante.nome} não pode usar a Genki Dama transformado!</div>`);
        return;
    }
    if(atacante.ki>=habilidadeResolvida.custo){
    tocarSomHabilidade(habilidade, atacante, estagio);
    }
    if (atacante.ki < habilidadeResolvida.custo) {
        logBattle(`<div class="esquiva-msg">Mas ${atacante.nome} não tem Ki suficiente!</div>`);
        return;
    }
    const battleLog = document.getElementById("battle-log");
    const animacao = escolherAnimacao(obterAnimacaoHabilidade(atacante, habilidade, estagio));
    const elementoAnimacao = criarElementoAnimacao(animacao);
    battleLog.appendChild(elementoAnimacao);
    if (atacante.nome==="Piccolo" && obterChaveHabilidade(habilidade) === "Energy Wave") {
    atacante.ki}
    atacante.ki -= habilidadeResolvida.custo;
    let dano = habilidadeResolvida.dano + Math.floor(atacante.atk * 0.5) - defensor.def;
    if (defensor.defendendo) {
        dano = Math.floor(dano / 2); // reduz pela metade
        defensor.defendendo = false; // defesa vale só para um turno
        
    }
    if (dano < 1) dano = 1;

    defensor.hp -= dano;
    if (defensor.hp < 0) defensor.hp = 0;
    logBattle(`<div class="dano-msg">${atacante.nome} usou ${nomeExibido} e causou ${dano} de dano!</div>`);
    if (atacante.nome === "Cell Imperfeito" && obterChaveHabilidade(habilidade) === "Absorcao") {
        atacante.hp += 300
        defensor.ki -= 200
        atacante.ki += 200
    }
    if (defensor.nome === "Vegeta" && defensor.hp <= 100 && !defensor.oozaruAtivo) {
        transformarEmOozaru(defensor);
        turnoFinalizado = true;
        return;

    }
    if (defensor.nome === "Freeza" && defensor.hp <= 1200 && !defensor.transformacaoAtiva) {
        transformarFreeza(defensor);
        turnoFinalizado = true;
        return;
    }
    if (defensor.nome === "Goku" && defensor.hp > 0 && defensor.hp <= 900 && !defensor.ssjAtivo) {
        GokuSSJ(defensor);
        turnoFinalizado = true;
        return;
    }
    if (defensor.hp <= 0) {
        mostrarAnimDerrota(defensor);
        logBattle(`<div class="derrota-title">${defensor.nome} FOI DERROTADO!</div>`);
        if (defensor === personagem1) {
            document.getElementById("game-over-overlay").style.display = "flex";
            document.getElementById("controls").style.display = "none";
        } else if (defensor === personagem2) {
            // Verifica se existe próximo estágio
            if (estagios[estagio + 1]) {
                mostrarBotaoEstagio2();
            }
        }
    }
}
function logBattle(msg) {
    const logDiv = document.getElementById("battle-log");
    const p = document.createElement("div"); // pode ser div em vez de p
    p.innerHTML = msg; // <-- usar innerHTML em vez de textContent
    logDiv.appendChild(p);
    logDiv.scrollTop = logDiv.scrollHeight;
}

function atualizarStatus(personagemA, personagemB) {
    const statusDiv = document.getElementById("status");

}

function mostrarBotaoEstagio2() {
    const botao = document.getElementById("btnEstagio2");
    if (!botao) return;
    botao.style.display = "inline-block";
}

function ocultarBotaoEstagio2() {
    const botao = document.getElementById("btnEstagio2");
    if (!botao) return;
    botao.style.display = "none";
}

function atualizarBotaoKaioken() {
    const botao = document.querySelector(".btn-kaioken");
    if (!botao) return;

    }

function mostrarMenuHabilidades() {
    const container = document.getElementById("menu-habilidades");
    const botoesContainer = document.getElementById("menu-habilidades-botoes");

    if (!container || !botoesContainer || !personagem1 || !personagem1.habilidades) {
        return;
    }

    // Sempre mostrar 2 slots de habilidades (mesmo que um esteja vazio)
    const habilidades = personagem1.habilidades.slice(0, 2);
    botoesContainer.innerHTML = "";

    // Preencher até 2 slots
    for (let i = 0; i < 2; i++) {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "btn-menu-habilidade";
        
        if (habilidades[i]) {
            // Se a habilidade existe, usa seu nome exibido de acordo com o estágio
            botao.textContent = obterNomeHabilidadeExibido(personagem1, habilidades[i], estagio);
            botao.addEventListener("click", () => selecionarHabilidade(i));
        } else {
            // Se o slot está vazio, mostra como "Não nomeado"
            botao.textContent = "Não nomeado";
            botao.disabled = true;
            botao.style.opacity = "0.5";
            botao.style.cursor = "not-allowed";
        }
        
        botoesContainer.appendChild(botao);
    }

    container.style.display = "flex";
}

function esconderMenuHabilidades() {
    const container = document.getElementById("menu-habilidades");
    if (container) {
        container.style.display = "none";
    }
}

function selecionarHabilidade(index) {
    const habilidade = personagem1 && personagem1.habilidades ? personagem1.habilidades[index] : null;
    esconderMenuHabilidades();

    if (!habilidade) {
        return;
    }

    executarAcaoJogador("habilidade", habilidade);
}

// ===== Estágios e inicialização =====
const estagios = {
    1: {
        nome: "Saga Saiyajin",
        frase: "O príncipe dos Saiyajins",
        inimigo: "Vegeta",
        criarPersonagem2: () => ({
            nome: "Vegeta",
            hp: 2000,
            atk: 400,
            def: 350,
            esquiva: 13,
            critico: 12,
            ki: 1000,
            // Habilidades do Vegeta - adicione a segunda habilidade aqui quando estiver pronta
            // Exemplo: { nome: "FinalFlash", custo: 300, dano: 600 }
            habilidades: [
                { nome: "Galick Ho", custo: 250, dano: 550 }
                // Adicione a segunda habilidade aqui
            ],
            atkBase: 450,
            esquivaBase: 13,
            kaiokenAtivo: false,
            kaiokenTurnos: 0,
            oozaruAtivo: false
        })
    },
    2: {
        nome: "Saga Freeza",
        frase: "O Imperador do Universo",
        inimigo: "Freeza",
        criarPersonagem2: () => ({
            nome: "Freeza",
            hp: 4000,
            atk: 1200,
            def: 700,
            esquiva: 20,
            critico: 15,
            ki: 1500,
            // Habilidades do Freeza - adicione a segunda habilidade aqui quando estiver pronta
            // Exemplo: { nome: "DeathBall", custo: 400, dano: 1200 }
            habilidades: [
                { nome: "Death Beam", custo: 250, dano: 1000 }
                // Adicione a segunda habilidade aqui
            ],
            atkBase: 1200,
            esquivaBase: 20,
            kaiokenAtivo: false,
            kaiokenTurnos: 0,
            oozaruAtivo: false,
            transformacaoAtiva: false
        })
    },
    3: {
        nome: "Saga Cell - 1",
        frase: "O bio-androide surge",
        inimigo: "Cell Imperfeito",
        criarPersonagem2: () => ({
            nome: "Cell Imperfeito",
            hp: 4000,
            atk: 1400,
            def: 850,
            esquiva: 30,
            critico: 12,
            ki: 2000,
            // Habilidades do Cell - adicione a segunda habilidade aqui quando estiver pronta
            // Exemplo: { nome: "CellBlast", custo: 500, dano: 1000 }
            habilidades: [
                { nome: "Absorcao", custo: 0, dano: 400 }
                // Adicione a segunda habilidade aqui
            ],
            atkBase: 600,
            esquivaBase: 30,
            kaiokenAtivo: false,
            kaiokenTurnos: 0,
            oozaruAtivo: false
        })
    },
    4: {
        nome: "Saga Cell - 2",
        frase: "Cell absorve Androide 17",
        inimigo: "Cell Semi-perfeito",
        criarPersonagem2: () => ({
            nome: "Cell Semi-perfeito",
            hp: 10000,
            atk: 2000,
            def: 1250,
            esquiva: 20,
            critico: 15,
            ki: 6000,
            // Habilidades do cell semi - adicione habilidades aqui quando estiverem prontas
            // Exemplo: { nome: "NovaHabilidade", custo: 300, dano: 800 }
            habilidades: [
                { nome: "Mouth Energy Wave", custo: 1500, dano: 2300 }
                // Adicione a segunda habilidade aqui
            ],
            atkBase: 1200,
            esquivaBase: 20,
            kaiokenAtivo: false,
            kaiokenTurnos: 0,
            oozaruAtivo: false,
            transformacaoAtiva: false
        })
    },
    5: {
        nome: "Saga Cell - 3",
        frase: "O Erro de Vegeta, Cell absorve Androide 18",
        inimigo: "Cell Perfeito",
        criarPersonagem2: () => ({
            nome: "Cell Perfeito",
            hp: 10000,
            atk: 2000,
            def: 1250,
            esquiva: 20,
            critico: 15,
            ki: 6000,
            // Habilidades do cell semi - adicione habilidades aqui quando estiverem prontas
            // Exemplo: { nome: "NovaHabilidade", custo: 300, dano: 800 }
            habilidades: [
                { nome: "indefinida", custo: 1500, dano: 2300 }
                // Adicione a segunda habilidade aqui
            ],
            atkBase: 1200,
            esquivaBase: 20,
            kaiokenAtivo: false,
            kaiokenTurnos: 0,
            oozaruAtivo: false,
            transformacaoAtiva: false
        })
    },
};

function inicializarEstagio(numEstagio) {
    const config = estagios[numEstagio];
    if (!config) return;
    pararEfeitosAudio();
    turno = 1;
    estagio = numEstagio;
    mudarFundoEstagio(estagio);
    tocarTrilhaEstagio(estagio);
    
    personagem1 = criarPersonagem1ParaEstagio(estagio);
    atualizarBotaoKaioken();

    // Reseta personagem2
    personagem2 = config.criarPersonagem2();

    // Log do novo estágio
    logBattle(`<div class="turno-title">ESTÁGIO ${estagio}: ${config.nome}</div>`);
    logBattle(`<div class="habilidade-msg">${config.frase}</div>`);

    // Exibe status dos personagens
    logBattle(getStatusHtml(personagem1, estagio));
    logBattle(getStatusHtml(personagem2, estagio));

    GokuSSJ(personagem1);
    ocultarBotaoEstagio2();
}

const botaoEstagio2 = document.getElementById("btnEstagio2");
if (botaoEstagio2) {
    botaoEstagio2.addEventListener("click", () => {
        const proximoEstagio = estagio + 1;
        mostrarPrologo(proximoEstagio);
        pararTrilhaEstagio()
    });
}

const prologos = {
    1: "imagens/sagasaiyajin.mp4",
    2: "imagens/sagafreeza.mp4",
    3: "imagens/sagacell1.mp4",
    4: "imagens/sagacell2.mp4",
    5: "imagens/sagacell3.mp4"
};

// Função para mostrar o prólogo de uma saga
function mostrarPrologo(numeroEstagio) {
  const videoPath = prologos[numeroEstagio];
  if (!videoPath || !videoPrologoSource || !videoPrologo || !telaPrologo || !btnPrologoContinuar) {
    return;
  }

  let prologoJaIniciado = false;

  videoPrologoSource.src = videoPath;
  videoPrologo.load();
  telaPrologo.style.display = "flex";
  videoPrologo.currentTime = 0;
  videoPrologo.loop = false;

  const iniciarEstagio = () => {
    if (prologoJaIniciado) {
      return;
    }

    prologoJaIniciado = true;
    videoPrologo.onended = null;

    telaPrologo.style.display = "none";
    videoPrologo.pause();
    videoPrologo.currentTime = 0;
    transicaoInicio(numeroEstagio);
  };

  btnPrologoContinuar.onclick = iniciarEstagio;
  videoPrologo.onended = iniciarEstagio;
  videoPrologo.play().catch(() => {
    // Autoplay pode ser bloqueado; o vídeo pode continuar ao interagir com a tela.
  });
}

// ===== Ações dos botões =====
document.addEventListener("keyup", function(event) {
    const container = document.getElementById("menu-habilidades");
  if (container && container.style.display === "flex") {
    switch(event.key) {
      case "a": // tecla 1 → primeira habilidade
        selecionarHabilidade(0);
        break;
      case "s": // tecla 2 → segunda habilidade
        selecionarHabilidade(1);
        break;
      case "Alt": // tecla Esc → fechar menu sem escolher
        esconderMenuHabilidades();
        break;
    }
  }
  switch(event.key.toLowerCase()) {
    case "z": // tecla z → atacar
      acaoJogador("atacar");
      break;
    case "x": // tecla x → habilidade
      acaoJogador("habilidade");
      break;
    case "c": // tecla c → item
      acaoJogador("item");
      break;
    case "v": // tecla v → defesa
      acaoJogador("defesa");
      break;
    case "b": // tecla b → carregar Ki
      acaoJogador("carregarKi");
      break;
    case "n": // tecla n → kaioken
      acaoJogador("kaioken");
      break;
    case "r": // tecla r → reiniciar jogo
      reiniciarJogo();
      break;
  }
});

function acaoJogador(acao) {
    if (acao === 'habilidade') {
        mostrarMenuHabilidades();
        return;
    }

    executarAcaoJogador(acao);
}

function executarAcaoJogador(acao, habilidadeSelecionada = null) {
    if (turnoFinalizado) {
        turnoFinalizado = false;
        // Se uma transformação ou efeito encerrou o turno anterior, apenas limpa a flag
        // e permite que o jogador execute a ação no novo turno.
    }

    logBattle(`<div class="turno-title">TURNO ${turno}</div>`);
    if (acao === 'atacar') {
        atacar(personagem1, personagem2);
    } else if (acao === 'habilidade') {
        const habilidade = habilidadeSelecionada || personagem1.habilidades[0];
        usarHabilidade(personagem1, personagem2, habilidade);
    } else if (acao === 'item') {
        if(estagio===3 || personagem1.nome==="Piccolo"){
            CuraPiccolo(personagem1, personagem1.itens[0]);
        }else{
            usarItem(personagem1, personagem1.itens[0]);
        }
        
        
    } else if (acao === 'defesa') {
        defender(personagem1);
    } else if (acao === 'carregarKi') {
        carregarKi(personagem1);
    } else if (acao === 'kaioken') {
        if (estagio >2 || personagem1.ssjAtivo)  {
            PowerUp(personagem1);
        } else {
            usarKaioken(personagem1);
        }
    }

    if (personagem2.hp <= 0) return;

    if (turnoFinalizado) {
        turnoFinalizado = false;
        statusDeBatalha(personagem1, personagem2);
        turno++;
        return;
    }

    // IA decide sua ação com base em % 
    let escolha = Math.random();
    if (escolha < 0.20 && personagem2.ki>=250) { //20% de chance
        usarHabilidade(personagem2, personagem1, personagem2.habilidades[0]);
    } else if (escolha < 0.40){ //20% de chance
        defender(personagem2);        
    } else if(personagem2.ki<250){ //10% de chance
        carregarKi(personagem2);
    } else if(escolha<1.00 ){ //60% de chance
        atacar(personagem2, personagem1);
    }

    if (personagem1.hp <= 0) return;
    statusDeBatalha(personagem1, personagem2);
    turno++
}
function CuraPiccolo(personagem, item){
    if (item.quantidade > 0 && personagem.nome==="Piccolo") {
        logBattle(`<div class="habilidade-msg">${personagem.nome} usou regeneração!</div>`);
        const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/PiccoloRegen.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = false;
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "35%";
        battleLog.appendChild(video);

        personagem.hp += item.cura;
        if (personagem.hp > personagem.hpMax)
            personagem.hp = personagem.hpMax;
        // limite máximo de HP

        item.quantidade--; // reduz uma semente

        logBattle(`<div class="dano-msg">${personagem.nome} recuperou ${item.cura} de HP! Restam ${item.quantidade} regenerações.</div>`);
    } else {
        logBattle(`<div class="esquiva-msg">${personagem.nome} não consegue mais se regenerar!</div>`);
    }
}
function usarItem(personagem, item) {
    if (item.quantidade > 0 ) {
        tocarSomEfeito("Senzu")
        logBattle(`<div class="habilidade-msg">${personagem.nome} usou ${item.nome}!</div>`);
        const battleLog = document.getElementById("battle-log");
        const img = document.createElement("img");
        img.src = "imagens/sementeDeuses.png";
        img.style.display = "block";
        img.style.margin = "10px auto";
        img.style.maxWidth = "80px";
        battleLog.appendChild(img);
        if(estagio>3){
            item.cura+=500
        }
        personagem.hp += item.cura;
        if (personagem.hp > personagem.hpMax)
            personagem.hp = personagem.hpMax;
        // limite máximo de HP

        item.quantidade--; // reduz uma semente

        logBattle(`<div class="dano-msg">${personagem.nome} recuperou ${item.cura} de HP! Restam ${item.quantidade} sementes.</div>`);
    } else {
        logBattle(`<div class="esquiva-msg">${personagem.nome} não tem mais ${item.nome}!</div>`);
    }
}
function defender(personagem) {
    
    personagem.defendendo = true; // flag para reduzir dano no próximo turno
    logBattle(`<div class="habilidade-msg">${personagem.nome} assumiu postura defensiva! (o proximo dano será reduzido)</div>`);

}
function carregarKi(personagem) {
    let ganho = 225;
    if(estagio>3){
        ganho = 800;
    }else{
        ganho = 225;
    }
    personagem.ki += ganho;
    logBattle(`<div class="habilidade-msg">${personagem.nome} aumentou ${ganho} de Ki!</div>`);
    if (estagio === 1 && personagem.nome==="Goku") {
        tocarSomEfeito("kiCharge");
        const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/kiCharge1.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = true;
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "35%";
        battleLog.appendChild(video);
}
if (estagio === 1 && personagem.nome==="Vegeta") {
    tocarSomEfeito("kiCharge");
        const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/kiCharge1Vegeta.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = true;
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "35%";
        battleLog.appendChild(video);
}
if (estagio === 2 && personagem.nome==="Goku" && personagem.ssjAtivo === false) {
    tocarSomEfeito("kiCharge");
        const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/kiCharge2.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = true;
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "35%";
        battleLog.appendChild(video);
}
if (estagio === 2 && personagem.nome==="Goku" && personagem.ssjAtivo) {
        tocarSomEfeito("GokuSSJPower")
        const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/GokuSSJPowerUp.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = true;
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "30%";
        battleLog.appendChild(video);
}
if (estagio === 2 && personagem.nome==="Freeza" && personagem.transformacaoAtiva===false) {
        const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/kiCharge2Freeza.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = false;
        video.volume = 0.5
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "35%";
        battleLog.appendChild(video);
}
if (estagio === 2 && personagem.nome==="Freeza" && personagem.transformacaoAtiva===true) {
        const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/kiCharge2FreezaMax.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = false;
        video.volume=0.5
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "35%";
        battleLog.appendChild(video);
}
if  (estagio === 3 && personagem.nome==="Piccolo"){
    const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/kiChargePiccolo.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = false;
        video.volume=0.5
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "35%";
        battleLog.appendChild(video);
}
if  (estagio === 4 && personagem.nome==="Super Vegeta"){
    const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/kiChargeSuperVegeta.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = false;
        video.volume=0.5
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "35%";
        battleLog.appendChild(video);
}
if  (estagio === 4 && personagem.nome==="Cell Semi-perfeito"){
    tocarSomEfeito("kiChargeCellSemi");
    const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/kiChargeCellSemi.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = false;
        video.volume=0
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "35%";
        battleLog.appendChild(video);
}
}
function usarKaioken(personagem) {
    const custoKi = estagio === 2 ? 500 : 200;
    const desgasteHP = estagio === 2 ? 300 : 200;

    if (estagio === 2 && personagem.nome === "Goku" && personagem.ssjAtivo) {
        logBattle(`<div class="esquiva-msg">${personagem.nome} não pode usar Kaioken após se transformar!</div>`);
        return;
    }

    if (personagem.kaiokenAtivo) {
        logBattle(`<div class="esquiva-msg">${personagem.nome} já está usando Kaioken!</div>`);
        return;
    }

    if (personagem.ki < custoKi) {
        logBattle(`<div class="esquiva-msg">${personagem.nome} não tem Ki suficiente para o Kaioken!</div>`);
        return;
    }

    personagem.ki -= custoKi;
    personagem.hp -= desgasteHP;

    personagem.kaiokenAtivo = true;
    personagem.kaiokenTurnos = 4;

    personagem.atk = personagem.atkBase * 1.5;
    personagem.esquivaBase = personagem.esquiva
    personagem.esquiva += 30
    // Altera o nome da habilidade do Kaioken
    if (estagio === 1 && personagem.kaiokenAtivo) {
        personagem.habilidades[0].codigo = "Kamehamehax3";
        personagem.habilidades[0].nome = "Kamehamehax3";
        
    }
    if (estagio === 2 && personagem.ssjAtivo === false) {
        personagem.habilidades[0].codigo = "Kamehameha X20";
        personagem.habilidades[0].nome = "Kamehameha X20";
        personagem.habilidades[0].custo += 100; // Aumenta o custo de Ki
    }

    logBattle(`<div class="habilidade-msg">${personagem.nome} usou o Kaioken! Mas isso teve um preço...(-${desgasteHP} HP e -${custoKi} KI)</div>`);
    if (estagio === 1) {
        tocarSomEfeito("Kaioken");
        const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/kaioken.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = false;
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "40%";
        battleLog.appendChild(video);
    }
    if (estagio === 2) {
        tocarSomEfeito("Kaiokenx20");
        const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/kaiokenx20.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = false;
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "40%";
        battleLog.appendChild(video);
    }


}

function atualizarKaioken(personagem) {
    if (personagem.kaiokenAtivo) {
        personagem.kaiokenTurnos--;

        if (personagem.kaiokenTurnos <= 0) {
            personagem.kaiokenAtivo = false;

            personagem.atk = personagem.atkBase;
            personagem.esquiva = personagem.esquivaBase;

            // Reseta o nome da habilidade quando Kaioken acaba
            if (estagio === 1 && personagem.kaiokenAtivo ===false) {
        personagem.habilidades[0].codigo = "Kamehameha";
        personagem.habilidades[0].nome = "Kamehameha";
        
    }
            if (estagio === 2 && personagem.ssjAtivo === false) {
                personagem.habilidades[0].codigo = "Kamehameha";
                personagem.habilidades[0].nome = "Kamehameha";
            }

            logBattle(`<div class="esquiva-msg">${personagem.nome} não consegue mais manter o Kaioken!</div>`);
        }
    }
}
function PowerUp(personagem){
    
    if (personagem.powerUpAtivo) {
        logBattle(`<div class="esquiva-msg">${personagem.nome} já está usando seu poder máximo!</div>`);
        return;
    }

    if (!personagem.defBase) {
        personagem.defBase = personagem.def;
    }

    // Guarda o Ki atual antes do Power Up para restaurar corretamente depois
    ;

    personagem.powerUpAtivo = true;
    personagem.powerUpTurnos = 4;
    personagem.atk += 75;
    personagem.def += 75;
    

    logBattle(`<div class="habilidade-msg">${personagem.nome} elevou seu poder ao máximo!</div>`);
    if (personagem.nome === "Piccolo") {
        tocarSomEfeito("PiccoloPowerUp");
        const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/PiccoloPowerUp.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = false;
        video.volume=0;
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "40%";
        battleLog.appendChild(video);
    }
    if (personagem.nome === "Goku" && personagem.ssjAtivo) {
        const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/GokuSSJPower.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = false;
        video.volume=0.5
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "40%";
        battleLog.appendChild(video);
    }
    if (personagem.nome === "Super Vegeta") {
        tocarSomEfeito("PowerUpSuperVegeta");
        const battleLog = document.getElementById("battle-log");
        const video = document.createElement("video");
        video.src = "imagens/PowerUpSuperVegeta.mp4";
        video.style.display = "block";
        video.style.margin = "10px auto";
        video.loop = false;
        video.volume=0;
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = "40%";
        battleLog.appendChild(video);
    }
}

function atualizarPowerUp(personagem) {
    if (personagem.powerUpAtivo) {
        personagem.powerUpTurnos--;

        if (personagem.powerUpTurnos <= 0) {
            personagem.powerUpAtivo = false;
            personagem.atk = personagem.atkBase || personagem.atk;
            personagem.def = personagem.defBase || personagem.def;
            

            logBattle(`<div class="esquiva-msg">O Ki de ${personagem.nome} enfraqueceu!</div>`);
        }
    }
}
function transformarEmOozaru(defensor) {
    defensor.oozaruAtivo = true;
    defensor.hp += 500;
    defensor.atk+=150;
    defensor.def+=50;
    defensor.habilidades[0].codigo = "Chou Makouhou";
    defensor.habilidades[0].nome = "Chou Makouhou";
    logBattle(`<div class="habilidade-msg">${defensor.nome} se transformou em Oozaru!</div>`);
    tocarSomEfeito("Oozaru");

    const battleLog = document.getElementById("battle-log");
    const video = document.createElement("video");
    video.src = "imagens/oozaru.mp4";
    video.autoplay = true;
    video.controls = false;
    video.loop = false;
    video.style.display = "block";
    video.style.margin = "10px auto";
    video.style.maxWidth = "45%";
    battleLog.appendChild(video);
    return

}

function mudarFundoEstagio(estagio) {
    const body = document.getElementById("body") || document.body;
    if (estagio === 1) {
        body.style.backgroundImage = "url('imagens/cenarioSaiyajin.png')";
    } else if (estagio === 2) {
        body.style.backgroundImage = "url('imagens/cenarioNamek.jpg')";
    } else if (estagio === 3) {
        body.style.backgroundImage = "url('imagens/PiccoloVSCell.jpg')";
    } else if(estagio === 4){
        body.style.backgroundImage = "url('imagens/supervegetavssemicell.jpg')";
    }
}

function reiniciarJogo() {
    pararEfeitosAudio();
    document.getElementById("game-over-overlay").style.display = "none";
    document.getElementById("controls").style.display = "flex";

    const battleLog = document.getElementById("battle-log");
    if (battleLog) {
        battleLog.innerHTML = "";
    }

    const statusDiv = document.getElementById("status");
    if (statusDiv) {
        statusDiv.innerHTML = "";
    }

    turnoFinalizado = false;
    inicializarEstagio(estagio);
    if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log(err));
}
}