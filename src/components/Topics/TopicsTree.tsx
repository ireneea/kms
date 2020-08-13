import React, { Component } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Tree, {
  mutateTree,
  moveItemOnTree,
  RenderItemParams,
  TreeItem,
  TreeData,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition,
} from "@atlaskit/tree";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    treeItemIcon: {
      display: "inline-block",
      width: "16px",
      justifyContent: "center",
      cursor: "pointer",
    },
  })
);

const treeWithTwoBranches: TreeData = {
  rootId: "1",
  items: {
    "1": {
      id: "1",
      children: ["1-1", "1-2"],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: "root",
      },
    },
    "1-1": {
      id: "1-1",
      children: ["1-1-1", "1-1-2"],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: "First parent",
      },
    },
    "1-2": {
      id: "1-2",
      children: ["1-2-1", "1-2-2"],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: "Second parent",
      },
    },
    "1-1-1": {
      id: "1-1-1",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: "Child one",
      },
    },
    "1-1-2": {
      id: "1-1-2",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: "Child two",
      },
    },
    "1-2-1": {
      id: "1-2-1",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: "Child three",
      },
    },
    "1-2-2": {
      id: "1-2-2",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: "Child four",
      },
    },
  },
};

const PADDING_PER_LEVEL = 16;

const TreeItemIcon: React.FC<{ onClick?: () => void }> = (props) => {
  const classes = useStyles();
  const { onClick } = props;

  return (
    <span className={classes.treeItemIcon} onClick={onClick}>
      {props.children}
    </span>
  );
};

type State = {
  tree: TreeData;
};

const getIcon = (item: TreeItem, onExpand: (itemId: ItemId) => void, onCollapse: (itemId: ItemId) => void) => {
  if (item.children && item.children.length > 0) {
    return item.isExpanded ? (
      <TreeItemIcon onClick={() => onCollapse(item.id)}>-</TreeItemIcon>
    ) : (
      <TreeItemIcon onClick={() => onExpand(item.id)}>+</TreeItemIcon>
    );
  }
  return <TreeItemIcon>&bull;</TreeItemIcon>;
};

const TopicsTree = () => {
  const [tree, setTree] = React.useState(treeWithTwoBranches);

  const renderItem = React.useCallback(({ item, onExpand, onCollapse, provided }: RenderItemParams) => {
    return (
      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <span>{getIcon(item, onExpand, onCollapse)}</span>
        <span>{item.data ? item.data.title : ""}</span>
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
    <div style={{ marginLeft: 15 }}>
      <Tree
        tree={tree}
        renderItem={renderItem}
        onExpand={onExpand}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
        offsetPerLevel={PADDING_PER_LEVEL}
        isDragEnabled
      />
    </div>
  );
};

export default TopicsTree;
