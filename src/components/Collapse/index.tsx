import { ReactNode, useState } from "react";

interface CollapseCheckboxProps {
    selected: boolean;
    readOnly: boolean;
    onSelect: () => void;
}

interface CollapseProps extends CollapseCheckboxProps {
    titulo: string;
    children: ReactNode;
}

interface CollapseItemProps extends CollapseCheckboxProps {
    children: ReactNode;
}

export function CollapseCheckBox({ selected, onSelect, readOnly }: CollapseCheckboxProps) {
    return (
        <button className="app-collapse-checkbox p-2 btn-none" onClick={() => !readOnly && onSelect()} type="button">
            <input readOnly={true} className="br-checkbox" type="checkbox" checked={selected}
                style={{ width: '24px', height: '24px' }} />
        </button>
    );
}

export function CollapseItem({ children, selected, ...props }: CollapseItemProps) {
    return (
        <div className="app-collapse-item d-flex w-100 align-items-center pl-5"
            style={{ height: '64px', backgroundColor: selected ? '#2670E8' : '#F8F8F8', color: selected ? '#ffffff' : '#000000' }}>
            <CollapseCheckBox selected={selected} {...props} />
            {children}
        </div>
    );
}

export function Collapse({ titulo, children, selected, readOnly, ...props }: CollapseProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className="app-collapse d-flex flex-column w-100">
            <div className="app-collapse-header d-flex align-items-center" style={{ height: '64px' }}>
                <CollapseCheckBox selected={selected} readOnly={readOnly} {...props} />
                <button className="app-collapse-button d-flex align-items-center justify-content-between btn-none w-100 ml-2"
                    onClick={() => setIsCollapsed(c => !c)} type="button">
                    <span>{titulo}</span>
                    <i className={`fas ${isCollapsed ? 'fa-angle-down' : 'fa-angle-up'}`} aria-hidden="true"></i>
                </button>
            </div>
            {
                isCollapsed && <div className="d-flex flex-column">{children}</div>
            }
        </div>
    );
}
