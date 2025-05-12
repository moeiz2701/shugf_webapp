import hunarbazar from '../assets/hunarbazar.jpg'
import '../styling/locationPage.css'
import Footer from '../components/footer'



function LocationPage() {
    return(
        <>
                <hr style={{ border: '1px solid black', margin: '70px auto', width:'70%', marginBottom:'-20px' }} /> 

        <div className="LocationPage">

            <h1 style={{marginTop:'50px'}}>MEET US AT HUNARBAZAR</h1>
            <div className='location-details'>
            <img src={hunarbazar}></img>
            <p style={{display:'inline'}}>Join us on 1st February at the Hunar Bazar in Bahria Town Phase 4 Rawalpindi for an exclusive shopping experience at our clothing stall! Discover a unique collection of handcrafted designs that redefine style and individuality. Whether you're looking for trendy outfits, cozy sweatshirts, or elegant casuals, our stall has something for everyone. Don’t miss the chance to explore one-of-a-kind pieces, crafted with care and attention to detail. Come, meet us, and enjoy the vibrant atmosphere of Hunar Bazar while treating yourself to quality fashion. See you there!</p>
       </div>
       <hr style={{ border: '1px solid black', margin: '40px auto', width:'70%' }} /> 

            <h1 style={{marginTop:'40px'}}>WHAT ARE YOU GETTING?</h1>
            <p>Don’t miss the chance to own one of our extremely limited and exclusive handcrafted sweatshirts! Each piece is designed with precision and care, ensuring no two are ever the same. Made from the finest materials and crafted to perfection, these sweatshirts blend comfort, style, and individuality. Once they're gone, they’re gone forever – no restocks, no repeats! Elevate your wardrobe with a one-of-a-kind piece that truly stands out. Visit our stall and claim yours before it’s too late!</p>
        </div>
        <Footer />
        </>
    ); // This function returns a simple HTML element
}

export default LocationPage

