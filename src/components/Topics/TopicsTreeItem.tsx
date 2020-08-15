import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TopicsTreeIcon from "./TopicsTreeIcon";

import { RenderItemParams, TreeItem } from "@atlaskit/tree";

type TopicsTreeItemProps = {
  itemParams: RenderItemParams;
  onItemSelect: (item: TreeItem) => void;
};

const TopicsTreeItem: React.FC<TopicsTreeItemProps> = (props) => {
  const { itemParams, onItemSelect } = props;
  const { item, provided } = itemParams;

  const text = item?.data.title || "";

  return (
    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <ListItem button aria-label={`select ${text} topic`}>
        <TopicsTreeIcon {...itemParams} />
        <ListItemText primary={text} onClick={() => onItemSelect(item)} />
      </ListItem>
    </div>
  );
};

export default TopicsTreeItem;
