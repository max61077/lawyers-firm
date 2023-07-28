import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DraggableRow from './DraggableRow';
import { useDispatch } from 'react-redux';
import { updateData } from '../redux/slices/lawyerSlice';

const TableComponent = ({ rows, columns = [], onActionButtonClick }) => {

    const dispatch = useDispatch()

    const moveRow = (dragIndex, hoverIndex) => {
        const draggedRow = rows[dragIndex];
        const updatedData = [...rows];
        
        updatedData.splice(dragIndex, 1);
        updatedData.splice(hoverIndex, 0, draggedRow);

        dispatch(updateData(updatedData))
    };

    return (
        <TableContainer style={{ maxHeight: 550 }} >
            <Table stickyHeader={true} size='small' >
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell key={column} className='font-bold' >{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <DraggableRow key={row.id} index={index} row={row} moveRow={moveRow} onActionButtonClick={onActionButtonClick} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableComponent;
