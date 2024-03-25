import React from 'react'
import CorporateContact from './CorporateContact/CorporateContact'

const data = [
  {
    id: "1",
    title: "Recidentail",
    items: ["Individual House", "Apartments", "Duplex Building", "Dormitories"]
  },
  {
    id: "2",
    title: "Commercial",
    items: ["Hotel", "Shopping Mall", "Office Building", "Retail Shop"]
  },
  {
    id: "3",
    title: "Industrial",
    items: ["Warehouse", "Factory", "Garments Building", "Steel Structure"]
  },
  {
    id: "4",
    title: "Constaction",
    items: ["Pile Foundation", "RCC Structure", "Steel Structure", "Building Construction"]
  }
]

function WeDo() {
  return (
    <div className='wedo_cont'>
      <h1>We Do</h1>
      <div className='wedo_item_cont'>
        {data.map((item) => (
          <div key={item.id} className='wedo_item'>
            <h2>{item.title}</h2>
            <ol>
              {
                item.items.map((value, key) => (
                  <li key={key}>{value}</li>
                ))
              }
            </ol>
          </div>
        ))}
      </div>
      <CorporateContact />
    </div>
  )
}

export default WeDo
