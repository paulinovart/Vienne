const header = document.querySelector(".header");
const letters = document.querySelectorAll(".letter");
const logo = document.querySelector(".logo a");
const websiteContent = document.querySelector(".website-content");

let lastScroll = 0;
const sectionHeight = 150; //la distance necessaire pour changer de section

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY < 900) {
        websiteContent.style.position = "fixed";
        websiteContent.style.top = "0";
    }
    else {
        websiteContent.style.position = "absolute";
        websiteContent.style.top = `${900}px`;
    }

    const orderPairs = [

        [2, 3],
        [1, 4],
        [0, 5],
    ];

    orderPairs.forEach((pair, orderIndex) => {
        const startScroll = sectionHeight * orderIndex;

        if (scrollY >= startScroll) {
            const moveFactor = Math.min(
                1,
                (scrollY - startScroll) / sectionHeight
            );
            const translateY = -moveFactor * header.offsetHeight;

            pair.forEach((idx) => {
                const letter = letters[idx];
                gsap.to(letter, {
                    y: translateY,
                    zIndex: 1 - moveFactor,
                });
            });

        }
        else {
            pair.forEach((idx) => {
                const letter = letters[idx];
                gsap.to(letter, {
                    y: 0,
                    zIndex: 1,
                });
            });
        }
    });

    const buffer = 50;

    if (scrollY >= orderPairs.length * sectionHeight + buffer && !gsap.isTweening(logo)) {
        gsap.to(logo, {
            top: "0px",
            ease: "power1.out",
            overwrite: true
        })

        gsap.to(".logo-revealer", {
            scaleY: 0,
            overwrite: true,

        });

    }
    else if (
        scrollY <= (orderPairs.lenght - 1) * sectionHeight && !gsap.isTweening(logo)
    ) {
        gsap.to(logo, {
            top: "20px",
            ease: "power1.out",
            overwrite: true
        });

        gsap.to(".logo-revealer", {
            scaleY: 1,
            overwrite: true,
        });
    }

    const lettersSectionHeight = 900;

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;


        if (scrollY < lettersSectionHeight) {
            gsap.to(".logo", {
                opacity: 0,
                duration: 0.5,
                ease: "power1.out"
            });
        } else {
            gsap.to(".logo", {
                opacity: 1,
                duration: 0.5,
                ease: "power1.out"
            });
        }
    });

})
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (e) => {
      // On empêche le survol de réinitialiser si on clique
      card.classList.toggle('flipped');
    });
  });
