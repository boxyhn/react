import { useState, useEffect } from "react";
import { UserInfoForm } from "../components/Form/Index";
import { SmallPost } from "../components/Posts";
import { getUser, UpdateInfo } from "../apis/api";
import { getCookie } from "../utils/cookie";
import { getPosts } from "../apis/api";
import { getTags } from "../apis/api";

const Mypage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });

  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostsAPI();
    const getTagsAPI = async () => {
      const tags = await getTags();
      const tagContents = tags.map((tag) => {
        return tag.content;
      });
      setTags(tagContents);
    };
    getTagsAPI();
  }, []);

  const [postList, setPostList] = useState([]);
  const [tags, setTags] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedIn = getCookie("access_token") ? true : false;
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const myInfo = await getUser();
        console.log(myInfo);
        setFormData({
          email: myInfo.user.email,
          username: myInfo.user.username,
          college: myInfo.college,
          major: myInfo.major,
        });
      };
      getUserAPI();
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className="w-1/2">
          <h1 className="flex justify-center font-bold text-xl">My Info</h1>
          <div>
            <UserInfoForm formData={formData} setFormData={setFormData} />
          </div>
          <h1 className="flex justify-center font-bold text-xl mt-10">
            My Posts
          </h1>
          {console.log(postList)}
          <div className="grid grid-cols-2 px-10 mt-10">
            {postList
              .filter((post) => post.author.username === formData.username)
              .map((post) => (
                <SmallPost key={post.id} post={post} />
              ))}
          </div>
        </div>
      ) : null}
      {/* null page 불가능하게 바꿀것 */}
    </>
  );
};

export default Mypage;
