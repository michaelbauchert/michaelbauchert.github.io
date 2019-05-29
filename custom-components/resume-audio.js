const resumeAudioTemplate = document.createElement('template');
resumeAudioTemplate.innerHTML = `
  <style>
    .animate{
      animation-name: ripple;
      animation-duration: 1s;
      animation-timing-function: ease-out;
    }

    @keyframes ripple {
      from {
        r:0;
      }
      to {
        r: 200vw;
      }
    }

    svg, .splash-container {
      height: 100vh;
      width: 100vw;
      margin: 0;
      padding: 0;
      position: absolute;
    }
  </style>

  <div class="splash-container">
  </div>

  <svg>
    <defs>
      <clipPath id="resumeAudio">
        <circle r="0" />
      </clipPath>
    </defs>
  </svg>
`;

class resumeAudio extends HTMLElement {
  constructor() {
    super();
    let resumeAudio = this;
    let contents = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(resumeAudioTemplate.content.cloneNode(true));

    let splashContainer = this.querySelector(".splash-container");

    splashContainer.innerHTML = contents;

    let circle = this.querySelector("circle");

    this.addEventListener('click', function(e) {
      circle.style.cx = e.clientX;
      circle.style.cy = e.clientY;
      Tone.context.resume();
      circle.classList.add('animate');
      setTimeout(function(){ resumeAudio.parentNode.removeChild(resumeAudio); }, 1000);
    }, false);

  }//end constructor
}//end HTMLElement
customElements.define('resume-audio', resumeAudio);
