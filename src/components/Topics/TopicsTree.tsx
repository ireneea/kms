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
import { useHistory } from "react-router-dom";

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
  // TODO: make tree draggable
  // TODO: make tree nestable
  const [tree, setTree] = React.useState(buildTopicsTree);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const topicsLoader = useAsync(TopicsAPI.getAll, {
    handleSuccess: (data) => setTree(buildTopicsTree(data)),
  });

  const history = useHistory();

  React.useEffect(() => {
    topicsLoader.execute();
    // this insures that the load is is triggered only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleSelectItem = (item: TreeItem) => {
    const id = `${item?.data.id || ""}`;
    if (id) {
      history.push(`/words/${id}`);
    }
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Topics" />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Tree
            tree={tree}
            renderItem={(itemParams) => <TopicsTreeItem itemParams={itemParams} onItemSelect={handleSelectItem} />}
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
