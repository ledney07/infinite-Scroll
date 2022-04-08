import React, {useState, useEffect} from "react"
import Axios from "axios"
import "../css/nfts-styles.css"



const Nft = () => {
  const [data, setData] = useState([])
  const [pageNo, setPageNo] = useState(1)

  const getData = () =>{
    Axios.get(`https://jsonplaceholder.typicode.com/albums/${pageNo}/photos`)
      .then((res) => {
      if(pageNo > 1){
        let arr = [...data, ...res.data]
        setData(arr)
      }else{
        setData(res.data)
      }
    }).catch((err) => {
        alert("Failure")
    })
  }
  
  useEffect(() =>{
    getData()
  }, [])

 const firstEvent = (e) => {
		//console.log(e);
   e.preventDefault()
   
		var bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
		if(bottom){
			let pg = pageNo + 1;
			setPageNo(pg);
			getData();
		}
	}
	
  
  return (
    <div className="nft__container" onScroll={firstEvent}>
        <table className="nft__main-table-sections">
          <thead className="nft__th-section">
            <tr>
              <th>Title</th>
              <th>Photo</th>
            </tr>
          </thead>

          <tbody className="nft__tb-section">
            {
              data.map((item) =>{
                return(
                  <tr key={item.id}>
                     <td>{item.title}</td>
                     <td>
                       <img  className="nft__picture" src={item.thumbnailUrl} atl="meta-3D picture"/>
                    </td>
                 </tr>
                )
              })
            }   
          </tbody>
        </table>
    </div>
  )
}

export default Nft