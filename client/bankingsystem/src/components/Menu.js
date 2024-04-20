import React from 'react';
import { Link } from 'react-router-dom';


function Menu() {

  return (
    <div className='menu-section'>

    <div class="card-container">
        <div class="card">
            <div class="card-content">
                <h2 class="card-title">Bank and Save</h2>
                <p class="card-description">Explore our banking services, including savings accounts, checking accounts, and online banking features.</p>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <h2 class="card-title">Home and Loans</h2>
                <p class="card-description">Discover our home loan options, mortgage products, and tips for managing your home finances effectively.</p>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <h2 class="card-title">Credit Cards</h2>
                <p class="card-description">Learn about our credit card offerings, rewards programs, interest rates, and responsible credit card usage tips.</p>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <h2 class="card-title">Personal Loans</h2>
                <p class="card-description">Find out about our personal loan options, application process, eligibility criteria, and repayment terms.</p>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <h2 class="card-title">Share Investments</h2>
                <p class="card-description">Explore investment opportunities in stocks, mutual funds, ETFs, and learn about investment strategies.</p>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <h2 class="card-title">More</h2>
                <p class="card-description">Discover additional financial services and resources, including budgeting tools, retirement planning, and insurance products.</p>
            </div>
        </div>
    </div>

     
      <ul className="menu-list">
      <h1>Menu</h1>
        <li className="menu-item">
          Account Overview
          <ul className="submenu">
            <li className="submenu-item">
              <Link to="/details" className="menu-list">
                View Profile
              </Link>
            </li>
            <li className="submenu-item">
            <Link to="/details" className="menu-list">
              Edit Profile
            </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item">
          Check Balance
          <ul className="submenu">
            <li className="submenu-item">
            <Link to="/details" className="menu-list">
              Savings Account
            </Link>
            </li>
            <li className="submenu-item">
            <Link to="/details" className="menu-list">
              Checking Account
            </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item">
          Withdraw
          <ul className="submenu">
            <li className="submenu-item" >ATM Withdrawal</li>
          </ul>
        </li>
        <li className="menu-item">
          Deposit
          <ul className="submenu">
            <li className="submenu-item" >ATM Deposit</li>
          </ul>
        </li>
        <li className="menu-item">
          Transfer
          <ul className="submenu">
            <li className="submenu-item" >Within Accounts</li>
          </ul>
        </li>
      </ul>
     
    </div>
  );
}

export default Menu;
