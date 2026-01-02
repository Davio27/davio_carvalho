// Memory Game Logic
const gameState = {
    cards: [
        '<img width="48" height="48" src="https://img.icons8.com/color/48/fortnite-llama.png" alt="llama"/>',
        '<img width="48" height="48" src="https://img.icons8.com/color/48/crash-bandicoot.png" alt="crash"/>',
        '<img width="48" height="48" src="https://img.icons8.com/color/48/bad-piggies.png" alt="piggies"/>',
        '<img width="48" height="48" src="https://img.icons8.com/color/48/day-of-the-tentacle.png" alt="tentacle"/>',
        '<img width="48" height="48" src="https://img.icons8.com/color/48/apple-arcade.png" alt="arcade"/>',
        '<img width="48" height="48" src="https://img.icons8.com/color/48/three-leaf-clover.png" alt="clover"/>',
        '<img width="48" height="48" src="https://img.icons8.com/color/48/joker.png" alt="joker"/>',
        '<img width="48" height="48" src="https://img.icons8.com/color/48/greek-helmet.png" alt="helmet"/>'
    ],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    timer: 0,
    timerInterval: null,
    isProcessing: false,
    gameStarted: false
};

function setupGame() {
    const gameBoard = document.getElementById('gameBoard');
    const cards = [...gameState.cards, ...gameState.cards];
    const shuffled = cards.sort(() => Math.random() - 0.5);
    gameBoard.innerHTML = '';
    gameState.flippedCards = [];
    gameState.matchedPairs = 0;
    gameState.moves = 0;
    gameState.timer = 0;
    gameState.isProcessing = true;
    gameState.gameStarted = false;
    updateStats();
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    shuffled.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'game-card flipped';
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.innerHTML = `
        <div class="game-card-front"><img width="48" height="48" src="https://img.icons8.com/color/48/where-what-quest.png" alt="where-what-quest"/></div>
        <div class="game-card-back">${icon}</div>
        `;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function startGame() {
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const waitingMessage = document.getElementById('gameWaitingMessage');
    startButton.disabled = true;
    startButton.innerHTML = `
        <img width="34" height="34" src="https://img.icons8.com/office/40/hourglass--v1.png" alt="hourglass" /> 
        <span>Aguarde...</span>
    `;
    waitingMessage.style.display = 'block';
    setupGame();
    setTimeout(() => {
        const allCards = document.querySelectorAll('.game-card');
        allCards.forEach(card => {
            card.classList.remove('flipped');
        });
        gameState.isProcessing = false;
        gameState.gameStarted = true;
        gameState.timerInterval = setInterval(() => {
            gameState.timer++;
            document.getElementById('timerCount').textContent = gameState.timer;
        }, 1000);
        waitingMessage.style.display = 'none';
        startButton.style.display = 'none';
        resetButton.style.display = 'flex';
    }, 2000);
}

function resetGame() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    gameState.flippedCards = [];
    gameState.matchedPairs = 0;
    gameState.moves = 0;
    gameState.timer = 0;
    gameState.isProcessing = false;
    gameState.gameStarted = false;
    updateStats();
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    startButton.style.display = 'flex';
    startButton.disabled = false;
    startButton.innerHTML = `
        <img width="34" height="34" src="https://img.icons8.com/3d-fluency/94/controller.png" alt="controller" /> 
        <span>Iniciar Jogo</span>
    `;
    resetButton.style.display = 'none';
}

function flipCard(card) {
    if (!gameState.gameStarted ||
        gameState.isProcessing ||
        card.classList.contains('flipped') ||
        card.classList.contains('matched') ||
        gameState.flippedCards.length >= 2) {
        return;
    }

    card.classList.add('flipped');
    gameState.flippedCards.push(card);

    if (gameState.flippedCards.length === 2) {
        gameState.moves++;
        updateStats();
        checkMatch();
    }
}

