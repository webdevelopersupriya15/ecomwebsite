
import { faPray } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export let itemList=[
    {
        id:1,
        name:"Category",
        icon:<FontAwesomeIcon icon={faPray} className='me-2 icon-small'/>,
        submenu:[
            {
              menu:"Add Course",
              url:"/addcourse"
            },

            {
              menu:"View Course",
              url:"/viewcourse"
            },
            
            
        ]
    },
    {
        id:2,
        name:"Products",
        icon:<FontAwesomeIcon   className='me-2 fa-xs'/>,
        submenu:[
          {
            menu:"Add Video",
            url:"/addvideo"
          },
          
          {
            menu:"View Video",
            url:"/viewvideo"
          },

        
      ]
    }
   
  ]