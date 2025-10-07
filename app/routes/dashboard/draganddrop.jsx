import { useDrag, useDrop } from "react-dnd";

const ItemType = "BLOCK";

function DraggableBlock({ block, index, moveBlock }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    hover: (item) => {
      if (item.index !== index) {
        moveBlock(item.index, index);
        item.index = index;
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        background: "#fff",
        padding: "12px",
        marginBottom: "12px",
        border: "1px dashed #ccc",
        borderRadius: "8px",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {block.content}
    </div>
  );
}