function checkMatch() {
    gameState.isProcessing = true;
    const [card1, card2] = gameState.flippedCards;
    const icon1 = card1.dataset.icon;
    const icon2 = card2.dataset.icon;
    setTimeout(() => {
        if (icon1 === icon2) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            const approvalImg = `<img width="48" height="48" src="https://img.icons8.com/color/48/approval--v1.png" alt="approval"/>`;
            const back1 = card1.querySelector('.game-card-back');
            const back2 = card2.querySelector('.game-card-back');
            if (back1) back1.innerHTML = approvalImg;
            if (back2) back2.innerHTML = approvalImg;
            gameState.matchedPairs++;
            updateStats();
            if (gameState.matchedPairs === gameState.cards.length) {
                clearInterval(gameState.timerInterval);
                setTimeout(() => showVictoryMessage(), 500);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        gameState.flippedCards = [];
        gameState.isProcessing = false;
    }, 800);
}

function updateStats() {
    const movesEl = document.getElementById('movesCount');
    const matchesEl = document.getElementById('matchesCount');

    movesEl.textContent = gameState.moves;
    matchesEl.textContent = gameState.matchedPairs;

    movesEl.classList.add('stat-animation');
    matchesEl.classList.add('stat-animation');

    setTimeout(() => {
        movesEl.classList.remove('stat-animation');
        matchesEl.classList.remove('stat-animation');
    }, 500);
}

function showVictoryMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #265197ff 0%, #a78bfa 100%);
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        text-align: center;
        z-index: 10000;
        animation: fadeInUp 0.5s ease;
    `;

    message.innerHTML = `
        <h2 style="font-size: 2.5rem; margin-bottom: 15px; color: white;">🎉 Parabéns!</h2>
        <p style="font-size: 1.2rem; color: white; margin-bottom: 10px;">Você completou o jogo!</p>
        <p style="font-size: 1rem; color: rgba(255,255,255,0.9);">
        Movimentos: ${gameState.moves} | Tempo: ${gameState.timer}s
        </p>
        <button onclick="this.parentElement.remove(); resetGame();" 
                style="margin-top: 20px; padding: 12px 30px; background: white; color: #3b82f6; 
                    border: none; border-radius: 10px; font-size: 1rem; font-weight: 600; 
                    cursor: pointer; transition: all 0.3s ease;">
        Jogar Novamente
        </button>
    `;

    document.body.appendChild(message);
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('resetButton').addEventListener('click', resetGame);

// Cursor glow effect
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Create animated particles
function createParticles() {
    const container = document.getElementById('particlesBackground');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 100 + 50;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 20;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.animationDelay = delay + 's';

        container.appendChild(particle);
    }
}

createParticles();

// Default configuration
const defaultConfig = {
    background_color: '#09090b',
    surface_color: '#18181b',
    text_color: '#e4e4e7',
    primary_action_color: '#8b5cf6',
    secondary_action_color: '#d946ef',
    font_family: 'Inter',
    font_size: 16,
    professional_name: 'Dávio Carvalho',
    professional_title: 'Engenheiro de Dados | Python | GCP | SQL | BI | DevOps',
    hero_description: 'Profissional ousado e curioso, com experiência em Engenharia de Dados, BI e Desenvolvimento Web, atuando na construção de pipelines escaláveis, automações e dashboards analíticos.',
    about_paragraph_1: 'Sou Engenheiro de Dados Jr na Oba Hortifruti, atuando na construção de pipelines de dados em Google Cloud Platform (BigQuery, Dataform e Airflow), automações em Python, integrações via APIs e desenvolvimento de soluções analíticas para áreas estratégicas.',
    about_paragraph_2: 'Tenho forte foco em performance, confiabilidade e escalabilidade de dados, além de experiência em BI, modelagem de dados e dashboards interativos.',
    about_paragraph_3: 'Possuo base sólida em Engenharia de Software, DevOps e Cloud Computing.',
    github_link: 'https://github.com/Davio27',
    linkedin_link: 'https://www.linkedin.com/in/daviocarvalho2001',
    email_address: 'daviccarvalho11@hotmail.com'
};

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    themeIcon.textContent = isLight ? '☀️' : '🌙';
    themeText.textContent = isLight ? 'Claro' : 'Escuro';
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Update content based on config
async function onConfigChange(config) {
    const customFont = config.font_family || defaultConfig.font_family;
    const baseSize = config.font_size || defaultConfig.font_size;
    const baseFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    // Apply font to body
    document.body.style.fontFamily = `'${customFont}', ${baseFontStack}`;

    // Apply colors
    document.body.style.color = config.text_color || defaultConfig.text_color;

    // Update text content
    document.getElementById('professionalName').textContent = config.professional_name || defaultConfig.professional_name;
    document.getElementById('professionalTitle').textContent = config.professional_title || defaultConfig.professional_title;
    document.getElementById('heroDescription').textContent = config.hero_description || defaultConfig.hero_description;
    document.getElementById('aboutParagraph1').textContent = config.about_paragraph_1 || defaultConfig.about_paragraph_1;
    document.getElementById('aboutParagraph2').textContent = config.about_paragraph_2 || defaultConfig.about_paragraph_2;
    document.getElementById('aboutParagraph3').textContent = config.about_paragraph_3 || defaultConfig.about_paragraph_3;

    // Update links
    const githubLink = config.github_link || defaultConfig.github_link;
    const linkedinLink = config.linkedin_link || defaultConfig.linkedin_link;
    const emailAddress = config.email_address || defaultConfig.email_address;

    document.getElementById('githubBtn').href = githubLink;
    document.getElementById('linkedinBtn').href = linkedinLink;
    document.getElementById('footerGithub').href = githubLink;
    document.getElementById('footerLinkedin').href = linkedinLink;
    document.getElementById('footerEmail').href = `mailto:${emailAddress}`;

    // Apply font sizes proportionally
    const h1Elements = document.querySelectorAll('h1');
    h1Elements.forEach(el => el.style.fontSize = `${baseSize * 4.5 / 16}rem`);

    const h2Elements = document.querySelectorAll('h2');
    h2Elements.forEach(el => el.style.fontSize = `${baseSize * 2.5 / 16}rem`);

    const h3Elements = document.querySelectorAll('h3');
    h3Elements.forEach(el => el.style.fontSize = `${baseSize * 1.5 / 16}rem`);
}

// Initialize Element SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: (config) => ({
            recolorables: [
                {
                    get: () => config.background_color || defaultConfig.background_color,
                    set: (value) => {
                        config.background_color = value;
                        window.elementSdk.setConfig({ background_color: value });
                    }
                },
                {
                    get: () => config.surface_color || defaultConfig.surface_color,
                    set: (value) => {
                        config.surface_color = value;
                        window.elementSdk.setConfig({ surface_color: value });
                    }
                },
                {
                    get: () => config.text_color || defaultConfig.text_color,
                    set: (value) => {
                        config.text_color = value;
                        window.elementSdk.setConfig({ text_color: value });
                    }
                },
                {
                    get: () => config.primary_action_color || defaultConfig.primary_action_color,
                    set: (value) => {
                        config.primary_action_color = value;
                        window.elementSdk.setConfig({ primary_action_color: value });
                    }
                },
                {
                    get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
                    set: (value) => {
                        config.secondary_action_color = value;
                        window.elementSdk.setConfig({ secondary_action_color: value });
                    }
                }
            ],
            borderables: [],
            fontEditable: {
                get: () => config.font_family || defaultConfig.font_family,
                set: (value) => {
                    config.font_family = value;
                    window.elementSdk.setConfig({ font_family: value });
                }
            },
            fontSizeable: {
                get: () => config.font_size || defaultConfig.font_size,
                set: (value) => {
                    config.font_size = value;
                    window.elementSdk.setConfig({ font_size: value });
                }
            }
        }),
        mapToEditPanelValues: (config) => new Map([
            ['professional_name', config.professional_name || defaultConfig.professional_name],
            ['professional_title', config.professional_title || defaultConfig.professional_title],
            ['hero_description', config.hero_description || defaultConfig.hero_description],
            ['about_paragraph_1', config.about_paragraph_1 || defaultConfig.about_paragraph_1],
            ['about_paragraph_2', config.about_paragraph_2 || defaultConfig.about_paragraph_2],
            ['about_paragraph_3', config.about_paragraph_3 || defaultConfig.about_paragraph_3],
            ['github_link', config.github_link || defaultConfig.github_link],
            ['linkedin_link', config.linkedin_link || defaultConfig.linkedin_link],
            ['email_address', config.email_address || defaultConfig.email_address]
        ])
    });
}


/* =========================================
   EFEITO DE FUNDO: SNAKE.IO (DESIGN DE GOMOS)
========================================= */
(function initSnakeBackground() {
    const canvas = document.getElementById('snake-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    const config = {
        snakeCount: 6,
        baseSpeed: 1.0,
        turnFactor: 0.05,
        foodCount: 30,
        colors: ['#8b5cf6', '#3b82f6', '#22c55e', '#d946ef', '#f59e0b', '#ef4444'],
        foodTimeout: 10000
    };

    let snakes = [];
    let foods = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const random = (min, max) => Math.random() * (max - min) + min;
    const randomInt = (min, max) => Math.floor(random(min, max));
    const dist = (x1, y1, x2, y2) => Math.hypot(x1 - x2, y1 - y2);

    class Food {
        constructor(x, y, color, isTemporary = false) {
            this.x = x || random(0, width);
            this.y = y || random(0, height);
            this.size = random(3, 6);
            this.color = color || config.colors[randomInt(0, config.colors.length)];
            this.isTemporary = isTemporary;
            this.spawnTime = Date.now();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }

    class Snake {
        constructor() {
            this.init();
        }

        init() {
            this.x = random(0, width);
            this.y = random(0, height);
            this.angle = random(0, Math.PI * 2);
            this.targetAngle = this.angle;
            this.speed = config.baseSpeed + random(-0.2, 0.4);
            this.size = random(12, 18); // Gomos um pouco maiores
            this.color = config.colors[randomInt(0, config.colors.length)];
            this.tail = [];
            // Variedade de comprimentos inicial
            this.maxTailLength = randomInt(40, 300);
            this.isDead = false;
        }

        update() {
            if (Math.random() < 0.02) {
                this.targetAngle += random(-Math.PI / 2, Math.PI / 2);
            }

            let diff = this.targetAngle - this.angle;
            while (diff < -Math.PI) diff += Math.PI * 2;
            while (diff > Math.PI) diff -= Math.PI * 2;
            this.angle += diff * config.turnFactor;

            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            if (this.x < -50) this.x = width + 50;
            else if (this.x > width + 50) this.x = -50;
            if (this.y < -50) this.y = height + 50;
            else if (this.y > height + 50) this.y = -50;

            // Para o design de gomos, gravamos a posição a cada frame
            this.tail.unshift({ x: this.x, y: this.y });
            if (this.tail.length > this.maxTailLength) {
                this.tail.pop();
            }

            for (let i = foods.length - 1; i >= 0; i--) {
                const f = foods[i];
                if (dist(this.x, this.y, f.x, f.y) < this.size) {
                    foods.splice(i, 1);
                    this.maxTailLength += 8; // Cresce ao comer
                    if (!f.isTemporary) foods.push(new Food());
                }
            }
        }

        die() {
            // Libera bolinhas ao morrer
            for (let i = 0; i < this.tail.length; i += 15) {
                foods.push(new Food(this.tail[i].x, this.tail[i].y, this.color, true));
            }
            this.init();
        }

        draw() {
            // Desenha os gomos do rabo (do fim para o começo para a cabeça ficar por cima)
            // Usamos um 'step' para os gomos não ficarem colados demais ou separados demais
            const step = 4;
            for (let i = this.tail.length - 1; i >= 0; i -= step) {
                const seg = this.tail[i];
                const nextSeg = this.tail[i - step] || this.tail[0];

                // Fix Laser: Não desenha gomos se houver teletransporte entre eles
                if (dist(seg.x, seg.y, nextSeg.x, nextSeg.y) > 100) continue;

                ctx.beginPath();
                // Efeito de afunilamento leve no final do rabo
                const ratio = 1 - (i / this.tail.length);
                const currentSize = (this.size / 1.5) * (0.5 + 0.5 * ratio);

                ctx.arc(seg.x, seg.y, currentSize, 0, Math.PI * 2);

                // Gradiente de transparência para o final do rabo
                ctx.globalAlpha = ratio;
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }
            ctx.globalAlpha = 1.0;

            // Cabeça (Gomo Principal)
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 1.5, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();

            // Olhinhos (Estilo Snake.io)
            const eyeOffset = this.size / 3.5;
            const eyeSize = this.size / 5.5;

            // Fundo do olho (Amarelo claro como na imagem)
            ctx.fillStyle = '#fef3c7';
            ctx.beginPath();
            ctx.arc(this.x + Math.cos(this.angle + 0.6) * eyeOffset, this.y + Math.sin(this.angle + 0.6) * eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.arc(this.x + Math.cos(this.angle - 0.6) * eyeOffset, this.y + Math.sin(this.angle - 0.6) * eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.fill();

            // Pupila (Preta)
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(this.x + Math.cos(this.angle + 0.6) * (eyeOffset + 1), this.y + Math.sin(this.angle + 0.6) * (eyeOffset + 1), eyeSize / 2, 0, Math.PI * 2);
            ctx.arc(this.x + Math.cos(this.angle - 0.6) * (eyeOffset + 1), this.y + Math.sin(this.angle - 0.6) * (eyeOffset + 1), eyeSize / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < config.foodCount; i++) foods.push(new Food());
    for (let i = 0; i < config.snakeCount; i++) snakes.push(new Snake());

    function checkCollisions() {
        for (let i = 0; i < snakes.length; i++) {
            const s1 = snakes[i];
            for (let j = 0; j < snakes.length; j++) {
                const s2 = snakes[j];
                const startNode = (i === j) ? 30 : 0;
                // Verifica colisão da cabeça com os gomos
                for (let k = startNode; k < s2.tail.length; k += 5) {
                    if (dist(s1.x, s1.y, s2.tail[k].x, s2.tail[k].y) < s1.size / 2) {
                        s1.die();
                        return;
                    }
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        const now = Date.now();
        foods = foods.filter(f => !f.isTemporary || (now - f.spawnTime < config.foodTimeout));

        foods.forEach(food => food.draw());
        snakes.forEach(snake => {
            snake.update();
            snake.draw();
        });

        checkCollisions();
        requestAnimationFrame(animate);
    }
    animate();
})();