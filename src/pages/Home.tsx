import Sidebar from '../components/Sidebar'
import PostCreator from '../components/PostCreator'
import FeedSection from '../components/FeedSection'
import RightSidebar from '../components/RightSidebar'

const Home = () => {
  return (
    <>
    <Sidebar/>
    <PostCreator/>
    <RightSidebar/>
    <FeedSection/>
    </>
  )
}

export default Home