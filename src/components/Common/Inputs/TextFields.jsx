
import TextField from '@mui/material/TextField';
export function FieldOutlined(props){
    const {...rest} = props
    return <input {...rest} />
}

export function FieldFilled(props){
    const {width,height,label,...rest} = props
    return <TextField id="filled-basic" label={label} variant="filled" style={{width,height}} {...rest} />

}

export function FieldStandard(props){
    const {width,height,label,...rest} = props
    return <TextField id="standard-basic" label={label} variant="standard" style={{width,height}} {...rest} />
}