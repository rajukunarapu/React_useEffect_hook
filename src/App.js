import { useEffect,useState } from "react";

function App(){
  return(
    <>
      <Timer/>
      <Delay/>
      <WindowSize/>
      <WebSocketComponent/>
    </>
  )
}

export default App;


//1.setInterval

function Timer() {

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup function: clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []); // Runs once when the component mounts, and cleans up on unmount

  return (
    <div>
      <p>Time: {time} seconds</p>
    </div>
  );
}

//2.setTimeout

function Delay(){

  let [message,setMessage] = useState('')

  let timeDelay = useEffect(()=>{
    setTimeout(()=>{
      setMessage(`The message is 3 seconds delay`)
    },3000)

    clearTimeout(timeDelay)
  })

  return(
    <>
      <h1>{message}</h1>
    </>
  )
}


//3.Subscribing an event

function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Subscribe to window resize events
    const handleResize = () => {
      setWidth(window.innerWidth); // Update the width state on resize
    };

    window.addEventListener('resize', handleResize); // Subscription

    // Cleanup function to unsubscribe
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>Window Width: {width}</h1>
    </div>
  );
}

//4.web socket

function WebSocketComponent() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('wss://echo.websocket.org'); // Replace with your WebSocket server
    console.log(socket)

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Failed to connect to the WebSocket server.');
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Messages:</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
}


