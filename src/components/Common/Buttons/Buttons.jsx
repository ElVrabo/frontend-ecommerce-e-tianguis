import * as React from 'react';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import { Button } from "@chakra-ui/react"

export function ButtonContained(props) {
    const {text,backgroundColor,colorText,width,height,...rest} = props;
  return (
    // <Stack spacing={2} direction="row">
 
      <Button variant='contained' style={{backgroundColor,color:colorText,width,height}} {...rest} >{text}</Button>
    // </Stack>
  );
}

export function ButtonOutlined(props){
  const {text,backgroundColor,colorText,width,height,...rest} = props;
    return (
        <Button variant='outlined' style={{backgroundColor,color:colorText,width,height}} {...rest} ></Button>
    )
}