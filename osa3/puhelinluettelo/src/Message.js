
const Style1={
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
}

const Style2={
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
}
const Message=({message})=>{
    if (message === null) {
        return null
      }
  
      if (message.includes("deleted")) {
        return (
          <div style={Style1}>
            {message}
          </div>
        )
      } 
      else {
        return (
          <div style={Style2}>
            {message}
          </div>
        )
      }
}

export default Message;
