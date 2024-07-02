const words = ['თაგვი', 'აგარაკი', 'კომპიუტერი', 'პროგრამისტი', 'ინტერნეტი', 'მობილური', 'წიგნი', 'კინო', 'რეჟისორი', 'მუსიკა', 'ჯავასკრიპტი', 'სტაჟიორი', 'სახლი', 'მანქანა', 'წარმატება'];

function h2(text) {
    let h = document.createElement("h2");
    let t = document.createTextNode(text);
    h.appendChild(t);
    let div = document.createElement('div');
    div.className = 'divForH1';
    div.appendChild(h);
    document.body.appendChild(div);
}

h2('გამოიცანი სიტყვა');

let score = 0;
const scoreSpan = document.createElement("span");
scoreSpan.textContent = `ქულა: ${score}`;
scoreSpan.className = 'span';
document.body.appendChild(scoreSpan);

let currentIndex = 0;

function loadWord(index) {
    const wordContainer = document.getElementById('wordContainer');
    wordContainer.className = 'container';
    wordContainer.innerHTML = '';

    const randomWord = words[index];
    const lettersToShow = Math.max(2, Math.floor(randomWord.length / 2));

    const shownIndexes = new Set();
    while (shownIndexes.size < lettersToShow) {
        const randomIndex = Math.floor(Math.random() * randomWord.length);
        shownIndexes.add(randomIndex);
    }

    for (let i = 0; i < randomWord.length; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.placeholder = '*';
        input.className = "input";
        input.readOnly = shownIndexes.has(i);
        input.value = shownIndexes.has(i) ? randomWord[i] : '';
        input.dataset.index = i;
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (!value.match(/[ა-ჰ]/)) {
                e.target.value = '';
            }
        });
        wordContainer.appendChild(input);
    }
}

function btn(text, callback, style) {
    let b = document.createElement("button");
    let t = document.createTextNode(text);
    b.className = 'button';
    b.appendChild(t);

    if (style) {
        b.style.cssText += style;
    }

    let div = document.createElement('div');
    div.className = "div1";
    div.appendChild(b);

    b.onclick = callback;
    document.body.appendChild(div);
}

function checkWord() {
    const inputs = document.querySelectorAll('#wordContainer input');
    const randomWord = words[currentIndex];
    let isCorrect = true;

    inputs.forEach((input, index) => {
        if (input.value !== randomWord[index]) {
            isCorrect = false;
        }
    });
    
    if (isCorrect) {
        score += 2;
        scoreSpan.textContent = `ქულა: ${score}`;
    } else {
        alert('არასწორი სიტყვა');
    }
};

const wordContainer = document.createElement('div');
wordContainer.id = 'wordContainer';
document.body.appendChild(wordContainer);

loadWord(currentIndex);

btn('შემოწმება', checkWord, 'background-color: lightgreen; color: black;');

btn('შემდეგი სიტყვა', function() {
    currentIndex = (currentIndex + 1) % words.length;
    loadWord(currentIndex);
}, 'background-color: blue; color: white;');

btn('თავიდან დაწყება', function() {
    currentIndex = (currentIndex + 1) % words.length;
    score = 0;
    scoreSpan.textContent = `ქულა: ${score}`;
    loadWord(currentIndex);
}, 'background-color: orange; color: black'); 