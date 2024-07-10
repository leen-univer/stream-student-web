import {
  Call,
  ChevronRight,
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  Place,
  Twitter,
} from "@mui/icons-material";
import { useAppContext } from "contexts";
import { footerContent } from "locale";
import Link from "next/link";

import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";

type FooterDatatype = {
  _id: number;
  header?: string;
  path?: string;
  categoryData?: string;
  topCoursesData?: string;
  content: { _id: string; name: string; courseName?: string }[];
};
const Footer = ({ footerBgColor }: { footerBgColor?: string }) => {
  const { data: categoryData, isValidating: categoryValidating } = useSWRAPI(
    "contact/all-category"
  );

  const { data: topCoursesData, isValidating: topCoursesValidating } =
    useSWRAPI("student/top-course");
  const { selectedLanguage } = useAppContext();
  const FooterData: FooterDatatype[] = [
    {
      _id: 1,
      header: footerContent(selectedLanguage).Category,
      content: categoryData?.data?.data?.length ? categoryData?.data?.data : [],
    },
    {
      _id: 2,
      header: footerContent(selectedLanguage).TopCourses,
      content: topCoursesData?.data?.data?.length
        ? topCoursesData?.data?.data
        : [],
    },
  ];
  const router = useRouter();
  return (
    <section className={`${footerBgColor}`}>
      <footer className="bg-primary pt-10 md:pt-20 md:rounded-tl-[180px] text-white rounded-tl-3xl">
        <article className="main-container w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          <div>
            <img className="w-3/4" src="/main_logo_2.png" alt="logo" />
            <p className="pt-4">
              {footerContent(selectedLanguage).description}
            </p>
          </div>

          {FooterData?.map((item) => (
            <div key={item._id} className="flex flex-col">
              <p className="text-2xl md:text-3xl font-semibold pb-3">
                {item?.header}
              </p>
              <div className="w-full flex items-center gap-2 pb-3">
                <span className="w-[15%] h-0.5 rounded-2xl bg-white"></span>
                <span className="w-[7%] h-0.5 rounded-2xl bg-white"></span>
                <span className="w-1 h-1 rounded-2xl bg-white"></span>
              </div>
              <div className="flex flex-col gap-2 w-fit">
                {item?.content?.slice(0, 5).map((data) => (
                  <div
                    onClick={() => {
                      data?.courseName
                        ? router.push(`/courses/${data?._id}`)
                        : router.push(`/courses`);
                    }}
                    key={data?._id}
                  >
                    <p className="flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-secondary">
                      <span>
                        <ChevronRight />
                      </span>
                      <span>{data?.name || data?.courseName}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-semibold rounded-md pb-3">
              {footerContent(selectedLanguage).Contacts}
            </h1>
            <div className="w-full flex items-center gap-2 pb-3">
              <span className="w-[15%] h-0.5 rounded-2xl bg-white"></span>
              <span className="w-[7%] h-0.5 rounded-2xl bg-white"></span>
              <span className="w-1 h-1 rounded-2xl bg-white"></span>
            </div>
            <a href="tel:+9716367690002" className="flex items-center gap-1.5">
              <Call fontSize="small" /> {footerContent(selectedLanguage).phone}
            </a>
            <a
              href="mailto:Info@streamstudent.io"
              className="flex items-center gap-1.5"
            >
              <Email fontSize="small" /> {footerContent(selectedLanguage).email}
            </a>
            <p className="flex items-start gap-1.5">
              <Place fontSize="small" />{" "}
              {footerContent(selectedLanguage).address}
            </p>
          </div>
        </article>
        <article className="main-container flex md:flex-row flex-col md:justify-between items-center gap-4 border-t py-7">
          <div className="flex md:justify-end justify-center items-center gap-2 text-whit">
            <a
              href="#"
              className="cursor-pointer"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="grid place-items-center w-10 h-10 rounded-full common-transition hover:text-facebook hover:bg-white">
                <Facebook fontSize="small" className="!text-2xl" />
              </span>
            </a>

            <a
              href="#"
              className="cursor-pointer"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="grid place-items-center w-10 h-10 rounded-full common-transition hover:text-instagram hover:bg-white">
                <Instagram fontSize="small" className="!text-2xl" />
              </span>
            </a>

            <a
              href="#"
              className="cursor-pointer"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="grid place-items-center w-10 h-10 rounded-full common-transition hover:text-twitter hover:bg-white">
                <Twitter fontSize="small" className="!text-2xl" />
              </span>
            </a>

            <a
              href="#"
              className="cursor-pointer"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="grid place-items-center w-10 h-10 rounded-full common-transition hover:text-linkedin hover:bg-white">
                <LinkedIn fontSize="small" className="!text-2xl" />
              </span>
            </a>
          </div>
          <p className="text-base">
            &copy; {new Date().getFullYear()}{" "}
            {footerContent(selectedLanguage).copyright}
          </p>
        </article>
      </footer>
    </section>
  );
};

export default Footer;
