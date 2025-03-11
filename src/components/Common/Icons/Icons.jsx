import { FaCartArrowDown } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

export default function CartIcon(props){
    const {color,height,width, ...rest} = props
    return (
            <FaCartArrowDown style={{color,height,width}} {...rest} />
    )
}

export function AccountIcon(props){
    const {color,height,width,...rest} = props
    return (
        <MdAccountCircle style={{color,height,width}} {...rest} />
    )
}

export function DeleteIcon(props){
    const {color,height,width,...rest} = props
    return (
        <MdDeleteOutline style={{color,height,width}} {...rest}  />
    )
}
export function UpdateIcon(props){
    const {color,height,width,...rest} = props
    return (
        <FiEdit2 style={{color,height,width}} {...rest} />
    )
}