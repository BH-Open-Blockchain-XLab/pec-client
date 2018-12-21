import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const pages = [
  {
    name: 'Account',
    link: '/account/'
  },
  {
    name: 'Buy',
    link: '/buy/',
  },
  {
    name: 'Sell',
    link: '/sell/',
  },
];

class TabBar extends React.Component {
  constructor(props) {
    super(props); 
  }

  render() {
    const props = this.props;
  
    return (
      <div class="panel-nav">
        <ul class="tab tab-block bg-white">
          {pages.map(
            (page) => {
              return (
                <li class={props.active == page.name ? ("tab-item active") : ("tab-item")>
                  <Link to={page.link}>{page.name}</a>
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  }
}

TabBar.propTypes = {
  active: PropTypes.string.isRequired,
};
