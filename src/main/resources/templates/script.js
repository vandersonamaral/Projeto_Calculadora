document.addEventListener('DOMContentLoaded', function() {
    // Mapeamento de teclas para funções
    const keyMap = {
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
        '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
        '+': '+', '-': '-', '*': '*', '/': '/',
        'Enter': '=',
        'Escape': 'C',
        '.': '.',
        'Backspace': 'backspace'
    };

    // Event listener para teclado
    document.addEventListener('keydown', function(e) {
        const key = e.key;
        const mappedKey = keyMap[key];

        if (mappedKey) {
            e.preventDefault();

            if (mappedKey === '=') {
                calcular();
            } else if (mappedKey === 'C') {
                limpar();
            } else if (mappedKey === 'backspace') {
                display.value = display.value.slice(0, -1);
            } else {
                adicionar(mappedKey);
            }

            // Efeito visual no botão correspondente
            const button = document.querySelector(`[data-value="${key === 'Enter' ? 'Enter' : mappedKey}"]`);
            if (button) {
                button.classList.add('active');
                setTimeout(() => button.classList.remove('active'), 100);
            }
        }
    });
});


function adicionar(valor) {
    const ultimoChar = display.value.slice(-1);
    const operadores = ['+', '-', '*', '/'];

    // Validação para evitar dois operadores seguidos
    if (operadores.includes(ultimoChar) && operadores.includes(valor)) {
        return;
    }

    display.value += valor;
}

function limpar() {
    display.value = '';
}

async function calcular() {
    try {
        // Avalia a expressão matemática (cuidado: eval tem riscos de segurança)
        const expressao = display.value;

        if (!expressao) {
            throw new Error("Digite uma expressão para calcular");
        }

        const operadores = ['+', '-', '*', '/'];
        let operadorEncontrado = null;

        for (const op of operadores) {
            if (expressao.includes(op)) {
                operadorEncontrado = op;
                break;
            }
        }

        if (!operadorEncontrado) {
            throw new Error("Operação inválida");
        }

        const [num1, num2] = expressao.split(operadorEncontrado);

        const url = `http://localhost:8080/calculadora/calcular?num1=${encodeURIComponent(num1)}&num2=${encodeURIComponent(num2)}&operador=${encodeURIComponent(operadorEncontrado)}`;

        const response = await fetch(url);

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        const resultado = await response.text();
        display.value = resultado;
    } catch (error) {
        display.value = error.message || "Erro ao calcular";
        console.error("Erro:", error);
    }
}
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calcular();
    }
});