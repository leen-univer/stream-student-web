import { TutorCard } from "components/cards";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { PublicLayout } from "layouts";
import { useState } from "react";
import { TutorDataType } from "types/tutorCard";
const AllTutors = () => {
  const { selectedLanguage } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSWRAPI("contact/all-experience-tutor");
  const { data: categoryData } = useSWRAPI("contact/all-category-tutor");

  return (
    <PublicLayout
      title="All Courses | StreamStudent"
      footerBgColor="bg-primary/5"
    >
      <section className="bg-primary/5 py-8 md:py-16">
        <article className="relative main-container flex lg:flex-row flex-col justify-between gap-4 lg:gap-8">
          {/* <aside className="sticky top-[96px] w-1/4 h-fit hidden lg:flex flex-col gap-5 bg-white rounded-md p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
            <div className="w-full flex justify-between text-2xl font-semibold">
              <p>{tutorsContent(selectedLanguage).filters}</p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="flex items-center text-xl font-medium border-b text-primary pb-2">
                {tutorsContent(selectedLanguage).Categories}
              </p>
              <div className="w-full flex flex-col gap-3">
                {categoryData?.data?.data?.data.map((item: FilterCardType) => (
                  <FilterCard item={item} key={item._id} />
                ))}
              </div>
            </div>
          </aside> */}
          {/* 
          <aside className="lg:hidden w-full flex items-center justify-between text-xl font-semibold bg-white p-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md">
            <p>{tutorsContent(selectedLanguage).filters}</p>
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              <FilterList />
            </IconButton>
            <Drawer
              anchor="bottom"
              open={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <section className="h-[65vh] flex flex-col gap-4 p-4 overflow-hidden overflow-y-scroll">
                <div className="flex flex-col gap-4">
                  <p className="flex items-center text-xl font-medium border-b text-primary pb-2">
                    {tutorsContent(selectedLanguage).Categories}
                  </p>
                  <div className="w-full flex flex-col gap-3">
                    {categoryData?.data?.data?.data.map(
                      (item: FilterCardType) => (
                        <FilterCard item={item} key={item._id} />
                      )
                    )}
                  </div>
                </div>
              </section>
            </Drawer>
          </aside> */}

          <aside className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
            {data?.data?.data?.data?.map((item: TutorDataType) => (
              <TutorCard item={item} key={item._id} />
            ))}
          </aside>
        </article>
      </section>
    </PublicLayout>
  );
};

export default AllTutors;
