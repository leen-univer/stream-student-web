import { FilterCardType } from "types/filterCard";

const FilterCard = ({ item }: { item: FilterCardType }) => {
  return (
    <div className="w-full">
      <label className="flex gap-2">
        <input type="checkbox" className="cursor-pointer" />
        {item?.name}
      </label>
    </div>
  );
};
export default FilterCard;
