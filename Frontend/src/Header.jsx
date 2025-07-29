import './App.css'
import "./index.css";

const Header = ()=>{
return(
    <header>
      <nav className="flex justify-between items-center px-10 py-6 border-b border-purple-600">
        <div className="text-xl font-extrabold tracking-widest neon-text cursor-pointer">
        PHYSIFLOW     
         </div>
        <ul className="flex space-x-12 uppercase text-sm tracking-wide">
         
          <li className="cursor-pointer neon-hover">v.1.0</li>
        </ul>
      </nav>
    </header>
)
}

export default Header