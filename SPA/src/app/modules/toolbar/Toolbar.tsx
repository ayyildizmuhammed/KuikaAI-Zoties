export interface ToolbarButton {
    title?: string
    icon?: any
    onClick?: any
    render?: any
    location?: 'before' | 'after'
    navigatePath?: string
}

interface ToolbarProps {
    buttons?: ToolbarButton[]
}

export default function Toolbar({ buttons = [] }: Readonly<ToolbarProps>) {
    const beforeButtons = buttons.filter(button => button.location === 'before')
    const afterButtons = buttons.filter(button => button.location === 'after')

    return (
        <div className="app-toolbar py-3 py-lg-3">
            <div className="app-container d-flex flex-stack container-fluid">
                <div className="toolbar-left d-flex align-items-center">
                    {/* Sola yaslanmış butonlar */}
                    {beforeButtons.map((button, index) => (
                        <div key={button.title} className="me-2">
                            {button.render ? button.render() : <button onClick={button.onClick}>{button.title}</button>}
                        </div>
                    ))}
                </div>
                <div className="ms-auto toolbar-right d-flex align-items-center">
                    {/* Sağa yaslanmış butonlar */}
                    {afterButtons.map((button, index) => (
                        <div key={button.title} className="ms-2">
                            {button.render ? button.render() : <button onClick={button.onClick}>{button.title}</button>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
