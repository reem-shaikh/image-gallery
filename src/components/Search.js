import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
import ImageList from './ImageList';
import InfiniteScroll from 'react-infinite-scroller';
import 'bootstrap/dist/css/bootstrap.min.css';
const Search = () => {
  //were using the useParams hook for setting the url for the query parameter 
  const [searchParams] = useSearchParams();
  //paste imageList as a state inside here 
  const [imageList, setImageList] = useState([]);

  const loadFunc = pageNo => {
    axios.get(`https://api.unsplash.com/search/photos/?query=${searchParams.get("q")}&page=${pageNo}&per_page=20&client_id=${process.env.REACT_APP_API_KEY}`)
    .then(response => setImageList(list => [...list, ...response.data.results] ));

  }
  return (
    <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true || false}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
      <ImageList images={imageList} />
    </InfiniteScroll>
  )
}

export default Search