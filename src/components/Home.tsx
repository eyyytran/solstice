import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='page home'>
            <h1>Andrea Tran</h1>
            <h2>Take Home Project for Solstice</h2>
            <div className='home-btn-container'>
                <Link to='/topsongs' className='primary-btn'>
                    Top Songs
                </Link>
                <Link to='/topsongs' className='secondary-btn'>
                    Top Artists
                </Link>
            </div>
        </div>
    )
}

export default Home
