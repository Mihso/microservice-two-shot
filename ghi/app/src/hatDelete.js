import React from 'react';
import { Link } from 'react-router-dom';

function HatDelete(props)
{
    const href = props.href
    
    const fetchConfig ={
        method: 'delete',
        body: JSON.stringify(href),
        headers: {'Content-Type':'application/json'},
    };
}

export default HatDelete

// class HatDelete extends React.Component {
//     constructor(props){
//         super(props);
//             this.href= props.href
//             console.log(this.href)
    
//         this.handleSubmit = this.handleSubmit.bind(this);
        
//     }

//     async handleSubmit(event){
//         event.preventDefault();
//         const data = {...this};
//         const url = data.href;
//         const fetchConfig = {
//             method: "delete",
//             body: JSON.stringify(data),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             };
//         const response = await fetch(url, fetchConfig);
//         if (response.ok) {
//             console.log("complete")
//           }
//             }

//     render(){
//         return(
//         <div>
//             <p className='mb-3'>
//                 Are you Sure?
//             </p>
//               <form onSubmit={this.handleSubmit} id="create-hat-form">
//                 <button className="btn btn-primary">yes</button>
//                 </form> 
//         </div>
//     )
// }
// }
// export default HatDelete;