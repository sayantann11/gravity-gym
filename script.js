const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const memberNotes = [
  ['It finally feels like I have a place where I can focus on myself and see real progress.', '— RIYA K. / MEMBER FOR 8 MONTHS'],
  ['The gym feels focused and welcoming. I have stopped overthinking training and started enjoying it.', '— ADITYA P. / MEMBER FOR 1 YEAR'],
  ['Showing up has become part of my week. The consistency has changed how I feel outside the gym too.', '— SNEHA M. / MEMBER FOR 6 MONTHS']
];

let noteIndex = 0;
const note = document.querySelector('.quote blockquote');
const noteCount = document.querySelector('.quote-controls span');
function setNote(index) {
  noteIndex = (index + memberNotes.length) % memberNotes.length;
  note.querySelector('p').textContent = memberNotes[noteIndex][0];
  note.querySelector('footer').textContent = memberNotes[noteIndex][1];
  noteCount.textContent = `0${noteIndex + 1} / 0${memberNotes.length}`;
}
document.querySelector('.previous').addEventListener('click', () => setNote(noteIndex - 1));
document.querySelector('.next').addEventListener('click', () => setNote(noteIndex + 1));

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const details = new FormData(form);
  const text = [
    'Hello Gravity Unisex Gym!',
    '',
    `Name: ${details.get('name')}`,
    `Phone: ${details.get('phone')}`,
    `Goal: ${details.get('message')}`
  ].join('\n');
  window.open(`https://wa.me/919911289009?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

const backToTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 600), { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.querySelector('#year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
