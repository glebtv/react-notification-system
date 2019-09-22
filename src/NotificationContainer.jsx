import React from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';
import Constants from './constants';

class NotificationContainer extends React.Component {
  constructor(props) {
    super(props);
    this._style = {};
  }

  // eslint-disable-next-line
  UNSAFE_componentWillMount() {
    // Fix position if width is overrided
    this._style = this.props.getStyles.container(this.props.position);

    if (
      this.props.getStyles.overrideWidth
      && (this.props.position === Constants.positions.tc
        || this.props.position === Constants.positions.bc)
    ) {
      this._style.marginLeft = -(this.props.getStyles.overrideWidth / 2);
    }
  }

  render() {
    var notifications;

    if (
      [
        Constants.positions.bl,
        Constants.positions.br,
        Constants.positions.bc
      ].indexOf(this.props.position) > -1
    ) {
      this.props.notifications.reverse();
    }

    notifications = this.props.notifications.map((notification) => {
      return (
        <NotificationItem
          ref={ 'notification-' + notification.uid }
          key={ notification.uid }
          notification={ notification }
          getStyles={ this.props.getStyles }
          onRemove={ this.props.onRemove }
          noAnimation={ this.props.noAnimation }
          allowHTML={ this.props.allowHTML }
          children={ this.props.children }
        />
      );
    });

    return (
      <div
        className={ 'notifications-' + this.props.position }
        style={ this._style }
      >
        {notifications}
      </div>
    );
  }
}

NotificationContainer.propTypes = {
  position: PropTypes.string.isRequired,
  notifications: PropTypes.array.isRequired,
  getStyles: PropTypes.object,
  onRemove: PropTypes.func,
  noAnimation: PropTypes.bool,
  allowHTML: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default NotificationContainer;
