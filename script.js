const sections = [
  `> Initializing GridPirat Terminal...\n> Access Granted ✅\n\n───────────────────────────────\n[ About Me ]\n───────────────────────────────\nName: Muhammed Mabrouk\nField: Industrial Automation → Cyber Security\nMission: Building secure systems ⚙️🛡️\n\n↓ Press Arrow Down`,
  
  `> Opening skills.txt ...\n───────────────────────────────\n[ Skills ]\n───────────────────────────────\n- Network Penetration Testing\n- Secure PLC Communication\n- Kali Linux | Python | Wireshark\n- GitHub Pages | Web Projects\n\n↑ / ↓ to navigate`,
  
  `> Accessing contact.dat ...\n───────────────────────────────\n[ Contact ]\n───────────────────────────────\nEmail: mabrouk@gridpirat.io\nGitHub: github.com/GridPirat\nLinkedIn: linkedin.com/in/mabrouk\n\n↑ Press Arrow Up`
];

let currentSection = 0;
const output = document.getElementById("output");

function typeText(text, i = 0) {
  if (i < text.length) {
    output.textContent = text.substring(0, i + 1);
    setTimeout(() => typeText(text, i + 1), 12);
  }
}

typeText(sections[currentSection]);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    currentSection = (currentSection + 1) % sections.length;
    output.textContent = "";
    typeText(sections[currentSection]);
  } else if (e.key === "ArrowUp") {
    currentSection = (currentSection - 1 + sections.length) % sections.length;
    output.textContent = "";
    typeText(sections[currentSection]);
  }
});
