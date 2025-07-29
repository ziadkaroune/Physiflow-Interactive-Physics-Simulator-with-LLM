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
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Authorization': "Bearer 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",
          'Content-Type': 'application/json' },
         body: JSON.stringify({
      model: 'qwen/qwen3-coder:free',
      messages: [
        {
          role: 'user',
          content: reqScriptAnimation ,
        }
      ],
      temperature: 0.4,
      max_tokens: 500
    })
      });
      if (!response.ok) {
        throw new Error("error fetching data");
      }
      const dataj = await response.json();
      
      setData(dataj.choices[0].message.content);
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
