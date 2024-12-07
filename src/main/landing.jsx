import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Images import
import google from './images/google.png';
import amazon from './images/amazon.png';
import microsoft from './images/microsoft.jpg';
import student1 from './images/student1.jpg';
import student2 from './images/student2.jpeg';
import student3 from './images/student3.jpg';
import klLogo from './images/klu_logo.png'; // Assuming this is the correct path
import { Link } from 'react-router-dom';

export default function landing() {
  return (
    <div className='landing-body'>
      <section className="hero">
        <nav className="navbar">
          <div className="navdiv">
            <div className="logo">
              <Link to="/">CareerConnects</Link>
            </div>
            <ul>
              <button className='landing-button'>
                <Link className="button-a" to="/login">Login</Link>
              </button>
              <button className='landing-button'>
                <Link className="button-a" to="/register">Signup</Link>
              </button>
            </ul>
          </div>
        </nav>
        <div className="hero-inner">
          <h1>Empowering Your Career Journey</h1>
          <h2>Connecting Students with Opportunities for a Brighter Future</h2>
        </div>
        <div className="down-arrow">
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      <main>
        <h2 id="topcompanies">Top Companies Hiring in Our Campus</h2>
        <div className="card-list">
          <a
            href="https://www.google.com/about/careers/applications/"
            className="card-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={google} alt="Google Logo" />
            <span className="developer">Google</span>
            <h3>Google hired 50 developers from campus last year.</h3>
            <div className="arrow">
              <i style={{color:'black'}} className="fas fa-arrow-right card-icon"></i>
            </div>
          </a>
          <a
            href="https://www.amazon.jobs/en/"
            className="card-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={amazon} alt="Amazon Logo" />
            <span className="designer">Amazon</span>
            <h3>Amazon recruited 40 students for various roles, including designers.</h3>
            <div className="arrow">
              <i style={{color:'black'}}className="fas fa-arrow-right card-icon"></i>
            </div>
          </a>
          <a
            href="https://careers.microsoft.com/v2/global/en/home.html"
            className="card-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={microsoft} alt="Microsoft Logo" />
            <span className="editor">Microsoft</span>
            <h3>Microsoft selected 30 students for engineering and editorial positions.</h3>
            <div className="arrow">
              <i style={{color:'black'}} className="fas fa-arrow-right card-icon"></i>
            </div>
          </a>
        </div>

        {/* Testimonial Section */}
        <section className="testimonial-section">
          <h2 id="success">Some Success Stories of KLU</h2>
          <div className="testimonial-cards">
            <div className="testimonial-card">
              <div className="testimonial-image">
                <img src={student1} alt="Anusha Reddy at Google" />
              </div>
              <div className="testimonial-content">
                <h2>Anusha Reddy, Google</h2>
                <p>The K L University placement team helped me secure a position at Google as a software engineer.</p>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-image">
                <img src={student2} alt="Suresh Kumar at Amazon" />
              </div>
              <div className="testimonial-content">
                <h2>Suresh Kumar, Amazon</h2>
                <p>Thanks to K L University workshops and mock interviews, I was well-prepared for my interviews at Amazon.</p>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-image">
                <img src={student3} alt="Sneha Rao at Microsoft" />
              </div>
              <div className="testimonial-content">
                <h2>Sneha Rao, Microsoft</h2>
                <p>The faculty and placement team at KLU made all the difference.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={klLogo} alt="KL University Logo" className="logo" />
            <h2>KL University</h2>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/about">
                  <i className="fas fa-arrow-right"></i> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <i className="fas fa-arrow-right"></i> Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>
              Email: <a href="mailto:info@klu.edu.in">info@klu.edu.in</a>
            </p>
            <p>
              Phone: <a href="tel:+919854621780">+91 9854621780</a>
            </p>
            <p>Address: KLU Campus, Vijayawada, India</p>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/KLUniversity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook social-icon facebook-icon"></i>
              </a>
              <a
                href="https://twitter.com/KLUniversity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter social-icon twitter-icon"></i>
              </a>
              <a
                href="https://www.instagram.com/kluniversityofficial/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram social-icon instagram-icon"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 KL University. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
