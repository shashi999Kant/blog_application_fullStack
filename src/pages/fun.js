import { Button, Popover ,PopoverHeader,PopoverBody} from 'reactstrap'
import React from 'react'
import { useState } from 'react'

export default function Fun() {

    const [open,setOpen]=useState(false);
  return (
    
<div>
  <Button
    id="Popover1"
    type="button"
    onClick={()=> setOpen(!open)}
  >
    Launch Popover
  </Button>
  <Popover
    flip
    target="Popover1"
    toggle={open}
  >
    <PopoverHeader>
      Popover Title
    </PopoverHeader>
    <PopoverBody>
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
    </PopoverBody>
  </Popover>
</div>
  )
}
