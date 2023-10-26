import { useState, useEffect, ReactElement } from 'react'
import './App.css'
import UXIcon from '../assets/UX Icon.svg';
import AppDevIcon from '../assets/App Dev Icon.svg';
import WebDevIcon from '../assets/Web Dev Icon.svg';
import BlockchainIcon from '../assets/Blockchain Icon.svg';

import TheOlympianBgImage from '../assets/TheOlympian.png';
import SkhokhoBgImage from '../assets/SkhokhoSeMali.png';
import TheSavingJarBgImage from '../assets/TheSavingsJar.png';

interface BrandIconInterface{
  stringifiedHTML: string;
};

interface ArticleSectionInterface{
  identifier: string;
  classIdentifier: string; 
  sectionTitle: string;
  children?: ReactElement;
};

function App() {
  const [brandIcons, setBrandIcons] = useState<Array<any>>([]);

  const ParseHTMLComponent: React.FC<BrandIconInterface> = ({stringifiedHTML}) => {
    return (
      <div className='brand-icon'>
        <img src={`http://localhost:3000/brands/${stringifiedHTML}`} />
      </div>
    );

  };
    
  function getBrandIcons(){
    fetch('http://localhost:3000/brands',{method:'GET', headers:{'Content-type':'application/json'}})
    .then((result)=>result.json())
    .then((data)=>{
      setBrandIcons(data);
    })
    .catch((error)=>console.log(error));
  }

  useEffect(()=>{
    getBrandIcons();
  }, []);

  const TopBar: React.FC = () => {
    return(
      <div className='top-bar'>
          <img className='brand-logo' src={'logo.svg'} />
          <nav className='nav-section'>
            <a href='#services' className='nav-section-item'>Services</a>
            <a href='#brands' className='nav-section-item'>Industries</a>
            <a href='#cases' className='nav-section-item'>Cases</a>
            <a href='#contacts' className='nav-section-item'>Contact</a>
          </nav>
          <button className='bot-btn btn-primary' >Let's Talk</button>
      </div>
    );
  }

  const HeroSection: React.FC = () => {
    return(
      <section className='landing-page'>
        <div className='hero-description'>
          <h1>Live with Confidence</h1>
          <p>José Mourinho brings confidence to pan-African Sanlam campaign.</p>
          <button onClick={()=>window.open('https://github.com/fruittymango/Project-Square-Submission-By-Isaac-Mogano')} className='project-link-btn btn-primary'>View project</button>
        </div>
      </section>  
    );
  }

  const ServicesSection: React.FC = () => {
    // return(
    //   <section id='services' className='services-section'>
    //     <div className='section-fg'>
    //       <div className='section-header'>
    //         <div className='horizontal-bar'></div>
    //         <h3>What we do</h3>
    //       </div>
    //       <h1>We offer a complete range of bespoke design and development services to help you turn your ideas into digital masterpieces</h1>
    //       <div className='services-carousel'>
    //           <div className='services-carousel-item'>
    //             <img src={WebDevIcon}/>
    //             <h5>Web development</h5>
    //             <p>
    //               We use cutting-edge web development technologies to help our clients fulfill their business goals through functional, reliable solutions.
    //             </p>
    //           </div>

    //           <div className='services-carousel-item'>
    //             <img src={UXIcon}/>
    //             <h5>User experience & design</h5>
    //             <p>Our complete web design services will bring your ideas to life and provide you with a sleek, high-performing product that elevates your business.</p>
    //           </div>

    //           <div className='services-carousel-item'>
    //             <img src={AppDevIcon}/>
    //             <h5>Mobile app development</h5>
    //             <p>Our extensive mobile development experience allows us to create custom native and cross-platform iOS and Android mobile solutions for our clients.</p>
    //           </div>

    //           <div className='services-carousel-item'>
    //             <img src={BlockchainIcon}/>
    //             <h5>Mobile app development</h5>
    //             <p>Our extensive mobile development experience allows us to create custom native and cross-platform iOS and Android mobile solutions for our clients.</p>
    //           </div>
    //       </div>
    //     </div>
    //   </section> 
    // );

    return (
      <ArticleSection identifier='services' classIdentifier='services-section' sectionTitle={'What we do'}>
        <>
          <h1>We offer a complete range of bespoke design and development services to help you turn your ideas into digital masterpieces</h1>
          <div className='services-carousel'>
              <div className='services-carousel-item'>
                <img src={WebDevIcon}/>
                <h5>Web development</h5>
                <p>
                  We use cutting-edge web development technologies to help our clients fulfill their business goals through functional, reliable solutions.
                </p>
              </div>

              <div className='services-carousel-item'>
                <img src={UXIcon}/>
                <h5>User experience & design</h5>
                <p>Our complete web design services will bring your ideas to life and provide you with a sleek, high-performing product that elevates your business.</p>
              </div>

              <div className='services-carousel-item'>
                <img src={AppDevIcon}/>
                <h5>Mobile app development</h5>
                <p>Our extensive mobile development experience allows us to create custom native and cross-platform iOS and Android mobile solutions for our clients.</p>
              </div>

              <div className='services-carousel-item'>
                <img src={BlockchainIcon}/>
                <h5>Mobile app development</h5>
                <p>Our extensive mobile development experience allows us to create custom native and cross-platform iOS and Android mobile solutions for our clients.</p>
              </div>
          </div>
        </>
      </ArticleSection>
    );
  }

  const CaseStudiesSection: React.FC = () => {
    // return(
    //   <section id='cases' className='case-studies-section'>
    //   <div className='section-fg'>
    //     <div className='section-header'>
    //       <div className='horizontal-bar'></div>
    //       <h3>Case studies</h3>
    //     </div>
    //     <div className='case-studies-carousel'>
    //       <div className='case-studies-carousel-item' style={{backgroundImage:`url(${TheOlympianBgImage})`}}>
    //         <div className='case-studies-card'>
    //           <div className='horizontal-bar'></div>
    //           <h4>The Olympian</h4>
    //           <p>The only athlete in the world to do her Olympic routine in 2020.</p>
    //         </div>
    //       </div>
    //       <div className='case-studies-carousel-item' style={{backgroundImage:`url(${TheSavingJarBgImage})`}}>
    //         <div className='case-studies-card'>
    //           <div className='horizontal-bar'></div>
    //           <h4>The Savings Jar</h4>
    //           <p>Grow your savings treasure and grow your dragon.</p>
    //         </div>
    //       </div>
    //       <div className='case-studies-carousel-item' style={{backgroundImage:`url(${SkhokhoBgImage})`}}>
    //         <div className='case-studies-card'>
    //           <div className='horizontal-bar'></div>
    //           <h4>Skhokho seMali</h4>
    //           <p>Helping South Africans become #CashCleva with Skhokho and TymeBank.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   </section>
    // );

    return(
      <ArticleSection identifier='cases' classIdentifier='case-studies-section' sectionTitle={'Case studies'}>
        <div className='case-studies-carousel'>
          <div className='case-studies-carousel-item' style={{backgroundImage:`url(${TheOlympianBgImage})`}}>
            <div className='case-studies-card'>
              <div className='horizontal-bar'></div>
              <h4>The Olympian</h4>
              <p>The only athlete in the world to do her Olympic routine in 2020.</p>
            </div>
          </div>
          <div className='case-studies-carousel-item' style={{backgroundImage:`url(${TheSavingJarBgImage})`}}>
            <div className='case-studies-card'>
              <div className='horizontal-bar'></div>
              <h4>The Savings Jar</h4>
              <p>Grow your savings treasure and grow your dragon.</p>
            </div>
          </div>
          <div className='case-studies-carousel-item' style={{backgroundImage:`url(${SkhokhoBgImage})`}}>
            <div className='case-studies-card'>
              <div className='horizontal-bar'></div>
              <h4>Skhokho seMali</h4>
              <p>Helping South Africans become #CashCleva with Skhokho and TymeBank.</p>
            </div>
          </div>
        </div>
      </ArticleSection>
    );  
  }

  const SupportingBrandsSection: React.FC = () => {
    // return(
    //   <section id='brands' className='clients-section'>
    //     <div className='section-header'>
    //       <div className='horizontal-bar'></div>
    //       <h3>You'll be in good company</h3>
    //     </div>
    //     <h1>Trusted by leading brands</h1>
    //     <div className='brand-carousel'>
    //       {brandIcons.map((value:any,)=>{
    //         return (<ParseHTMLComponent  stringifiedHTML={value}/>)
    //       })}
    //     </div>        
    //   </section>
    // );
    
    return(
      <ArticleSection identifier='brands' classIdentifier='clients-section' sectionTitle={'You\'ll be in good company'}>
        <>
          <h1>Trusted by leading brands</h1>
          <div className='brand-carousel'>
            {brandIcons.map((value:any,)=>{
              return (<ParseHTMLComponent  stringifiedHTML={value}/>)
            })}
          </div> 
        </>
      </ArticleSection>

    );
  }

  const ContactSection: React.FC = () => {
    // return(
    //   <section id='contacts' className='contact-section'>
    //     <div className='section-header'>
    //       <div className='horizontal-bar'></div>
    //       <h3>Contact us</h3>
    //     </div>

    //     <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row',}}>
    //       <h1 style={{width:'35rem',}}>Have a project in mind?<span>Let's make it happen</span></h1>
    //       <div style={{display:'inline-block', position:'relative', alignSelf:'center',left:'-1.5rem'}}>
    //         <span style={{display:'block'}}>22 Street Name, Suburb, 8000,</span>
    //         <span style={{display:'block'}}>Cape Town, South Africa</span>
    //         <span style={{display:'block'}}>+27 21 431 0001</span>
    //         <span style={{display:'block'}}>enquirie@website.co.za</span>
    //       </div>
    //     </div>

    //     <footer style={{display:'flex', flexDirection:'row', gap:'40px', }}>
    //       <div className='reference-list'>
    //         <a>Terms of service</a>
    //         <a>Privacy policy</a>
    //         <a>Impressum</a>
    //       </div>
    //       <div className='reference-list'>
    //         <a>Facebook</a>
    //         <a>Instagram</a>
    //         <a>Twitter</a>
    //       </div>
    //       <div className='reference-list'>
    //         <a>Github</a>
    //         <a>LinkedIn</a>
    //         <a>Teams</a>
    //       </div>
    //       <div className='reference-list'>
    //         <a>Youtube</a>
    //         <a>Behance</a>
    //         <a>Dribble</a>
    //       </div>
    //       <div className='reference-list'>
    //         <a>Explore open jobs</a>
    //         <a>2000-2023 Company Name</a>
    //       </div>
    //     </footer>
    //   </section>
    // );

    return (
      <ArticleSection identifier='contacts' classIdentifier='contact-section' sectionTitle='Contact us'>
        <>  
          <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row',}}>
            <h1 style={{width:'35rem',}}>Have a project in mind?<span>Let's make it happen</span></h1>
            <div style={{display:'inline-block', position:'relative', alignSelf:'center',left:'-1.5rem'}}>
              <span style={{display:'block'}}>22 Street Name, Suburb, 8000,</span>
              <span style={{display:'block'}}>Cape Town, South Africa</span>
              <span style={{display:'block'}}>+27 21 431 0001</span>
              <span style={{display:'block'}}>enquirie@website.co.za</span>
            </div>
          </div>

          <footer style={{display:'flex', flexDirection:'row', gap:'40px', }}>
            <div className='reference-list'>
              <a>Terms of service</a>
              <a>Privacy policy</a>
              <a>Impressum</a>
            </div>
            <div className='reference-list'>
              <a>Facebook</a>
              <a>Instagram</a>
              <a>Twitter</a>
            </div>
            <div className='reference-list'>
              <a>Github</a>
              <a>LinkedIn</a>
              <a>Teams</a>
            </div>
            <div className='reference-list'>
              <a>Youtube</a>
              <a>Behance</a>
              <a>Dribble</a>
            </div>
            <div className='reference-list'>
              <a>Explore open jobs</a>
              <a>2000-2023 Company Name</a>
            </div>
          </footer>
        </>
      </ArticleSection>
    );
  }

  const ArticleSection: React.FC<ArticleSectionInterface> = ({identifier,classIdentifier, sectionTitle, children}) => {
    return (
      <section id={identifier} className={classIdentifier}>
        <div className='section-header'>
          <div className='horizontal-bar'></div>
          <h3>{sectionTitle}</h3>
        </div>
        {children}
      </section>

    );    
  }

  return (
    <>
      <TopBar />
      <article>
        <HeroSection />
        <ServicesSection />
        <CaseStudiesSection />
        <SupportingBrandsSection />
        <ContactSection />
      </article>
    </>
  );
}

export default App
