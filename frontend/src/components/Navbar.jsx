import React, { useState } from 'react';
import NavbarItem from './NavbarItem'; // The items within the Navbar
import { Flipper } from 'react-flip-toolkit'; // For the smooth animation
import DropdownContainer from './DropdownContainer'; // For the dropdowns

// Example Dropdown Components (you can replace these with your own)
import DevelopersDropdown from './DropdownContents/DevelopersDropdown';
import ResourcesDropdown from './DropdownContents/ResourcesDropdown';
import PricingDropdown from './DropdownContents/PricingDropdown';

const navbarConfig = [
  { title: 'Pricing', dropdown: PricingDropdown },
  { title: 'Developers', dropdown: DevelopersDropdown },
  { title: 'Resources', dropdown: ResourcesDropdown }
];

const AnimatedNavbar = () => {
  const [activeIndices, setActiveIndices] = useState([]);
  const [animatingOut, setAnimatingOut] = useState(false);
  let animatingOutTimeout;

  const resetDropdownState = (i) => {
    setActiveIndices(typeof i === 'number' ? [i] : []);
    setAnimatingOut(false);
    clearTimeout(animatingOutTimeout);
  };

  const onMouseEnter = (i) => {
    if (animatingOutTimeout) {
      clearTimeout(animatingOutTimeout);
      resetDropdownState(i);
      return;
    }
    if (activeIndices[activeIndices.length - 1] === i) return;
    setActiveIndices((prevIndices) => prevIndices.concat(i));
    setAnimatingOut(false);
  };

  const onMouseLeave = () => {
    setAnimatingOut(true);
    animatingOutTimeout = setTimeout(() => resetDropdownState(), 300);
  };

  const currentIndex = activeIndices[activeIndices.length - 1];
  const prevIndex = activeIndices.length > 1 && activeIndices[activeIndices.length - 2];

  let CurrentDropdown;
  let PrevDropdown;
  let direction;

  if (typeof currentIndex === 'number') CurrentDropdown = navbarConnfig[currentIndex].dropdown;
  if (typeof prevIndex === 'number') {
    PrevDropdown = navbarConfig[prevIndex].dropdown;
    direction = currentIndex > prevIndex ? 'right' : 'left';
  }

  return (
    <Flipper flipKey={currentIndex} spring={{ stiffness: 10, damping: 10 }}>
      <nav className="navbar" onMouseLeave={onMouseLeave}>
        {navbarConfig.map((n, index) => (
          <NavbarItem
            key={n.title}
            title={n.title}
            index={index}
            onMouseEnter={onMouseEnter}
          >
            {currentIndex === index && (
              <DropdownContainer direction={direction} animatingOut={animatingOut}>
                <CurrentDropdown />
                {PrevDropdown && <PrevDropdown />}
              </DropdownContainer>
            )}
          </NavbarItem>
        ))}
      </nav>
    </Flipper>
  );
};

export default AnimatedNavbar;
