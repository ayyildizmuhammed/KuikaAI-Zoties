const buttonColor1 = 'var(--bs-primary)'
const buttonColor2 = 'var(--bs-body-color)'
const buttonColor3 = undefined
const textColor = 'var(--bs-primary-inverse)'
const commontColor = buttonColor1

export default class CommonStyles {
    static readonly IconStyle = {
        width: 24,
        height: 24,
        marginTop: 5,
        opacity: 0.8
    }

    static readonly IconButtonProps: any = {
        style: {
            opacity: 1,
            fontWeight: 'bolder',
            borderRadius: 0,
            borderLeft: '2px solid white',
            borderRight: '2px solid white',
            borderColor: buttonColor1
        }
    }

    static readonly IconProps = {
        style: {
            cursor: 'pointer',
            color: commontColor
        }
    }

    static readonly IconTitleProps = {
        style: {
            color: commontColor,
            opacity: 0.8,
            fontWeight: 'bolder'
        }
    }
}
