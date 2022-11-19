class TypeWriter {
  constructor(txtEle, words, wait = 3000) {
    this.txtEle = txtEle;
    this.words = words;
    this.txt = "";
    this.wordIdx = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const curr = this.wordIdx % this.words.length;
    const fullWord = this.words[curr];
    //check if deleting
    if (this.isDeleting) {
      this.txt = fullWord.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullWord.substring(0, this.txt.length + 1);
    }
    this.txtEle.innerHTML = `<span class="word">${this.txt}</span><span class="typing"></span>`;
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    if (!this.isDeleting && this.txt === fullWord) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIdx++;
      typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}
//init on DOM load
document.addEventListener("DOMContentLoaded", init);

//init App
function init() {
  const txtEle = document.querySelector(".typewriter");
  const words = JSON.parse(txtEle.getAttribute("data-words"));
  const wait = txtEle.getAttribute("data-wait");
  new TypeWriter(txtEle, words, wait);
}

let nav = document.querySelector("nav ul");
let ham = document.querySelector(".ham-btn")
let toggle = document.querySelector('.nav__menu input')
toggle.addEventListener('change', function() {
    nav.classList.toggle("active")
})

ham.addEventListener("click", function(){
  nav.classList.toggle("active");
  ham.classList.toggle("is-active");
})