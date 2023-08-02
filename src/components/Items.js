import React from 'react'

function Item({item}) {
    return ( 
            <>
            <img src={item.image} alt="" style={{width:"100%", height:"85svh"}}/>
            </>       
    )
}

export default Item

