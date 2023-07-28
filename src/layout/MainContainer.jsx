import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleToast } from '../redux/slices/layoutSlice'

const MainContainer = () => {
    const { toast } = useSelector(store => store.layout)

    const dispatch = useDispatch()

    return (
        <div className='flex p-10'>
            <Outlet />
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={toast.show} autoHideDuration={toast.duration} onClose={() => dispatch(toggleToast({ ...toast, show: false }))}>
                <Alert onClose={() => dispatch(toggleToast({ ...toast, show: false }))} severity={toast.type} sx={{ width: '100%' }}>
                    {toast.msg}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default MainContainer