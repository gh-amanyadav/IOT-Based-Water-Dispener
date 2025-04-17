import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import UserInfo from './UserInfo';
import YearlyReport from './Live_data';
import TotalReport from './Consumption';
import Profile from './Profile';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Arial, sans-serif';
  overflow: hidden;
  position: relative;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  background-color: #ffffff;
  height: calc(100vh - 60px);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 60px;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  transition: all 0.3s ease;
  z-index: 100;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 60px;
    left: 0;
    height: calc(100vh - 60px);
    z-index: 999;
    width: 250px;
  }
`;

const SidebarNav = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0;
  margin-bottom: 5px;
  align-items: center;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100vh - 60px);
  padding: 10px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f4f4f4;
  transition: margin-left 0.3s ease;
  margin-left: ${props => props.isSidebarOpen && props.isMobile ? '0' : '0'};

  @media (max-width: 768px) {
    padding: 5px;
    height: calc(100vh - 60px);
    -webkit-overflow-scrolling: touch;
    width: 100%;
  }
`;

const NavButton = styled.button`
  width: 100%;
  padding: 10px 0;
  margin-bottom: 0.5rem;
  background-color: ${props => props.active ? '#004080' : '#007bff'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
  font-weight: bold;
  position: relative;
  text-align: center;
  display: block;
  align-self: stretch;
  font-size: 14px;
  
  &:hover {
    background-color: #0056b3;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 8px 0;
    margin-bottom: 0.5rem;
    width: 90%;
  }
`;

const SignOutButton = styled.button`
  width: 100%;
  padding: 10px 0;
  margin-bottom: 0.5rem;
  background-color: #dc3545;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  text-align: center;
  display: block;
  
  &:hover {
    background-color: #c82333;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 8px 0;
    width: 90%;
  }
`;

const Overlay = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  transition: opacity 0.3s ease;
  opacity: ${props => props.isOpen ? '1' : '0'};
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.2s;
  
  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
  
  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const PageTitle = styled.h1`
  color: #007bff;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    margin-top: 0;
    font-size: 20px;
  }
`;

function Report() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('UserInfo');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Set page title based on active menu
  const getPageTitle = () => {
    switch(activeMenu) {
      case 'Profile': return 'Profile';
      case 'UserInfo': return 'User Information';
      case 'ConsumptionAnalysis': return 'Consumption Analysis';
      case 'LiveMenu': return 'Live Data';
      default: return 'Report';
    }
  };

  // Check if the screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isSidebarOpen]);

  // Set sidebar open by default on desktop
  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  const handleSignOut = async () => {
    dispatch(logout());
    navigate('/');
  };

  const handleButtonClick = (menu) => {
    setActiveMenu(menu);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container>
      <Overlay isOpen={isSidebarOpen && isMobile} onClick={() => setIsSidebarOpen(false)} />
      
      <MainContent>
        <Sidebar isOpen={isSidebarOpen}>
          <SidebarNav>
            <NavButton
              active={activeMenu === 'Profile'}
              onClick={() => handleButtonClick('Profile')}
              className="sidebar-button"
            >
              Profile
            </NavButton>
            <NavButton
              active={activeMenu === 'UserInfo'}
              onClick={() => handleButtonClick('UserInfo')}
              className="sidebar-button"
            >
              User Info
            </NavButton>
            <NavButton
              active={activeMenu === 'ConsumptionAnalysis'}
              onClick={() => handleButtonClick('ConsumptionAnalysis')}
              className="sidebar-button"
            >
              Consumption Analysis
            </NavButton>
            <NavButton
              active={activeMenu === 'LiveMenu'}
              onClick={() => handleButtonClick('LiveMenu')}
              className="sidebar-button"
            >
              Live Menu
            </NavButton>
            <SignOutButton
              onClick={handleSignOut}
              className="signout-button"
            >
              Sign Out
            </SignOutButton>
          </SidebarNav>
        </Sidebar>

        <Content isSidebarOpen={isSidebarOpen} isMobile={isMobile}>
          <PageTitle>{getPageTitle()}</PageTitle>
          {activeMenu === 'LiveMenu' && <YearlyReport />}
          {activeMenu === 'UserInfo' && <UserInfo />}
          {activeMenu === 'ConsumptionAnalysis' && <TotalReport />}
          {activeMenu === 'Profile' && <Profile />}
        </Content>
      </MainContent>
      
      <MobileMenuButton onClick={toggleSidebar}>
        {isSidebarOpen ? '×' : '☰'}
      </MobileMenuButton>
    </Container>
  );
}

export default Report;
