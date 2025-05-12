import logo from '../assets/shugflogo3.png'
import '../styling/footer.css'
import instaLogo from '../assets/instalogo.png'

function Footer() {
    return (
       
           <div className='footer'>
                <img src={logo}></img>
                <p style={{
                    fontFamily:'Arial',
                    fontSize:'0.7em',
                    marginTop:'-5px'
                }}>The Shugf</p>
                <img id='instalogo' src={instaLogo} style={{
                    width:'30px' 
                }} onClick={() => window.open('https://www.instagram.com/theshugf_?igsh=aHJ0aWkxdXdlcm5x', '_blank')}></img>

           </div>
       
    );
}
export default Footer