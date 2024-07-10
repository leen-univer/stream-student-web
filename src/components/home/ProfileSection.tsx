import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { profileSectionContent, studentPanel } from "locale";
import Lottie from "react-lottie";
import { LOADER } from "assets/animations";

type ProfileDataType = {
  _id: string;
  image: string;
  fullName: string;
  designation: string;
  description: string;
  profileUrl?: string;
  posts: string;
  rating: string;
  name: string;
  expertiseInSubject: string;
  country: {
    label: string;
  };
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: LOADER,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const ProfileSection = () => {
  const { selectedLanguage } = useAppContext();
  const { data, isValidating } = useSWRAPI("contact/all-experience-tutor");

  if (isValidating) {
    return <Lottie options={defaultOptions} height={200} width={200} />;
  }
  const expertiseData = data?.data?.data?.data;

  return (
    <article className="main-container pb-10 md:pb-20">
      <h1 className="title-styling capitalize text-center lg:text-end pb-12">
        {profileSectionContent(selectedLanguage).expertEducators}
      </h1>
      <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {expertiseData?.slice(0, 4).map((item: ProfileDataType) => (
          <ProfileCard key={item._id} item={item} />
        ))}
      </aside>
    </article>
  );
};
const ProfileCard = ({ item }: { item: ProfileDataType }) => {
  const { selectedLanguage } = useAppContext();

  return (
    <article className="bg-white rounded-[42px] overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <section className="h-36 bg-primary rounded-b-[42px]"></section>
      <section className="pb-4 -mt-20">
        <span className="flex justify-center">
          <img
            className="w-28 h-28 rounded-full object-cover border-4 border-white"
            src={item?.profileUrl || "profile.jpg"}
            alt="profile-image"
          />
        </span>
        <div className="flex flex-col items-center pt-2">
          <h1 className="text-2xl font-bold capitalize">
            {item?.name || studentPanel(selectedLanguage).notgiven}
          </h1>
          <h3 className="font-semibold pb-3 capitalize">
            {item?.expertiseInSubject ||
              studentPanel(selectedLanguage).notgiven}
          </h3>
          <div className="w-4/5 flex flex-col items-center border-t-[1.5px] border-primary">
            <p className="text-center py-3">
              {item?.country?.label || studentPanel(selectedLanguage).notgiven}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default ProfileSection;
