import React from 'react';


export const LoggedInView = props => {
  // uncomment
  // if (!props.currentUser.loggedIn) return null;

  return (
    <ul className="nav navbar-nav navbar-right">
      <li>
        <a href="">Мои заказы</a>
      </li>

      {/*<!-- Notifications -->*/}
      <li className="dropdown">
        <a href="" className="glyphicon glyphicon-bell"/>
      </li>

      <li className="dropdown">
        <a className="dropdown-toggle" data-toggle="dropdown" href="" id="profile">Профиль <span className="caret"/></a>
        <ul className="dropdown-menu" aria-labelledby="profile">
          <li><a href="/">Настройки</a></li>
          <li className="divider"/>
          <li><a href="/">Статистика</a></li>
        </ul>
      </li>
    </ul>
  );
};

export const GuestView = props => (
  // uncomment
  // if (props.currentUser.loggedIn) return null;

  <ul className="nav navbar-nav navbar-right">
    <li>
      <a href="#" onClick={props.onSignInModalRequestClick}>Войти</a>
    </li>

    <li>
      <a href="#" onClick={props.onSignUpModalRequestClick}>Регистрация</a>
    </li>
  </ul>
);


const Navbar = props => {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <a href="../" className="navbar-brand">Anon-lance</a>
          <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
        </div>
        <div className="navbar-collapse collapse" id="navbar-main">
          <ul className="nav navbar-nav">
            <li>
              <a href="/orders">Список всех заказов</a>
            </li>
            <li>
              <a href="/about">FAQ</a>
            </li>
          </ul>
          {props.children}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
