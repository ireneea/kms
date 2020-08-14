import React from "react";
import { useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import Tree, { mutateTree, moveItemOnTree, ItemId, TreeSourcePosition, TreeDestinationPosition } from "@atlaskit/tree";

import TopicsTreeItem from "./TopicsTreeItem";

import treeData from "./treeData";

const TopicsTree = () => {
  const [tree, setTree] = React.useState(treeData);

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  /** Events handlers */

  const handleClick = () => {
    setOpen(!open);
  };

  const handleExpand = React.useCallback(
    (itemId: ItemId) => {
      setTree(mutateTree(tree, itemId, { isExpanded: true }));
    },
    [tree]
  );

  const handleCollapse = React.useCallback(
    (itemId: ItemId) => {
      setTree(mutateTree(tree, itemId, { isExpanded: false }));
    },
    [tree]
  );

  const handleDragEnd = React.useCallback(
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
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Topics" />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Tree
            tree={tree}
            renderItem={TopicsTreeItem}
            onExpand={handleExpand}
            onCollapse={handleCollapse}
            onDragEnd={handleDragEnd}
            offsetPerLevel={theme.spacing(3)}
            isDragEnabled
            isNestingEnabled
          />
        </List>
      </Collapse>
    </>
  );
};

export default TopicsTree;
