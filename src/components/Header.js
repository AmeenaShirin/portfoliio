import { useEffect } from 'react';

function Header() {
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    const navbarlinks = document.querySelectorAll('#navbar .scrollto');
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = document.querySelector(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };

  const scrollto = (el) => {
    let elementPos = document.querySelector(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    });
  };

  const toggleBacktotop = () => {
    const backtotop = document.querySelector('.back-to-top');
    if (window.scrollY > 100) {
      backtotop.classList.add('active');
    } else {
      backtotop.classList.remove('active');
    }
  };

  useEffect(() => {
    window.addEventListener('load', navbarlinksActive);
    window.addEventListener('scroll', navbarlinksActive);
    window.addEventListener('load', toggleBacktotop);
    window.addEventListener('scroll', toggleBacktotop);
    return () => {
      window.removeEventListener('load', navbarlinksActive);
      window.removeEventListener('scroll', navbarlinksActive);
      window.removeEventListener('load', toggleBacktotop);
      window.removeEventListener('scroll', toggleBacktotop);
    };
  }, []);

  const handleMobileNavToggle = () => {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    mobileNavToggle.classList.toggle('bi-list');
    mobileNavToggle.classList.toggle('bi-x');
  };

  const handleScrollTo = (e) => {
    const hash = e.target.hash;
    if (document.querySelector(hash)) {
      e.preventDefault();
      const body = document.querySelector('body');
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        const navbarToggle = document.querySelector('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(hash);
    }
  };

  useEffect(() => {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      scrollto(window.location.hash);
    }
  }, []);
return (
      <div>
              <i className="bi bi-list mobile-nav-toggle d-xl-none" onClick={handleMobileNavToggle}></i>
<header id="header">
    <div className="d-flex flex-column">

      <div className="profile">
        <img src="assets/img/s.jpg" alt="" className="img-fluid rounded-circle" />
        <h1 className="text-light"><a href="index.html">Ameena Syed</a></h1>
        <div className="social-links mt-3 text-center">
          <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
          <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
          <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
          <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
          <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
        </div>
      </div>

      <nav id="navbar" class="nav-menu navbar">
    
        <ul>
          <li><a href="#hero" className="nav-link scrollto active"><i className="bx bx-home"></i> <span>Home</span></a></li>
          <li><a href="#about" className="nav-link scrollto" ><i className="bx bx-user"></i> <span>About</span></a></li>
          <li><a href="#resume" className="nav-link scrollto" ><i className="bx bx-file-blank"></i> <span>Resume</span></a></li>
          <li><a href="#portfolio" className="nav-link scrollto" ><i className="bx bx-book-content"></i> <span>Portfolio</span></a></li>
         
          <li><a href="#contact" className="nav-link scrollto" ><i className="bx bx-envelope"></i> <span>Contact</span></a></li>
        </ul>
      </nav>
    </div>
  </header>
</div>
      
    );
}
export default Header;