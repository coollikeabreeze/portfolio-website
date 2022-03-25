import AbstractView from "./AbstractView.js"
import NavBar from "../components/NavBar.js"

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Home")
  }

  async getHtml() {
    return `
    ${NavBar()}
    <div id="page-title">
      <div>
      <h1 id="site-title">Andrea Khan
      <hr id ="title-line"></hr>
      </h1>
      <h3 class="" id="site-subtitle">Software Engineer</h3>
      <div class="about">
      <p>Brooklyn, NY</p>
      <p>
        JavaScript ES6 | React | Redux | Express | SQL |
        Firebase | HTML5 | CSS | TailwindCSS
      </p>
      </div>
      </div>

      <div>
      </div>

      </div>


      <div class="body-content">

      <div class="projects">
        <h1 class="section-title">Projects</h1>
        <div class="project-cards">
          <div class="card">
            <iframe
              width="400"
              height="250"
              src="https://www.youtube.com/embed/QaOyU8KFd0A?controls=0"
            >
            </iframe>
            <div class="container">
              <h4><b>Sweatdeck</b></h4>
              <p></p>
            </div>
          </div>

          <div class="card">
            <img
              width="400"
              height="250"
              src="https://www.youtube.com/embed/QaOyU8KFd0A?controls=0"
            />
            <div class="container">
              <h4><b>Daatafi</b></h4>
              <p></p>
            </div>
          </div>
        </div>
      </div>

      <div class="contact">
        <h1 class="section-title">Contact</h1>
      </div>
      </div>`
  }
}

