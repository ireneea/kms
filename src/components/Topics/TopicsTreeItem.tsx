import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TopicsTreeIcon from "./TopicsTreeIcon";

import { RenderItemParams } from "@atlaskit/tree";

const TopicsTreeItem: React.FC<RenderItemParams> = (props) => {
  const { item, provided } = props;
  const text = item.data ? item.data.title : "";
  return (
    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <ListItem button>
        <TopicsTreeIcon {...props} />
        <ListItemText primary={text} />
      </ListItem>
    </div>
  );
};

export default TopicsTreeItem;
