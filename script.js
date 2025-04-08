
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (e) => {
      // On empêche le survol de réinitialiser si on clique
      card.classList.toggle('flipped');
    });
  });
