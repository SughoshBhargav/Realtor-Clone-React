import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaBath, FaChair, FaMapMarkerAlt, FaParking } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { FaShare } from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {

  const auth = getAuth()
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const [contactLandlord,setContactLandlord] = useState(false)
  SwiperCore.use([Autoplay, Navigation, Pagination]); // Use modules

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{delay:3000,}}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className=" relative w-full overflow-hidden h-[300px]"
              style={{ background: `url(${listing.imgUrls[index]}) 
                center no-repeat`,backgroundSize:"cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-gray-400 rounded-full w-12 h-12 flex justify-center items-center "onClick={()=>{
        navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(()=>{
          setShareLinkCopied(false)
        },2000)
      }}>
        <FaShare  className="text-lg text-slate-500"/>
      </div>
      {shareLinkCopied && <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">Link Copied</p>}

      <div className="m-8 flex flex-col md:flex-row max-6xl lg:mx-auto  
      p-4 rounded-lg bg-white lg:space-x-5 shadow-lg ">
        <div className=" w-full h-[200px] lg-[400px]">
          <p className="text-2xl font-bold m-3 text-blue-900">
            {listing.name}-${listing.offer
              ?listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g,",")
            :listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g,",")}
                {listing.type==="rent"?"/month":""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold ">
          <FaMapMarkerAlt className="text-green-700 mr-1"/>{listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%] ">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">{listing.type==="rent"?"Rent":"Sale"}</p>
            <p className="w-full max-w-[200px] rounded-md bg-green-800 p-1 text-white font-semibold shadow-md">{listing.offer && (
              <p>${listing.regularPrice-listing.discountedPrice} discount</p>
          )}</p>
          </div>
          <p className="mt-3 mb-3"> 
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <u className="flex items-center mb-6 space-x-2 text-sm sm:space-x-10 font-semibold"l>
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1"/>
              {+listing.bedrooms>1?`${listing.bedrooms} Beds`:"1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1"/>
              {+listing.bathroom>1?`${listing.bathroom} Bathrooms`:"1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1"/>
              {listing.parking>1?"Parking spot":"No Parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1"/>
              {listing.furnished>1?"Furnished":"Not furnished"}
            </li>
            
          </u>
        </div> 
        <div className="bg-blue-300 w-full z-10 overflow-x-hidden">
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord &&(      
            <div className="mt-6">
            <button onClick={()=>setContactLandlord(true)} className="px-7 py-3 bg-blue-600 text-white font-medium text-sm-uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out"> Contact Landloard</button>
            </div>      
          )}
          {contactLandlord &&(
            <Contact userRef={listing.userRef} listing={listing}/>
          )}
        </div>
      </div>
    </main>
  );
}
