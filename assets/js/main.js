document.addEventListener('DOMContentLoaded', () => {
    // Recupera e aplica o tema salvo no localStorage
    const theme = localStorage.getItem('theme');
    if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    // Função para salvar o tema atual no localStorage
    function saveCurrentTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        localStorage.setItem('theme', currentTheme);
    }

    // Observador de mutação para salvar o tema sempre que ele for alterado
    const observer = new MutationObserver(() => {
        saveCurrentTheme();
    });
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Função para criar a estrutura da página
    function createPage() {
        const header = document.querySelector('header');

        // Adicionar Logo Marca
        const logoDiv = document.createElement('div');
        logoDiv.className = 'logo-marca';
        logoDiv.title = 'Design by Tavares';

        const img = document.createElement('img');
        img.src = 'assets/img/mk2-02.png';
        img.alt = 'logo-marca';

        const h1 = document.createElement('h1');
        h1.textContent = 'Tavares';

        logoDiv.appendChild(img);
        logoDiv.appendChild(h1);
        header.appendChild(logoDiv);

        // Adicionar Navegação
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');

        const menuItems = [
            { href: '#', text: 'Home' },
            { href: '#tela2', text: 'Sobre' },
            { href: '#tela3', text: 'Contato' }
        ];

        menuItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.text;
            li.appendChild(a);
            ul.appendChild(li);
        });

        nav.appendChild(ul);
        header.appendChild(nav);

        // Adicionar Botão de Alternância de Tema
        const headerToggle = document.createElement('div');
        headerToggle.className = 'header__toggle';
        const icon = document.createElement('i');
        icon.id = 'toggleTheme';
        icon.className = 'bi bi-sun';
        headerToggle.appendChild(icon);
        header.appendChild(headerToggle);

        // Define os estilos iniciais do header para a animação
        header.style.left = '-50%';
        header.style.transition = 'left 1s ease-out';
        requestAnimationFrame(() => {
            header.style.left = '2.6rem';
        });
    }

    // Chama a função para adicionar o conteúdo
    createPage();

    const toggleTheme = document.getElementById("toggleTheme");
    const rootHtml = document.documentElement;
    const accordionHeaders = document.querySelectorAll(".accordion__header");
    const menuLinks = document.querySelectorAll(".menu__link");

    // Função para alternar o tema
    function changeTheme() {
        const currentTheme = rootHtml.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        rootHtml.setAttribute("data-theme", newTheme);
        toggleTheme.classList.toggle("bi-sun");
        toggleTheme.classList.toggle("bi-moon-stars");
    }

    toggleTheme.addEventListener("click", changeTheme);

    // Funções adicionais
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const accordionItem = header.parentElement;
            const accordionActive = accordionItem.classList.contains("active");
            accordionActive ? accordionItem.classList.remove("active") : accordionItem.classList.add("active");
        });
    });

    menuLinks.forEach(item => {
        item.addEventListener("click", () => {
            menuLinks.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let stopCount = 0; // Contador de paradas

    // Defina os pontos de parada
    const points = [
        document.getElementById('info-box').getBoundingClientRect().top + window.pageYOffset - 50,
        document.getElementById('continue').getBoundingClientRect().top + window.pageYOffset - 50
    ];

    // Listener para rolagem do mouse
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) { // Verifica se a rolagem é para baixo
            const currentScroll = window.pageYOffset;

            if (stopCount < points.length && currentScroll < points[stopCount]) {
                window.scrollTo({
                    top: points[stopCount],
                    behavior: 'smooth' // Configura a velocidade do scroll
                });
                stopCount++;
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.tela');
    const navButton = document.querySelector('.nav-button');
    let currentScreen = 0;

    navButton.addEventListener('click', () => {
        currentScreen = (currentScreen + 1) % screens.length; // Avança para a próxima tela, volta à primeira se no fim
        screens[currentScreen].scrollIntoView({ behavior: 'smooth' }); // Rola suavemente para a tela
    });
});
