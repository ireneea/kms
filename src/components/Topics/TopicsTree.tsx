import React from "react";
import { useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import Tree, {
  mutateTree,
  moveItemOnTree,
  ItemId,
  TreeData,
  TreeItem,
  TreeSourcePosition,
  TreeDestinationPosition,
} from "@atlaskit/tree";

import TopicsTreeItem from "./TopicsTreeItem";

import useAsync from "../../hooks/useAsync";
import { TopicsAPI } from "../../api/words";
import { TTopic } from "../../ts/appTypes";

const buildTopicsTree = (topics: TTopic[] = []): TreeData => {
  const rootItem: TreeItem = {
    id: "1",
    children: [],
    hasChildren: true,
    isExpanded: true,
    isChildrenLoading: false,
    data: {
      title: "root",
    },
  };
  const tree: TreeData = {
    rootId: rootItem.id,
    items: {},
  };

  topics.forEach((topic) => {
    if (topic.id) {
      const item: TreeItem = {
        id: topic.id,
        children: [],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: topic,
      };

      tree.items[topic.id] = item;
      rootItem.children.push(topic.id);
    }
  });

  tree.items[rootItem.id] = rootItem;

  return tree;
};

const TopicsTree = () => {
  const [tree, setTree] = React.useState(buildTopicsTree);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const topicsLoader = useAsync(TopicsAPI.getAll, {
    handleSuccess: (data) => setTree(buildTopicsTree(data)),
  });

  React.useEffect(() => {
    topicsLoader.execute();
  }, []);

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
          />
        </List>
      </Collapse>
    </>
  );
};

export default TopicsTree;
