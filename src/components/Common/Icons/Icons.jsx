import { FaCartArrowDown } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

export default function CartIcon(props){
    const {color,height,width} = props
    return (
            <FaCartArrowDown style={{color,height,width}} />
    )
}

export function AccountIcon(props){
    const {color,height,width} = props
    return (
        <MdAccountCircle style={{color,height,width}}  />
    )
}