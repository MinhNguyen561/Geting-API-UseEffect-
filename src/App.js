import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {


  const [selectedTab, setSelectedTab] = useState(''); // State to track the selected tab
  const [apiResponse, setApiResponse] = useState(''); // State to store the API response
  const [contentVisible, setContentVisible] = useState(false);

  // Define API URLs for each button
  const apiUrls = {
    post: 'https://jsonplaceholder.typicode.com/posts',
    comments: 'https://jsonplaceholder.typicode.com/comments',
    albums: 'https://jsonplaceholder.typicode.com/albums',
    photos: 'https://jsonplaceholder.typicode.com/photos',
    todos: 'https://jsonplaceholder.typicode.com/todos',
    users: 'https://jsonplaceholder.typicode.com/users',
  };

  // Function to handle button click and fetch API
  const handleButtonClick = async (tab) => {
    try {
      const response = await fetch(apiUrls[tab]);
      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
      setSelectedTab(tab);
    } catch (error) {
      console.error(`Error fetching ${tab} API:`, error);
      setApiResponse(`Error fetching ${tab} API.`);
      setSelectedTab('');
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      await handleButtonClick('post');
      setContentVisible(true);
    };

    fetchInitialData();
  }, []);
  
  const toggle = () => {
    setContentVisible(!contentVisible);
  };

  useEffect(() => {
    toggle();
  },[]);

  return (
    <div>
      <button type="button" onClick={toggle}>
          Toggle
        </button>
      <div className="button">
        {Object.keys(apiUrls).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleButtonClick(tab)}
            className={selectedTab === tab ? 'active' : ''}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* <div className={`content ${contentVisible ? 'visible' : 'hidden'}`}> */}
      <div className="content">
        {contentVisible?<pre>{apiResponse}</pre>:null
}
      </div>
    </div>
  );
};

export default App;
