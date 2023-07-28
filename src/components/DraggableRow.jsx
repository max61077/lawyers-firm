import React from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { TableCell, TableRow, Button } from '@mui/material';

const DraggableRow = ({ index, row, moveRow, type = 'table_row', onActionButtonClick }) => {
    const [{ isDragging }, drag] = useDrag({
        type: type,
        item: { index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: type,
        hover: (item) => {
            if (item.index === index) {
                return;
            }
            moveRow(item.index, index);
            item.index = index;
        },
    });

    return (
        <TableRow ref={(node) => drag(drop(node))} className='cursor-move py-1' style={{ opacity: isDragging ? 0.5 : 1 }}>
            {
                Object.keys(row).map(key => (
                    typeof row[key] !== 'object' && <TableCell key={row[key]} >{row[key]}</TableCell>
                ))
            }
            <TableCell>
                <Button size='small' variant="contained" color="primary" onClick={() => onActionButtonClick({type: 'booking', data: row})}>
                    Book Slot
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default DraggableRow