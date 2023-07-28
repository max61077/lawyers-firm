import React, { useState } from 'react'
import TableComponent from '../components/TableComponent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';
import SlotContainer from '../components/SlotContainer';

const columns = ['ID', 'Name', 'Speciality', 'Firms', 'Address', 'Phone', 'Available Days', 'Actions']

const Home = () => {

    const { data } = useSelector(store => store.lawyer)

    const [search, setSearch] = useState('');
    const [filteredLawyers, setFilteredLawyers] = useState(data);
    const [selectedLawyer, setSelectedLawyer] = useState(null)

    const handleSearchChange = (event) => {
        const { value } = event.target;

        const filtered = data.filter((lawyer) =>
            lawyer.name.toLowerCase().includes(value.toLowerCase()) ||
            lawyer.speciality.toLowerCase().includes(value.toLowerCase()) ||
            lawyer.firms.toLowerCase().includes(value.toLowerCase()) ||
            lawyer.address.toLowerCase().includes(value.toLowerCase()) ||
            lawyer.phone.toLowerCase().includes(value.toLowerCase()) ||
            lawyer.available_days.toLowerCase().includes(value.toLowerCase())
        );

        setSearch(value);
        setFilteredLawyers(filtered);
    };


    return (
        <>
            <DndProvider backend={HTML5Backend} >
                {
                    selectedLawyer !== null &&
                    <CustomModal onClose={() => setSelectedLawyer(null)}>
                        <SlotContainer data={selectedLawyer} onSave={() => setSelectedLawyer(null)} />
                    </CustomModal>
                }
                <div className='flex flex-col min-w-full border-2 p-4 rounded-md'>
                    <div className='flex flex-row justify-between items-center mb-4 shadow-md'>
                        <div className='mx-4'>
                            <h1 className='font-bold'>Lawyers firm</h1>
                        </div>
                        <div className='shadow-md rounded-md' >
                            <input type='text' className='p-4 rounded-md outline-none border-gray-100 w-80' value={search} placeholder='Search Lawyers' onChange={handleSearchChange} />
                        </div>
                    </div>
                    <TableComponent rows={search.trim().length > 0 ? filteredLawyers : data} columns={columns} onActionButtonClick={action => setSelectedLawyer(action.data)} />
                </div>
            </DndProvider>
        </>
    )
}

export default Home