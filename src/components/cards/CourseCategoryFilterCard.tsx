import { ChevronRight } from "@mui/icons-material";
import { Checkbox, Collapse } from "@mui/material";
import { useSWRAPI } from "hooks";
import { Dispatch, SetStateAction, useState } from "react";

const CourseCategoryFilterCard = ({
  item,
  setSelectedSubCategory,
  selectedSubCategory,
}: {
  item: any;
  setSelectedSubCategory: Dispatch<SetStateAction<string>>;
  selectedSubCategory?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full group">
      <label
        className="relative flex items-center gap-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`text-gray-600 common-transition ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <ChevronRight className="!text-lg" />
        </span>
        <span>{item?.name}</span>
      </label>

      <SubCategoryDetails
        isOpen={isOpen}
        item={item}
        setSelectedSubCategory={setSelectedSubCategory}
        selectedSubCategory={selectedSubCategory}
      />
    </div>
  );
};
export default CourseCategoryFilterCard;

const SubCategoryDetails = ({
  isOpen,
  item,
  setSelectedSubCategory,
  selectedSubCategory,
}: {
  isOpen?: boolean;
  item?: any;
  setSelectedSubCategory?: Dispatch<SetStateAction<string>>;
  selectedSubCategory?: string;
}) => {
  const {
    data: subCategoryData,
    isValidating,
    mutate,
  } = useSWRAPI(`category/getAllSubCategory?categoryId=${item?._id}`);

  return (
    <div>
      {subCategoryData?.data?.data?.data.length >= 1 && (
        <Collapse in={isOpen}>
          <section className="flex flex-col gap-4  pl-8 overflow-hidden overflow-y-scroll ">
            <div className="w-full flex flex-col gap-1">
              {subCategoryData?.data?.data?.data.map((subItem: any) => (
                <div
                  className="w-full flex gap-2 items-center "
                  key={subItem?._id}
                >
                  <Checkbox
                    size="small"
                    checked={selectedSubCategory === subItem?._id}
                    onClick={() => {
                      if (setSelectedSubCategory) {
                        setSelectedSubCategory((prev) =>
                          prev === subItem?._id ? "" : subItem?._id
                        );
                      }
                    }}
                  />
                  <h3 className="font-medium tracking-wide text-sm">
                    {subItem?.name}
                  </h3>
                </div>
              ))}
            </div>
          </section>
        </Collapse>
      )}
    </div>
  );
};
