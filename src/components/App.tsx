import { useState, useEffect } from 'react';
import { 
  TopBar,
  HeroSection,
  ServicesSection,
  CaseStudiesSection,
  SupportingBrandsSection,
  ContactSection
} from './index'; 
import './App.css';


/**
 * Main component of the web app.
 * @returns the main component that is made up of all smaller components that make the web app.
*/
function App() {
  const [brandIcons, setBrandIcons] = useState<Array<string>>([]);   

  /**
   * Function used to get available GUID's for brand logos from the /brands API.
   * The brandIcons state gets updated thereafter.
  */
  function getBrandIcons(){
    fetch('http://localhost:3000/brands',{method:'GET', headers:{'Content-type':'application/json'}})
    .then((result)=>{
      if (result.ok) {
        return result.json()
      } else {
        return []
      }
    })
    .then((data)=>{
      setBrandIcons(data);
    })
    .catch((error)=>console.log(error));
  }

  useEffect(()=>{
    getBrandIcons();
  }, []);

  return (
    <>
      <TopBar />
      <article>
        <HeroSection />
        <ServicesSection />
        <CaseStudiesSection />
        <SupportingBrandsSection brandIcons={brandIcons}/>
        <ContactSection />
      </article>
    </>
  );
}

export default App
