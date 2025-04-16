
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";


export default function CartIcon(props){
    const {color,height,width, ...rest} = props
    return (
            <FiShoppingCart style={{color,height,width}} {...rest} />
    )
}

export function AccountIcon(props){
    const {color,height,width,...rest} = props
    return (
        <CgProfile style={{color,height,width}} {...rest} />
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

export function BackIcon(props){
    const {color,height,width,...rest} = props
    return (
        <IoIosArrowRoundBack style={{color,height,width}} {...rest} />
    )
}