import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import { RenderItemParams, TreeItem } from "@atlaskit/tree";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 0,
    },
    dot: {
      fontSize: theme.typography.h6.fontSize,
      width: theme.spacing(2),
      justifyContent: "center",
      display: "flex",
    },
  })
);

enum IconType {
  DOT,
  COLLAPSED,
  EXPANDED,
}

const TreeDot: React.FC<{}> = (props) => {
  const classes = useStyles();

  return (
    <ListItemIcon className={classes.root}>
      <span className={classes.dot}>&bull;</span>
    </ListItemIcon>
  );
};

const TreeRightIcon: React.FC<RenderItemParams> = (props) => {
  const classes = useStyles();
  const { item, onExpand } = props;

  return (
    <ListItemIcon onClick={() => onExpand(item.id)} aria-label="expand" className={classes.root}>
      <KeyboardArrowRightIcon fontSize="small" />
    </ListItemIcon>
  );
};

const TreeDownIcon: React.FC<RenderItemParams> = (props) => {
  const classes = useStyles();
  const { item, onCollapse } = props;

  return (
    <ListItemIcon onClick={() => onCollapse(item.id)} aria-label="collapse" className={classes.root}>
      <KeyboardArrowDownIcon fontSize="small" />
    </ListItemIcon>
  );
};

const TopicsTreeIcon: React.FC<RenderItemParams> = (props) => {
  const { item } = props;

  const getIconType = (item: TreeItem): IconType => {
    let iconType = IconType.DOT;
    const hasChildren = item.children && item.children.length > 0;
    if (hasChildren) {
      iconType = item.isExpanded ? IconType.EXPANDED : IconType.COLLAPSED;
    }

    return iconType;
  };

  const iconType = getIconType(item);

  switch (iconType) {
    case IconType.DOT:
      return <TreeDot />;
    case IconType.COLLAPSED:
      return <TreeRightIcon {...props} />;
    case IconType.EXPANDED:
      return <TreeDownIcon {...props} />;
    default:
      return null;
  }
};

export default TopicsTreeIcon;
