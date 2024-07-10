import {
  AddCircleOutline,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import { Drawer } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

type adminCategoryArrType = {
  _id: string;
  subtitle: string;
  courses: string;
};

const ADMIN_CATEGORY_ARR: adminCategoryArrType[] = [
  { _id: "1", subtitle: "Javascript", courses: "12" },
  { _id: "2", subtitle: "Python", courses: "15" },
  { _id: "3", subtitle: "Java", courses: "18" },
  { _id: "4", subtitle: "React", courses: "5" },
  { _id: "5", subtitle: "Typescript", courses: "10" },
  { _id: "6", subtitle: "Express", courses: "12" },
];

const AdminSubCategoryCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  return (
    <div>
      <article
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-full flex items-center justify-between gap-4 bg-white rounded-xl cursor-pointer overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] "
      >
        <section className="flex flex-col gap-2">
          <img
            className="w-32 h-32 object-cover"
            src="/Image/student_5.jpg"
            alt="category_image"
          />
        </section>
        <section className="p-2">
          <aside className="w-52 flex flex-col gap-1 py-2">
            <p className="lg:text-2xl font-bold text-primary">Programming</p>
            <p>12 courses</p>
          </aside>
        </section>

        <div className="absolute top-2 right-2 flex-col gap-5 text-primary hidden group-hover:block">
          <button className="w-8 h-8 grid place-items-center mb-2 rounded-full border border-blue-500 bg-blue-500/10 text-blue-500">
            <EditOutlined fontSize="small" />
          </button>
          <button className="w-8 h-8 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500">
            <DeleteOutline fontSize="small" />
          </button>
        </div>
      </article>

      {/* drawer section of subcategory card */}

      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <aside className="w-[23rem] lg:w-[30rem] flex flex-col gap-3 p-5 overflow-hidden overflow-y-scroll">
          <div className=" flex flex-col gap-5  px-8 py-2">
            <h1 className="flex items-center justify-center gap-3 text-3xl font-bold text-primary">
              Programming
            </h1>

            <div className="w-full grid gap-5">
              {ADMIN_CATEGORY_ARR.map((item) => (
                <Link
                  href={`/admin/category/topic/${item?._id}`}
                  key={item._id}
                >
                  <div
                    key={item._id}
                    className="w-full flex items-center justify-between text-xl font-medium text-center px-5 py-3 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] cursor-pointer"
                  >
                    <p className="w-[20%] text-start">{item.subtitle}</p>
                    <span className="text-sm">{item.courses} Topics</span>
                    <div className="text-sm text-gray-600  flex items-center justify-center gap-5">
                      <DeleteOutline className="cursor-pointer hover:text-primary" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </Drawer>
    </div>
  );
};

export default AdminSubCategoryCard;
