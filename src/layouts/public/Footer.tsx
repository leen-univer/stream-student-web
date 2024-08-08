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
      <footer className="text-white footer">
        <article className="main-container w-full flex justify-between">
          <div className="lg:w-1/4 md:w-full">
            <div>
              <img className="w-[143px]" src="/main_logo_2.png" alt="logo" />
              <p className="pt-4">
                {footerContent(selectedLanguage).description}
              </p>
            </div>
            <div className="social-media">
              <article className="main-container flex md:flex-row flex-col md:justify-between items-center">
                <div className="flex md:justify-end justify-center items-center gap-[12px] text-whit">
                  <a
                    href="#"
                    className="cursor-pointer"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="grid place-items-center social-icon common-transition">
                      <svg
                        width="46"
                        height="46"
                        viewBox="0 0 46 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="46"
                          height="46"
                          fill="#363B47"
                          fill-opacity="0.4"
                        />
                        <path
                          d="M25.3575 16.9887H27.0008V14.1267C26.7172 14.0878 25.7423 14 24.6068 14C22.2375 14 20.6145 15.4902 20.6145 18.2292V20.75H18V23.9495H20.6145V32H23.82V23.9503H26.3288L26.727 20.7508H23.8193V18.5465C23.82 17.6217 24.069 16.9887 25.3575 16.9887Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </a>

                  <a
                    href="#"
                    className="cursor-pointer"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="grid place-items-center social-icon common-transition">
                      <svg
                        width="46"
                        height="46"
                        viewBox="0 0 46 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="45.9965"
                          height="45.9999"
                          fill="#363B47"
                          fill-opacity="0.4"
                        />
                        <path
                          d="M31.9507 19.292C31.9086 18.3356 31.7539 17.6781 31.5324 17.1084C31.3038 16.5036 30.9522 15.9621 30.4915 15.512C30.0414 15.0549 29.4963 14.6997 28.8986 14.4747C28.3255 14.2531 27.6714 14.0985 26.715 14.0563C25.7515 14.0106 25.4456 14 23.0017 14C20.5579 14 20.252 14.0106 19.292 14.0527C18.3356 14.0949 17.6781 14.2497 17.1085 14.4711C16.5036 14.6997 15.9621 15.0513 15.512 15.512C15.0549 15.9621 14.6998 16.5072 14.4747 17.1049C14.2531 17.6781 14.0985 18.3321 14.0563 19.2885C14.0106 20.252 14 20.5579 14 23.0018C14 25.4456 14.0106 25.7515 14.0527 26.7115C14.0949 27.6679 14.2497 28.3254 14.4713 28.8952C14.6998 29.4999 15.0549 30.0414 15.512 30.4915C15.9621 30.9486 16.5072 31.3038 17.1049 31.5288C17.6781 31.7504 18.3321 31.905 19.2886 31.9472C20.2484 31.9895 20.5545 31.9999 22.9983 31.9999C25.4421 31.9999 25.748 31.9895 26.708 31.9472C27.6644 31.905 28.3219 31.7504 28.8916 31.5288C30.1012 31.0611 31.0577 30.1047 31.5254 28.8952C31.7468 28.322 31.9016 27.6679 31.9437 26.7115C31.9859 25.7515 31.9965 25.4456 31.9965 23.0018C31.9965 20.5579 31.9929 20.252 31.9507 19.292ZM30.3298 26.6411C30.2911 27.5202 30.1434 27.9949 30.0203 28.3114C29.7179 29.0956 29.0955 29.7179 28.3114 30.0204C27.9949 30.1434 27.5168 30.2911 26.6411 30.3297C25.6917 30.372 25.407 30.3824 23.0053 30.3824C20.6037 30.3824 20.3153 30.372 19.3694 30.3297C18.4903 30.2911 18.0156 30.1434 17.6991 30.0204C17.3089 29.8761 16.9537 29.6476 16.6654 29.3487C16.3665 29.0568 16.1379 28.7052 15.9937 28.315C15.8706 27.9985 15.723 27.5202 15.6844 26.6447C15.6421 25.6953 15.6316 25.4104 15.6316 23.0088C15.6316 20.6071 15.6421 20.3188 15.6844 19.373C15.723 18.4939 15.8706 18.0192 15.9937 17.7027C16.1379 17.3123 16.3665 16.9573 16.669 16.6688C16.9607 16.3699 17.3123 16.1414 17.7027 15.9973C18.0192 15.8742 18.4974 15.7266 19.3729 15.6878C20.3223 15.6457 20.6072 15.6351 23.0087 15.6351C25.414 15.6351 25.6987 15.6457 26.6447 15.6878C27.5238 15.7266 27.9985 15.8742 28.3149 15.9973C28.7052 16.1414 29.0604 16.3699 29.3487 16.6688C29.6476 16.9607 29.8761 17.3123 30.0203 17.7027C30.1434 18.0192 30.2911 18.4973 30.3298 19.373C30.372 20.3224 30.3826 20.6071 30.3826 23.0088C30.3826 25.4104 30.372 25.6917 30.3298 26.6411Z"
                          fill="white"
                        />
                        <path
                          d="M23.0019 18.3774C20.4491 18.3774 18.3779 20.4485 18.3779 23.0014C18.3779 25.5543 20.4491 27.6253 23.0019 27.6253C25.5548 27.6253 27.6258 25.5543 27.6258 23.0014C27.6258 20.4485 25.5548 18.3774 23.0019 18.3774ZM23.0019 26.0008C21.3458 26.0008 20.0024 24.6576 20.0024 23.0014C20.0024 21.3452 21.3458 20.002 23.0019 20.002C24.6581 20.002 26.0013 21.3452 26.0013 23.0014C26.0013 24.6576 24.6581 26.0008 23.0019 26.0008Z"
                          fill="white"
                        />
                        <path
                          d="M28.8876 18.1952C28.8876 18.7913 28.4043 19.2747 27.808 19.2747C27.2119 19.2747 26.7285 18.7913 26.7285 18.1952C26.7285 17.5989 27.2119 17.1157 27.808 17.1157C28.4043 17.1157 28.8876 17.5989 28.8876 18.1952Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </a>

                  <a
                    href="#"
                    className="cursor-pointer"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="grid place-items-center social-icon ">
                      <svg
                        width="46"
                        height="46"
                        viewBox="0 0 46 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                         width="45.9965"
                         height="45.9999"
                         fill="#363B47"
                         fill-opacity="0.4"
                        />
                        <path
                          d="M31.992 32.0002V31.9994H31.9965V25.3979C31.9965 22.1684 31.3012 19.6807 27.5257 19.6807C25.7107 19.6807 24.4927 20.6767 23.9955 21.6209H23.943V19.9822H20.3632V31.9994H24.0907V26.0489C24.0907 24.4822 24.3877 22.9672 26.328 22.9672C28.2397 22.9672 28.2682 24.7552 28.2682 26.1494V32.0002H31.992Z"
                          fill="white"
                        />
                        <path
                          d="M14.2935 19.9829H18.0255V32.0002H14.2935V19.9829Z"
                          fill="white"
                        />
                        <path
                          d="M16.158 14C14.9647 14 13.9965 14.9683 13.9965 16.1615C13.9965 17.3548 14.9647 18.3433 16.158 18.3433C17.3512 18.3433 18.3195 17.3548 18.3195 16.1615C18.3187 14.9683 17.3505 14 16.158 14V14Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </a>

                  <a
                    href="#"
                    className="cursor-pointer"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="grid place-items-center social-icon common-transition ">
                      <svg
                        width="46"
                        height="46"
                        viewBox="0 0 46 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="46"
                          height="46"
                          transform="translate(-0.00350952)"
                          fill="#363B47"
                          fill-opacity="0.4"
                        />
                        <g clip-path="url(#clip0_466_10377)">
                          <path
                            d="M31.9965 17.7314C31.3271 18.025 30.6139 18.2196 29.8702 18.3141C30.6352 17.8574 31.2191 17.1396 31.4936 16.2745C30.7804 16.6997 29.9929 17.0001 29.1536 17.1678C28.4764 16.4466 27.5111 16 26.4581 16C24.4151 16 22.7704 17.6583 22.7704 19.6911C22.7704 19.9836 22.7951 20.2649 22.8559 20.5326C19.788 20.383 17.0734 18.9126 15.2497 16.6728C14.9314 17.2251 14.7446 17.8574 14.7446 18.538C14.7446 19.816 15.4027 20.9489 16.3837 21.6047C15.7909 21.5935 15.2092 21.4214 14.7165 21.1502C14.7165 21.1615 14.7165 21.1761 14.7165 21.1907C14.7165 22.984 15.9956 24.4735 17.673 24.8166C17.3726 24.8988 17.0452 24.9381 16.7055 24.9381C16.4692 24.9381 16.2307 24.9246 16.0069 24.8751C16.485 26.3365 17.8417 27.4109 19.455 27.4457C18.1995 28.4279 16.6054 29.0196 14.8796 29.0196C14.577 29.0196 14.2867 29.0061 13.9965 28.969C15.6311 30.0231 17.5684 30.625 19.6575 30.625C26.448 30.625 30.1605 25 30.1605 20.1242C30.1605 19.9611 30.1549 19.8036 30.147 19.6473C30.8794 19.1275 31.4947 18.4784 31.9965 17.7314Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_466_10377">
                            <rect
                              width="18"
                              height="18"
                              fill="white"
                              transform="translate(13.9965 14)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </a>
                </div>
              </article>
            </div>
          </div>

          <div className="contact-info">
            {FooterData?.map((item) => (
              <div key={item._id} className="flex flex-col footer-contact-cols">
                <h4 className="footer-col-title">{item?.header}</h4>

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

            <div className="flex flex-col gap-2 footer-contact-cols">
              <h4 className="footer-col-title">
                {footerContent(selectedLanguage).Contacts}
              </h4>

              <a
                href="tel:+9716367690002"
                className="flex items-center gap-1.5"
              >
                <Call fontSize="small" />{" "}
                {footerContent(selectedLanguage).phone}
              </a>
              <a
                href="mailto:Info@streamstudent.io"
                className="flex items-center gap-1.5"
              >
                <Email fontSize="small" />{" "}
                {footerContent(selectedLanguage).email}
              </a>
              <p className="flex items-start gap-1.5">
                <Place fontSize="small" />{" "}
                {footerContent(selectedLanguage).address}
              </p>
            </div>
          </div>
        </article>

        <div className="copy-write">
          <p className="text-base">
            &copy; {new Date().getFullYear()}{" "}
            {footerContent(selectedLanguage).copyright}
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
