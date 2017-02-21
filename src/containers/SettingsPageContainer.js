import React from "react";
import {connect} from "react-redux";
import {loadUserNotificationSettings, saveUserNotificationsSettings, updateUserNotificationsCategoriesSettings, unloadSettings} from "../actions/SettingsActions";
import {toastr} from 'react-redux-toastr';
import {Button, Checkbox} from 'react-bootstrap';
import shortid from "shortid";
import {categoriesListFetch, categoriesListUnload} from "../actions/CategoriesActions";

const mapStateToProps = state => ({
  ...state.settings,
  ...state.categories
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(loadUserNotificationSettings());
    dispatch(categoriesListFetch());
  },
  onSave: (settings) => {
    const action = saveUserNotificationsSettings(settings);
    action.onSuccess = () => {
      toastr.success('Настройки', 'Сохранено');
    };

    dispatch(action);
  },
  onUpdateCategories: (ev, category_id)=> dispatch(updateUserNotificationsCategoriesSettings(category_id, ev.target.checked)),
  onUnload: () => {
    dispatch(unloadSettings());
    dispatch(categoriesListUnload())
  }
});


class SettingsPageContainer extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="container">
        <header>
          <h3>Оповещения</h3>
        </header>
        <section>
          <h4>Категории</h4>
          <span className="help-block">Вам будут приходить уведомления о новых заказах в выбранных категориях</span>
          <ul className="list-inline">
          {
            this.props.notifications.categories && this.props.categories && this.props.categories.map(category => {
              return (
                <ul key={shortid.generate()} className="list-unstyled settings__categories">
                  <h5>{category.title}</h5>
                  {category.subcategories.map(subcategory => {
                    const checked = this.props.notifications.categories.indexOf(subcategory.id) !== -1;
                    return (
                      <li key={shortid.generate()}>
                        <Checkbox checked={checked ? 'checked': ''} onChange={(ev) => {this.props.onUpdateCategories(ev, subcategory.id)}}>
                          {subcategory.title}
                        </Checkbox>
                      </li>
                    )
                  })}
                </ul>
              );
            })
          }
          </ul>
          <Button onClick={() => this.props.onSave(this.props.notifications)}>Сохранить</Button>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPageContainer);
export { SettingsPageContainer as SettingsPageContainer};
