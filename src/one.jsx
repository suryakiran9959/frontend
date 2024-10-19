import { useEffect, useState } from "react";
import axios from "axios";
function One() {
  const [data, setData] = useState([]);
const [username,setUsername] =useState("")
const[password,setPassword]=useState("")


  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let result = await axios.get("http://localhost:9999/allusers");
    setData(result.data);
  }

  console.log(data);


async function addData(e){
e.preventDefault()
if(username.length>=1 && password.length>=1){
try{
let response = await axios.post("http://localhost:9999/adduser/",{
  name:username,
  password:password
})
console.log(response.data);
alert(response.data)
fetchData()
setUsername("")
setPassword("")
}catch(err){
  console.log(err);
  alert(err.response.data)
}
}else{
  alert("password and username should contain atleast 1 character")
}
}

return( 
  <div>  
  
  <h1>frontend to backend connection CRUD</h1> <hr /> <hr />

<form onSubmit={addData}>
<label>NAME:</label>
<input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} /> &nbsp;
<label>PASSWORD:</label>
<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /> &nbsp;
<button type="submit">ADD DATA</button> 
</form>
&nbsp;

    {
    data.length>=1 ? 
        data.map((one) => (
          <div key={one.id}>
          <span>{one.id}.</span> 
          <span>{one.name}</span> &nbsp; &nbsp; 
          <button>Update</button> <hr />
          </div>    
         ))
         :
    <h1>Loading...</h1>
    }
  </div>
)}
export default One;
