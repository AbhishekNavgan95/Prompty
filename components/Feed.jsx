'use client'

import React, { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {
        data.map((post) => (
          <PromptCard key={post?._id} post={post} handleTagClick={handleTagClick} />
        ))
      }
    </div>
  )
}


const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const handleSearch = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt', {cache: 'no-store'});
      const data = await response.json();
      setPosts(data);
    };
  
    fetchPosts();
  
    const interval = setInterval(fetchPosts, 5000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='feed '>
      <form onSubmit={handleSearch} className='relative w-full flex-center'>
        <input className='search_input peer' required type='text' placeholder='Search for a tag or a username' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed