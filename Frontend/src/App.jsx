import { useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import './App.css'
import "./index.css";
import MouvementBalls from'./animation/MouvementBalls'
import NewtonsCradle from './animation/NewtonsCradle'
import Pendulum from './animation/Pendulum'
import FetchAnimation from './data/FetchAnimation'
function App() {
  const [selectanimationT, setSelectAnimationT] = useState("");
  const [inputAnimationT , setInputAnimationT] = useState("");
  const   [messgnotfound  , setMessagenotfound] = useState("");
  const [suggestion , setSuggestion] = useState(true);
 const [showData , setShowData] = useState(false);
 const [userInput , setUserInput] = useState("")
  function showAnimation(){
    
    if(inputAnimationT.trim().length > 0){
           setSelectAnimationT('');
           setSuggestion(false);
            setShowData(true);
            setUserInput(inputAnimationT);
    }
    else{
      setSelectAnimationT('');
      setMessagenotfound("Coming soon: This animation will be available in a future version");
      setSuggestion(true);
      setUserInput('');
      setShowData(false);
    }

  }
  const animationComponents = {
  MouvementBalls: <MouvementBalls />,
  NewtonsCradle : <NewtonsCradle />,
  Pendulum: <Pendulum />
};
  return (
    <>
     
 
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white font-sans flex flex-col">
    
    <Header />

      <main className="flex-grow flex justify-center items-center">
        <div className="w-1/2  h-[80vh] flex items-center justify-center">
              <div className='w-1/2 '>
                        <div className="relative w-full">
            <select
              onChange={(e) => setSelectAnimationT(e.target.value)}
              className="appearance-none w-full text-sm rounded-xl px-5 py-3 pr-10 bg-gray-900 bg-opacity-70 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 text-purple-100">
              <option>choose animation</option>
                    <option value="MouvementBalls">MouvementBalls - 2D</option>
                    <option value="NewtonsCradle">NewtonsCradle - 2D</option>
                    <option value="Pendulum">Pendulum - 2D</option>
            </select>

  <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-purple-300">
    ▼
  </div>  </div>
                      <h6 className='my-4 text-center'> or </h6>
                     <div className="flex w-full max-w-md mx-auto mt-6 gap-2">
  <textarea
    min={3}
    placeholder="Describe your animation"
    onChange={(e) => setInputAnimationT(e.target.value)}
    className="flex-1 rounded-xl px-4 py-3 bg-gray-900 bg-opacity-70 text-sm border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white placeholder-purple-400 shadow-md transition duration-200"
  />
  <button
    onClick={showAnimation}
    className="px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold shadow-md transition duration-200"
  >

  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-radar" viewBox="0 0 16 16">
  <path d="M6.634 1.135A7 7 0 0 1 15 8a.5.5 0 0 1-1 0 6 6 0 1 0-6.5 5.98v-1.005A5 5 0 1 1 13 8a.5.5 0 0 1-1 0 4 4 0 1 0-4.5 3.969v-1.011A2.999 2.999 0 1 1 11 8a.5.5 0 0 1-1 0 2 2 0 1 0-2.5 1.936v-1.07a1 1 0 1 1 1 0V15.5a.5.5 0 0 1-1 0v-.518a7 7 0 0 1-.866-13.847"/>
</svg>
  </button>
 
</div>
      {suggestion && (
      <div className='text-sm mt-6'>
        <p>suggestion :</p>
        <p>two balls of different masses collide on a frictionless surface</p>
        </div>

        )}
              </div>
        </div>
        <div className='w-1/2  h-[80vh] flex justify-center items-center'>

              <div className='w-[400px] h-[400px] bg-black rounded-lg flex items-center justify-center'>
                {animationComponents[selectanimationT] || showData && <FetchAnimation key={userInput} inputAnimation={userInput}/> }
              </div>

        </div>
      </main>

    
    <Footer />
    </div>
 
    </>
  )
}

export default App
