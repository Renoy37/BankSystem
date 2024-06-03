import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Card } from "antd";


function Menu() {

  return (
    <div className='menu-section'>
        <>
        <Navbar />

      <div className='home-img-container'>
          <div>
            <img
              src={'https://www.gtai.de/resource/image/781196/fitImage/1340/754/7add8855f7320f870e40976a88931027/152E4914C18AFAAFF7B0045907E52F96/rf-adobe-185719079-rz-1340x754.jpg'}
              alt="Banking Services"
              className='bank_img' 
            />
          </div>
          <div>
            <p className='home-img-detals'>
              <h1>Coin Sage</h1>
              Welcome to our banking system! We are dedicated to providing you with the best possible experience. Our team of experts is here to assist you with all your banking needs. Whether you're looking to open a new account, manage your existing ones, or simply explore our wide range of services, we have got you covered.
              So why wait? Start your banking journey today and take advantage of all we have to offer.
            </p>
            <div className='details-container'>
              <div>
                <p>
                  <h1>Bank and Save</h1>
                  Explore our banking services, including savings accounts, checking accounts, and online banking features.
                </p>
                <p>
                  <h1>Home and Loans</h1>
                  Discover our home loan options, mortgage products, and tips for managing your home finances effectively.
                </p>
              </div>
             <div>
              <p>
                  <h1>Credit Cards</h1>
                  Learn about our credit card offerings, rewards programs, interest rates, and responsible credit card usage tips.
                </p>
                <p>
                  <h1>Personal Loans</h1>
                  Find out about our personal loan options, application process, eligibility criteria, and repayment terms.
                </p>
             </div>
            </div>
          </div>
      </div>


          <div className="card-container" >
            <Card
                title="Account Overview"
                bordered={false}
                style={{
                  width: '100%',
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
              <p className="card-description">Explore our banking services, including savings accounts, checking accounts, and online banking features.</p>
              <Link to="/details" className="menu-list">
                View Profile
                </Link>
              </Card>

              <Card
                title="Check Balance"
                bordered={true}
                style={{
                  width: '100%',
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
              <p className="card-description">Explore our banking services, including savings accounts, checking accounts, and online banking features.</p>
              <Link to="/details" className="menu-list">
                Savings Account
              </Link>
              </Card>

              <Card
                title="Deposit"
                bordered={true}
                style={{
                  width: '100%',
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
              <p className="card-description">Explore our banking services, including savings accounts, checking accounts, and online banking features.</p>
              </Card>

              <Card
                title="Withdraw"
                bordered={true}
                style={{
                  width: '100%',
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
              <p className="card-description">Explore our banking services, including savings accounts, checking accounts, and online banking features.</p>
              </Card>

              <Card
                title="Transfer"
                bordered={true}
                style={{
                  width: '100%',
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
              <p className="card-description">Explore our banking services, including savings accounts, checking accounts, and online banking features.</p>
              </Card>

           </div>
        <Footer />
        </>    
    </div>
  );
}

export default Menu;
