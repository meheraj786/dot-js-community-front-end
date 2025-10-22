import React from 'react'
import Sidebar from '../components/Sidebar'
import PostCreator from '../components/PostCreator'
import FeedSection from '../components/FeedSection'

const Home = () => {
  return (
    <>
    <Sidebar/>
    <PostCreator/>
    <FeedSection/>
    </>
  )
}

export default Home