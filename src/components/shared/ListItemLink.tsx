import React from "react";

import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";

interface ListItemLinkProps {
  secondaryAction?: {
    icon: React.ReactNode;
    actionName: string;
    onClick: () => void;
    disabled?: boolean;
  };

  icon?: React.ReactNode;
  primary: string;
  secondary?: string;
  to: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = (props) => {
  const { icon, primary, to, secondary, secondaryAction } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  // OPTIMIZE: check if this function should useCallback to improve performance
  const renderSecondAction = () => {
    if (!secondaryAction) {
      return null;
    }

    const { icon, actionName, onClick } = secondaryAction;

    return (
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label={actionName} onClick={onClick}>
          {icon}
        </IconButton>
      </ListItemSecondaryAction>
    );
  };

  // OPTIMIZE: check if this function should useCallback to improve performance
  const renderListItem = () => (
    <ListItem button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} secondary={secondary} />
      {renderSecondAction()}
    </ListItem>
  );

  return secondaryAction ? renderListItem() : <li>{renderListItem()}</li>;
};

export default ListItemLink;
