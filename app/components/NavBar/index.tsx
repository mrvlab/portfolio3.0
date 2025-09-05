import React from 'react';
import { NavBar as NavBarType } from '@/sanity.types';

type INavBar = {
  block: NavBarType;
  index: number;
  header?: unknown;
};

const NavBar = ({ block }: INavBar) => {
  if (!block) return null;

  const { logo } = block;

  return (
    <section>
      <nav>
        <div className='logo'>{logo}</div>
      </nav>
    </section>
  );
};

export default NavBar;
