const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');

textarea.focus();

textarea.addEventListener('input', (e) => {
    createTags(e.target.value);

    if (e.inputType === 'insertLineBreak') {
        e.target.value = '';
        randomSelect();
    }
});

function createTags(input) {
    const tags = input
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');

    tagsEl.innerHTML = '';

    tags.forEach((tag) => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.textContent = tag;
        tagsEl.appendChild(tagEl);
    });
}

function randomSelect() {
    const times = 30;
    const intervalDuration = 100;
    let counter = 0;

    const interval = setInterval(() => {
        const randomTag = pickRandomTag();

        if (randomTag) {
            highlightTag(randomTag);

            setTimeout(() => {
                unHighlightTag(randomTag);
            }, intervalDuration);
        }

        counter++;

        if (counter === times) {
            clearInterval(interval);

            setTimeout(() => {
                const finalTag = pickRandomTag();

                if (finalTag) {
                    highlightTag(finalTag);
                }
            }, intervalDuration);
        }
    }, intervalDuration);
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag');
    if (tags.length === 0) return null;
    return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
    tag.classList.add('highlight');
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight');
}
