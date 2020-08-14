import React from "react";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Tree, {
  mutateTree,
  moveItemOnTree,
  RenderItemParams,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition,
} from "@atlaskit/tree";

import TopicsTreeIcon from "./TopicsTreeIcon";

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

const TopicsTree = () => {
  const [tree, setTree] = React.useState(treeData);

  const classes = useStyles();
  const theme = useTheme();

  const renderItem = React.useCallback((props: RenderItemParams) => {
    const { item, provided } = props;
    const text = item.data ? item.data.title : "";
    return (
      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <ListItem className={classes.treeItem} button>
          <TopicsTreeIcon {...props} />
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
