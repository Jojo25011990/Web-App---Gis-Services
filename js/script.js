// *** Strict Mode + Gsap Register Text Plugin ***
'use strict';
gsap.registerPlugin(TextPlugin);

// *** Select Elements ***
// *** Buttons ***
const btns = document.querySelectorAll('.show-section-btn');
const btnsBack = document.querySelectorAll('.btn-back');

// *** Sections ***
const mainSection = document.querySelector('.main');
const sectionWhyMe = document.querySelector('.why__me');
const sectionAboutMe = document.querySelector('.about__me');
const sectionHighlight = document.querySelector('.highlight');

// *** Eyes + Highlight Text ***
const eyeLeft = document.querySelector('.highlight__eye-pupil--left');
const eyeRight = document.querySelector('.highlight__eye-pupil--right');
const highlightText = document.querySelector('.highlight__text');

// *** Author Name = Paper and Image ***
const authorName = document.querySelector(
  '.paper__horizontal-description--author'
);
const aboutMeName = document.querySelector('.about__me-name');

// *** Pencil + Screen Width For Responsive Design ***
// const pencil = document.querySelector('.about__me-pencil');
const pencil = document.querySelector('.paper__pencil');
// const screenWidth = window.innerWidth;
let screenWidth = window.innerWidth;

// *** Gsap Timelines, Eyes + Pencil ***
const tlEyes = gsap.timeline({ paused: true });
//  tlEyes = gsap.timeline({ paused: true });
const tlPencil = gsap.timeline({ paused: true });

// *** Initialize Variables ***
let isActive = false;
let durationValue;

// *** Functionality ***
// *** Buttons back & Sections ***
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (mainSection) mainSection.style.display = 'none';

    if (btn === btns[0]) {
      isActive = true;
      sectionAboutMe.classList.add('active');
      tlPencil.restart();
    }

    if (btn === btns[1]) sectionWhyMe.classList.add('active');

    if (btn === btns[2] && !isActive) {
      isActive = true;
      sectionHighlight.classList.add('active');
      tlEyes.restart();
    }
  });
});

btnsBack.forEach(btnBack => {
  btnBack.addEventListener('click', () => {
    function backToSection(section) {
      if (section) {
        isActive = false;
        section.classList.remove('active');
        tlEyes.pause(0);
      }
    }
    backToSection(sectionWhyMe);
    backToSection(sectionAboutMe);
    backToSection(sectionHighlight);

    if (mainSection) mainSection.style.display = 'flex';
  });
});

// *** Conditions for Responsive Design and Minor Debugging and Event Listener for window Resize, Media Queries Events ***
//  880 > , duration 1s
// 880 < , duration 1.5
// 780 <, duration 2
// 660 & 490 < 2.5

if (window.innerWidth > 880) {
  durationValue = 1;
} else if (window.innerWidth > 780 && window.innerWidth <= 880) {
  durationValue = 1.5;
} else {
  durationValue = 2.5;
}

// console.log('Duration value:', durationValue);
// console.log('Width value:', screenWidth);

// *** Eyes Animation Gsap ***

tlEyes
  .from([eyeLeft, eyeRight], { autoAlpha: 1, duration: 1, delay: 0.5 })
  .to([eyeLeft, eyeRight], {
    x: '-80%',
    y: '25%',
    duration: 1,
    delay: 1,
    ease: 'none',
  })
  .to(highlightText, {
    text: 'This section was created especially for you. Thank you for reviewing it.',
    delay: 1,
    duration: 5,
    ease: 'none',
    onUpdate() {
      // *** General ***
      let textLength = this.targets()[0].textContent.length;
      let newX = -80 + textLength * 2;
      let newY = 25 + Math.sin(textLength * 0.1) * 3;

      // *** Eye Left ***
      gsap.to(eyeLeft, {
        x: newX + '%',
        y: newY + '%',
        duration: 0.1,
      });

      // *** Eye Right ***
      gsap.to(eyeRight, {
        x: newX + '%',
        y: newY + '%',
        duration: 0.1,
      });
    },
  })
  .to([eyeLeft, eyeRight], {
    x: '0',
    y: '0',
    duration: durationValue,
    delay: 1,
    ease: 'power1.out',
  });

// *** Pencil Animation Gsap ***
tlPencil
  .from(pencil, { autoAlpha: 0, scale: 0, delay: 2.2 })
  .to(pencil, { autoAlpha: 1, duration: 0.5, scale: 1 })

  .to(pencil, { x: '150%', duration: 1 })

  .to(pencil, {
    x: '545%',
    duration: 2.5,
    onUpdate() {
      let progress = this.progress();
      let currentChars = Math.floor(progress * 15);

      authorName.textContent = 'Jozef Kudrna'.slice(0, currentChars);
      aboutMeName.textContent = 'Jozef Kudrna'.slice(0, currentChars);
      authorName.style.opacity = 1;
      aboutMeName.style.opacity = 1;

      let offsetY = Math.sin(progress * 20) * 4;
      gsap.set(pencil, { y: offsetY });
    },
  })
  .to(pencil, { x: '600%', duration: 1, delay: 0.5 })
  .to(pencil, { scale: 0, delay: 0.1 })
  .to(pencil, { x: 0, duration: 1, delay: 0.2 })
  .to(pencil, { scale: 1 })
  .to(
    [authorName, aboutMeName],
    {
      stagger: 0.1,
      text: 'Jozef Kudrna',
      opacity: 1,
      duration: 1.7,
      ease: 'none',
      delay: 0,
    },
    '-=0.25'
  );
