import React from 'react'
import './main.css'
// import img1 from '../assets/TicaoIsland-Masbate.jpg'
// import img2 from '../assets/Namanday-Island-Resort.jpg'
// import img3 from '../assets/donsol-whaleshark.jpg'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TimerIcon from '@mui/icons-material/Timer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';

const img1 = 'http://localhost:3000/images/TicaoIsland-Masbate.jpg';
const img2 = 'http://localhost:3000/images/Namanday-Island-Resort.jpg';
const img3 = 'http://localhost:3000/images/donsol-whaleshark.jpg';

const Data = [
    {
        id: 1,
        imgSrc: img1,
        desTitle: 'Ticao Island',
        location: 'Masbate',
        grade: 'ISLAND HOPPING',
        fees: '₱1,550',
        undertext: 'Collective of 20 pax',
        description: '3 Days 2 Nights',
        date: 'Choose your own date',
        placetovisit: '5 PLACE TO VISIT',
        rate: 'RATES PER PERSON',
        rate1: '2-3 pax: Php 19,300',
        rate2: '4-6 pax: Php 14,500',
        rate3: '7-10 pax: Php 12,000'
    },

    {
        id: 2,
        imgSrc: img2,
        desTitle: 'Timberland',
        location: 'Namanday Island Bacacay, Albay',
        grade: 'Barkadahan Tour',
        fees: '₱2,599',
        undertext: '/ pax for 10-12 pax',
        description: '2 Days 1 Night',
        date: 'Choose your own date',
        placetovisit: '4 PLACE TO VISIT',
        rate: 'RATES PER PERSON',
        rate1: '2-3 pax: Php 5,600',
        rate2: '4-6 pax: Php 4,099',
        rate3: '7-10 pax: Php 3,499'
    },

    {
        id: 3,
        imgSrc: img3,
        desTitle: 'Donsol',
        location: 'Sorsogon',
        grade: 'Whaleshark Tour',
        fees: '₱3,300',
        undertext: '/ pax for 6 pax',
        description: 'Whaleshark Half-Day Tour',
        date: 'Choose your own date',
        placetovisit: '1 PLACE TO VISIT',
        rate: 'RATES PER PERSON',
        rate1: '1 pax: Php 10,800',
        rate2: '2 pax: Php 6,500',
        rate3: '3 pax: Php 4,800'
    },

    {
        id: 4,
        imgSrc: img1,
        desTitle: 'Ticao Island',
        location: 'Masbate',
        grade: 'ISLAND HOPPING',
        fees: '₱1,550',
        undertext: 'Collective of 20 pax',
        description: '3 Days 2 Nights',
        date: 'Choose your own date',
        placetovisit: '5 PLACE TO VISIT',
        rate: 'RATES PER PERSON',
        rate1: '2-3 pax: Php 19,300',
        rate2: '4-6 pax: Php 14,500',
        rate3: '7-10 pax: Php 12,000'
    },
   
]

const Main3 = () => {
   
    return (
        <section className='main container section'>

            <div className="secTitle">
                <h3 className="title">
                    International Tours 
                </h3>
            </div>
                
            <div className="secContent grid">{

            }
            
            {   
                Data.map(({id, imgSrc, desTitle, location, grade, fees, undertext, description, date, placetovisit, rate, rate1, rate2, rate3}) => {
                    return(
                        <div key={id}className="singleDestination">
                            {

                            }
                            {/* Image of every card package - Start */}
                            <div className="imageDiv">
                                <img src={imgSrc} alt={desTitle} />
                            </div>
                            {/* Image of every card package - End */}

                            {/* Inside description every card package - Start */}
                            <div className="cardInfo">
                                <h4 className="desTitle">{desTitle}</h4>
                                <span className="continent flex">
                                    <LocationOnIcon className="icon"/>
                                <span className="name">{location}</span>
                                </span>

                            <div className="fees flex">
                                <div className="grade">
                                    <span>{grade}</span>
                                </div>
                                <div className="price">
                                    <h5>{fees}</h5>
                                    <small>{undertext}</small>
                                </div>
                            </div>
                            
                            <div className="desc">
                                <span className="duration flex">
                                    <TimerIcon className="icon"/>
                                    <span className="name">{description}</span>
                                </span>
                                <br />
                                <span className="date flex">
                                    <CalendarMonthIcon className="icon"/>
                                    <span className="name">{date}</span>
                                </span>

                                <span className="place flex">
                                    <LocationOnIcon className="icon"/>
                                    <span className="name">{placetovisit}</span>
                                </span>

                                <span className="rate flex">
                                    <GroupsIcon className="icon"/>
                                    <span className="name">{rate}</span>
                                </span>
                                <span className='rateperperson'>
                                    <p>{rate1}</p>
                                    <p>{rate2}</p>
                                    <p>{rate3}</p>
                                </span>
                            </div>
                            {/* Inside description every card package - End */}
                            
                            <div>
                                <Link to="/Packages">
                                <button className="btn flex" >
                                    VIEW PACKAGE    
                                </button>
                                </Link>
                            </div>

                            </div>

                        </div>
                    )
                })
            }    
            </div>
             
            <div>
            <button className="viewbtn flex">
            <Link to="/Packages">
                View More International Tours
            </Link>
            </button>
            </div> 

        </section>
        
    )
}

export default Main3