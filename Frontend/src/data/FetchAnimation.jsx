import { useEffect, useState } from "react";
import StaticModelMouvement from "../animation/staticModelMouvement";
import BuildPrompt from   './BuildPrompt'
const FetchAnimation = ({ inputAnimation }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading , setLoading] = useState(true);

  const getAnimation = async () => {
    try {
      const reqScriptAnimation = BuildPrompt(inputAnimation);
      const response = await fetch('http://localhost:3000/api/generate-animation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({prompt : reqScriptAnimation})
      });
      if (!response.ok) {
        throw new Error("error fetching data");
      }
      const dataj = await response.json();
      
      setData(dataj.result);
      setError(false); 
    } catch (err) {
      setError(true); 
      console.error("Fetch failed:", err);
    }
      finally{
        setLoading(false);
      }
  };

  useEffect(() => {
  
         getAnimation();
  
  }, [inputAnimation]);

  if (error) return <h5>Error occurred while fetching animation</h5>;
  if(loading) return <h5>generating the animation . . .</h5>
  return (
    <div>
       <StaticModelMouvement data={data}/>
    </div>
  );
};

export default FetchAnimation;
