import React from "react";

import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  secondary?: string;
  to: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = (props) => {
  const { icon, primary, to, secondary } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
    </li>
  );
};

export default ListItemLink;
