import React from 'react'
import ServiceCardSingle from './ServiceCard/ServiceCardSingle'
import soil from "@/../public/Service/soil.jpg";
import ap from "@/../public/Service/ap.png";
import ad from "@/../public/Service/ad.jpg";
import land from "@/../public/Service/land.jpg";
import interior from "@/../public/Service/interior.jpg";
import sd from "@/../public/Service/sd.PNG";
import est from "@/../public/Service/est.jpg";
import ssd from "@/../public/Service/ssd.jpg";
import ep from "@/../public/Service/ep.jpg";
import ia from "@/../public/Service/IA.jpg";

const service = [
  {
    id: "1",
    title: "Architechural Design",
    body: "The architechure define how a building looks and functions. At EDD we alwasys try to provide exceptional client service with creative and professional architechural design.",
    img: ad,
  },
  {
    id: "2",
    title: "Approval Plan",
    body: "We provide all kinds of approval service including Gazipur Unnayan Kartripakkha, RAJUK and Upazila. In addition we also provide 'Approval Plan Drawing' for any kind of approval.",
    img: ap,
  },
  {
    id: "3",
    title: "Land Servey",
    body: "All types of digital and manual land survey services are provided, including accurate measurement of land, demarcation of boundaries, land distribution. In addition, land leveling and layout services are also provided.",
    img: land,
  },
  {
    id: "4",
    title: "Soil Investigation",
    body: "Soil Testing is a very important task for any construction. We collect soil samples from site as per proper procedure and test in reputed labs like DUET, BUET, IUT in the country.",
    img: soil
  },
  {
    id: "5",
    title: "Interior & Exterior Design",
    body: "We efficiently take up interior and exterior designing work for all types of establishments including offices, residences, apartments, duplex buildings, resorts, etc.",
    img: interior
  },
  {
    id: "6",
    title: "Structural Design",
    body: "Your building will be structurally designed by experienced structural engineers. The building will be designed as per BNBC, ACI code to make it eco-friendly and earthquake resistant.",
    img: sd
  },
  {
    id: "7",
    title: "Estimation & Project Supervision",
    body: "All types of estimate works are done with correct estimate, BOQ, valuation, tender document of any establishment. In addition, all types of supervision services are provided to complete your construction work correctly.",
    img: est
  },
  {
    id: "8",
    title: "Steel Strucute Design & Drawing",
    body: "All types of steel structure design, estimate, detailing drawing, fabrication, erection including factory building, warehouse, store and all types of steel works are done.",
    img: ssd
  },
  {
    id: "9",
    title: "Electrical & Plambing Design",
    body: "Electrical load calculation, electrical design, drawing and all types of electrical services are provided by experienced electrical engineers for your establishment. In addition, plumbing design, drawing and services are provided for your establishment.",
    img: ep
  },
  {
    id: "10",
    title: "Industrial Attachment",
    body: "Engineer’s Design & Development offers 12-week Industrial Attachment training for BTEB-certified Diploma Engineering students, bridging vocational syllabus gaps. Led by professionals, it emphasizes job skills with modern labs and tutorials. Post-training support ensures students can showcase talents for job placements or entrepreneurship.",
    img: ia 
  }
]


function ServiceCard() {

  return (
    <div className='service_card_cont'>
      {
        service.map((item) => (
          <ServiceCardSingle data={item} key={item.id}/>
        ))
      }
    </div>
  )
}

export default ServiceCard
