document.addEventListener('DOMContentLoaded', function () {
    const cardDeck = document.getElementById("cardDeck");
    let selectedCards = [];

    for (let i = 0; i < 10; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.style.transform = `rotate(${(i - 5) * 5}deg) translateY(${Math.abs(i - 5) * 2}px)`;
        card.addEventListener('click', () => handleCardClick(card));
        cardDeck.appendChild(card);
    }

    function handleCardClick(card) {
        if (card.classList.contains('selected')) {
            card.classList.remove('selected');
            selectedCards = selectedCards.filter(c => c !== card);
        } else if (selectedCards.length < 5) {
            card.classList.add('selected');
            selectedCards.push(card);
        }

        if (selectedCards.length === 5) {
            pullCards();
        }
    }

    async function pullCards() {
        try {
            const response = await fetch(`https://tarotapi.dev/api/v1/cards/random?n=5`);
            if (!response.ok) throw new Error('Network error');

            const data = await response.json();

            const cards = data.cards.map(card => ({
                name: card.name,
                id: card.name_short,
                desc: card.meaning_up
            }));

            localStorage.setItem("tarotCards", JSON.stringify(cards));
            window.location.href = "card.html";
        } catch (err) {
            console.error("Fetch error:", err);
        }
    }
});
