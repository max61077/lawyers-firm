import React from 'react'

const Slot = ({ slot = {}, onSlotBook }) => {

    return (
        <div className='flex p-2 my-4'>
            <h1 className='font-bold'>{slot.title}</h1>

            <div className='flex'>
                {slot.sub_slots.map(sl => (
                    <div key={sl.title} className={`${sl.isBooked ? 'bg-gray-400 opacity-30 text-white' : 'bg-green-200'} rounded-md px-2 ml-2 cursor-pointer`}>
                        <button disabled={slot.isBooked} onClick={() => onSlotBook(slot, sl.id)}>{sl.title}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slot