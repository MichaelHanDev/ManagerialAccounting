//intro screen
let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {

        // Add 'active' class to logo spans with a delay
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 500); // Adjust the timing value to increase or decrease the delay
        });

        setTimeout(() => {
            // Remove 'active' class and add 'fade' class to logo spans with a delay
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 500); // Adjust the timing value to increase or decrease the delay
            });
        }, 2000); // Adjust the timing value to increase or decrease the delay

        setTimeout(() => {
            // Move the intro section out of the viewport
            intro.style.top = '-100vh';
        }, 3500); // Adjust the timing value to increase or decrease the delay

    });
});

//custom cursor effect 
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;

    cursorOutline.animate(
        {
            left: `${posX}px`,
            top: `${posY}px`,
        },
        { duration: 1000, fill: "forwards" }
    );
});

// Cursor click effect
const createCursor = (x, y) => {
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    return cursor;
};

const removeCursorFromDom = (cursor) => {
    const timeout = setTimeout(() => {
        cursor.remove();
        clearTimeout(timeout);
    }, 1000);
};

window.addEventListener("click", (event) => {
    const cursor = createCursor(event.pageX, event.pageY);
    document.body.append(cursor);
    removeCursorFromDom(cursor);
});

// particles
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

// Continuous Scroll
let menu = document.querySelector(".menu");
let items = document.querySelectorAll(".menu-item");
let clones = [];
let disableScroll = false;
let scrollHeight = 0;
let scrollPos = 0;
let clonesHeight = 0;

function getScrollPos() {
    return menu.scrollTop;
}

function setScrollPos(pos) {
    menu.scrollTop = pos;
}

function getClonesHeight() {
    clonesHeight = 0;
    clones.forEach((clone) => {
        clonesHeight += clone.offsetHeight;
    });
    return clonesHeight;
}

function reCalc() {
    scrollPos = getScrollPos();
    scrollHeight = menu.scrollHeight;
    clonesHeight = getClonesHeight();
    if (scrollPos <= 0) {
        setScrollPos(1);
    }
}

function scrollUpdate() {
    if (!disableScroll) {
        scrollPos = getScrollPos();
        if (clonesHeight + scrollPos >= scrollHeight) {
            setScrollPos(1);
            disableScroll = true;
        } else if (scrollPos <= 0) {
            setScrollPos(scrollHeight - clonesHeight);
            disableScroll = true;
        }
    }
    if (disableScroll) {
        window.setTimeout(() => {
            disableScroll = false;
        }, 40);
    }
}

function onLoad() {
    items.forEach((item) => {
        const clone = item.cloneNode(true);
        menu.appendChild(clone);
        clone.classList.add("js-clone");
    });

    clones = menu.querySelectorAll(".js-clone");

    reCalc();

    menu.addEventListener(
        "scroll",
        () => {
            window.requestAnimationFrame(scrollUpdate);
        },
        false
    );

    window.addEventListener(
        "resize",
        () => {
            window.requestAnimationFrame(reCalc);
        },
        false
    );
}

window.onload = onLoad;



