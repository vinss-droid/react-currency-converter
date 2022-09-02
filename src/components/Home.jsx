import CurrencyImg from '../images/currency-new.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container user-select-none text-white">
        <div className="row justify-content-center mt-2">
            <div className="col-sm-12 col-md-12 col-lg-6">
                <h1 className="text-center fw-bold line-space-title text-title">
                    Change the currency you want now!
                </h1>
                <div className="d-flex justify-content-center mt-4">
                    <Link to="/convert" className='btn btn-get-started'>
                        Get Started
                    </Link>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
                <img src={CurrencyImg} alt={CurrencyImg} className="img-currency" width="100%" />
            </div>
        </div>
    </div>
  )
}

export default Home
