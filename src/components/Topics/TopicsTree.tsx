import React from "react";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Tree, {
  mutateTree,
  moveItemOnTree,
  RenderItemParams,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition,
} from "@atlaskit/tree";

import treeData from "./treeData";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    treeItem: {},
    treeItemIcon: {
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

const TreeDot: React.FC<{}> = () => {
  // OPTIMIZE: add collapse and extension animations
  const classes = useStyles();

  return (
    <ListItemIcon className={classes.treeItemIcon}>
      <span className={classes.dot}>&bull;</span>
    </ListItemIcon>
  );
};

const TreeIcon: React.FC<RenderItemParams> = (props) => {
  const classes = useStyles();
  const { item, onExpand, onCollapse } = props;

  const areaLabel = item.isExpanded ? "collapse" : "expand";

  const onClick = () => {
    item.isExpanded ? onCollapse(item.id) : onExpand(item.id);
  };

  return (
    <ListItemIcon onClick={onClick} aria-label={areaLabel} className={classes.treeItemIcon}>
      {item.isExpanded ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
    </ListItemIcon>
  );
};

const TopicsTree = () => {
  const [tree, setTree] = React.useState(treeData);

  const classes = useStyles();
  const theme = useTheme();

  const renderItem = React.useCallback((props: RenderItemParams) => {
    const { item, provided } = props;
    const text = item.data ? item.data.title : "";
    const hasChildren = item.children && item.children.length > 0;
    return (
      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <ListItem className={classes.treeItem} button>
          {hasChildren ? <TreeIcon {...props} /> : <TreeDot />}
          <ListItemText primary={text} />
        </ListItem>
      </div>
    );
  }, []);

  const onExpand = React.useCallback(
    (itemId: ItemId) => {
      setTree(mutateTree(tree, itemId, { isExpanded: true }));
    },
    [tree]
  );

  const onCollapse = React.useCallback(
    (itemId: ItemId) => {
      setTree(mutateTree(tree, itemId, { isExpanded: false }));
    },
    [tree]
  );

  const onDragEnd = React.useCallback(
    (source: TreeSourcePosition, destination?: TreeDestinationPosition) => {
      if (!destination) {
        return;
      }
      const newTree = moveItemOnTree(tree, source, destination);
      setTree(newTree);
    },
    [tree]
  );

  return (
    <Tree
      tree={tree}
      renderItem={renderItem}
      onExpand={onExpand}
      onCollapse={onCollapse}
      onDragEnd={onDragEnd}
      offsetPerLevel={theme.spacing(3)}
      isDragEnabled
      isNestingEnabled
    />
  );
};

export default TopicsTree;
