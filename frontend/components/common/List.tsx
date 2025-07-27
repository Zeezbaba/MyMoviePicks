import React from "react";

interface ListProps {
  name: string;
  value: string;
}

const List: React.FC<ListProps> = ({ name, value }) => {
  return (
    <div>
      <span className="font-semibold">{name}</span>: <span className="text-gray-300">{value}</span>
    </div>
  );
};

export default List;
