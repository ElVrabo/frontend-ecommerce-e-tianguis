import Alert from '@mui/material/Alert';

export const SuccessAlert=(props)=>{
    const {type,text,...rest} = props
    return <Alert severity={type} {...rest} >{text}</Alert>
}
export const ErrorAlert = (props)=>{
    const {type,text,...rest} = props;
    return <Alert severity={type} {...rest} >{text}</Alert>
}

export const InfoAlert = (props)=>{
    const {type,text,...rest} = props;
    return <Alert severity={type} {...rest} >{text}</Alert>
}