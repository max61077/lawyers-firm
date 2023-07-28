import React, { useState } from 'react'
import Slot from './Slot'
import { updateData } from '../redux/slices/lawyerSlice'
import { toggleToast } from '../redux/slices/layoutSlice'
import { useSelector, useDispatch } from 'react-redux'

const SlotContainer = ({ data, onSave }) => {

    const { data: tableData } = useSelector(store => store.lawyer)

    const dispatch = useDispatch()

    const [slotData, setSlotData] = useState(data)

    const handleSlotBook = (selectedSlot, subSlotId) => {

        const newAvailableSlots = slotData.available_slots.map(slot => {

            const updatedSlot = {
                ...slot
            }

            if (slot.id === selectedSlot.id) {
                updatedSlot.sub_slots = slot.sub_slots.map((sl, ind) => ({
                    ...sl,
                    isBooked: sl.id === subSlotId ? !slot.sub_slots[ind].isBooked: slot.sub_slots[ind].isBooked
                }))
            }

            return updatedSlot
        })

        setSlotData({
            ...slotData,
            available_slots: newAvailableSlots
        })
    }

    const handleConfirmBooking = () => {
        let tempData = [...tableData]
        const ind = tempData.findIndex(d => d.id === slotData.id)

        const titleMap = {}

        slotData.available_slots.map(slot => {
            titleMap[slot.title.slice(0, 3)] = slot.sub_slots.filter(sl => !sl.isBooked).length > 0
        })
        
        tempData[ind] = {
            ...tempData[ind],
            available_days: Object.keys(titleMap).filter(title => titleMap[title]).join(', '),
            available_slots: slotData.available_slots
        }

        dispatch(updateData(tempData))
        dispatch(toggleToast({
            show: true,
            msg: 'Booking Confirmed'
        }))
        onSave()
        
    }

    return (
        <div className='absolute w-[50%] h-[70%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-white'>
            <div className='bg-white h-[100%] rounded-md p-10'>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='font-bold text-lg text-slate-700 mb-2'>Lawyer Details</h1>
                        <div className='p-2 mb-3'>
                            <h1>Name: <span className='font-bold'>{slotData?.name}</span></h1>
                        </div>
                        <div className='p-2 mb-3'>
                            <h1>Speciality: <span className='font-bold'>{slotData?.speciality}</span></h1>
                        </div>
                        <div className='p-2 mb-3'>
                            <h1>Firms: <span className='font-bold'>{slotData?.firms}</span></h1>
                        </div>
                        <div className='p-2 mb-3'>
                            <h1>Address: <span className='font-bold'>{slotData?.address}</span></h1>
                        </div>
                        <div className='p-2 mb-3'>
                            <h1>Phone: <span className='font-bold'>{slotData?.phone}</span></h1>
                        </div>
                    </div>
                    <div className='px-4 w-[75%]'>
                        <h1 className='font-bold text-lg text-green-400 mb-2'>Slots Available</h1>
                        {
                            slotData?.available_slots?.map(slot => (
                                <Slot key={slot.id} slot={slot} onSlotBook={handleSlotBook} />
                            ))
                        }
                    </div>

                </div>
                <div className='text-center bg-green-400 text-white'>
                    <button onClick={handleConfirmBooking} className='py-2'>Confirm Booking</button>
                </div>
            </div>
        </div>
    )
}

export default SlotContainer