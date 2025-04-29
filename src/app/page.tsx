"use client";

import { useEffect, useState } from "react";

// Define the shape of a Cat image object returned by the API
type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
};

//define Fact
type Fact = {
  fact: string;
  length: number;
};

const Cats = () => {
  // useState hook to store the list of cat images
  const [catImages, setCatImages] = useState<Cat[]>([]);
  const [catFact, setCatFact] = useState('');
  // const [showFact, setShowFact] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);

  // Function to fetch cat data from thecatapi.com
  const getCatData = async () => {
    try {
      const url = "https://api.thecatapi.com/v1/images/search?limit=10"; // Ask the API for 10 random cat images
      const response = await fetch(url); // Make the API request

      // If the response is not OK (status code 200), throw an error
      if (response.status !== 200) {
        throw new Error(`Response status: ${response.status}`);
      }

      // Parse the response JSON into an array of Cat objects
      const json: Cat[] = await response.json();

      // Log the result to the browser console for debugging
      console.log(json);

      // Return the list of cat images
      return json;
    } catch (error: any) {
      // If something goes wrong, log the error and return an empty array
      console.error("Error fetching cat data:", error);
      return [];
    }
  };

  // Function to load and store cat images in state
  const getCatImage = async () => {
    const catResponse = await getCatData();

    // Even if more than 9 are returned, only keep the first 9
    setCatImages(catResponse.slice(0, 9));
  };

  useEffect(() => {
    // Run the image fetching function when the component mounts
    getCatImage();
  }, []); // Empty dependency array = run only once on mount

  useEffect(() => {
    // Function to fetch cat facts
    const getCatFactData = async () => {

      try {
        const url = "https://catfact.ninja/fact"; // Ask the API for a random cat fact
        const response = await fetch(url); // Make the API request

        // If the response is not OK (status code 200), throw an error
        if (response.status !== 200) {
          throw new Error(`Response status: ${response.status}`);
        }

        // Parse the response JSON into an array of Cat objects
        const jsonFact: Fact = await response.json();

        // Log the result to the browser console for debugging
        console.log(jsonFact.fact);

        // Return the list of cat images
        return jsonFact;
      } catch (error: any) {
        // If something goes wrong, log the error and return an empty array
        console.error("Error fetching fact:", error);
        return { fact: '', length: 0 };
      }
    };

    // Function to load and store cat images in state
    const getCatFact = async () => {
      setCatFact('Loading...');
      const catFactResponse = await getCatFactData();
      setCatFact(catFactResponse.fact);
    };

    // Run the image fetching function when the component mounts
    getCatFact();
  }, [selectedCatId]); // Empty dependency array = run only once on mount

  return (
    <div className="ysti">
      {catImages.length === 0 ? (
        <div className="p-20">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid-container">
          {/* Render each cat image inside a div */}
          {catImages.map((im, index) => (
            <div
              className="grid-item"
              key={im.id}
              onClick={() => {
                setSelectedCatId(im.id);
                const facturl = im.url;
              }}
            >
              <img src={im.url} alt={`cat ${index}`} />
              {/* {showFact && <ChildFact />} */}
              {selectedCatId === im.id && (
                <div className="grid-item-fact">
                  {catFact}
                </div>)}
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={getCatImage}
      >
        More cat images
      </button>
    </div>
  );
};

export default Cats;