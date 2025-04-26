import React, { useState } from 'react'
// import CameraComponent from './CameraComponent'
import AutoCameraRecorder from './AutoCameraRecorder'

const App = () => {
  const [items, setItems] = useState([{ text: "Tushar Tewari", checked: false }, { text: "Tushar Adhikari", checked: false }, { text: "Manish Joshi", checked: false }])

  const removebtn = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const togglebtn = (index) => {
    setItems(items.map((item, i) =>
      i === index ? { ...item, checked: (item.checked === false ? true : false) } : item
    )
    );
  }

  return (
    <>
      <h1 className="heading-top">Todo like aPP</h1><hr />
      <div className='header'>
        <ul>
          {
            items.map((item, index) => (
              <li key={index}>
                <input type="checkbox" checked={items.checked} onChange={() => togglebtn(index)} />
                {item.text}{
                  (item.checked === true) && (
                    <button onClick={() => removebtn(index)}>x</button>
                  )
                }
              </li>
            ))
          }
        </ul>
        <p>click on the link to access this page <a href="https://4hd2spn7-5173.inc1.devtunnels.ms/">https://4hd2spn7-5173.inc1.devtunnels.ms/</a>  </p>
        <div>
          {/* <CameraComponent/> */}
          <AutoCameraRecorder/>
        </div>
      </div >
    </>
  )
}

export default App