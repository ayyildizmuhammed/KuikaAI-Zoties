import { IconButton, MenuItem, Divider, styled } from '@mui/material'
import Menu, { MenuProps } from '@mui/material/Menu'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Mui from '@mui/icons-material'
import CommonStyles from '../../../../../modules/common/CommonStyles'
import { EModalName } from '../../../../../modules/dal/enums/EModalName'
import Camera from '../../../../../modules/dal/models/Camera'
import { setSelectedCamera } from '../../../../../redux/reducers/cameraReducer'
import { openModal } from '../../../../../redux/reducers/modalReducer'

export default function CameraCardSettings(props: Readonly<Camera>) {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    function handleEditClicked() {
        dispatch(openModal(EModalName.EditCamera))
        dispatch(setSelectedCamera(props))
        setAnchorEl(null)
    }

    return (
        <div>
            <IconButton {...CommonStyles.IconButtonProps} style={CommonStyles.IconStyle} size={'large'} onClick={handleClick}>
                <Mui.Settings {...CommonStyles.IconProps} />
            </IconButton>

            <StyledMenu MenuListProps={{ 'aria-labelledby': 'demo-customized-button' }} anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleEditClicked} disableRipple>
                    <Mui.Edit />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <Mui.Delete />
                    Delete
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose} disableRipple>
                    <Mui.MoreHoriz />
                    Disable
                </MenuItem>
            </StyledMenu>
        </div>
    )
}

// material ui'dan alınmıştır.
// https://mui.com/material-ui/react-menu/#account-menu
const StyledMenu = styled((props: MenuProps) => (
    <Menu
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0'
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5)
            },
            '&:active': {
                backgroundColor: theme.palette.action.selectedOpacity
            }
        }
    }
}))
