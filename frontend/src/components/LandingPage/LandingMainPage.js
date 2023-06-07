import React, { useEffect, useState } from "react";
import LandingRecommendedPost from "./LandingRecommendedPost";
import "./css/LandingMainPage.css";
import WhoToFollow from "./WhoToFollow";
import { Link } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "antd";

const LandingMainPage = ({userDetails}) => {
  const [tab, setTab] = useState(0);
  console.log(userDetails);
  const [stories, setStories] = useState();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    async function getStories() {
      await axios
        .get("/api/stories")
        .then((res) => {
          // console.log(res.data.data);
          setLoading(false);
          setStories(res.data.data?.slice(0, 10));
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setLoading(false);
        });
    }
    getStories();
  }, []);

  useEffect(() => {
    async function getUsers() {
      await axios
        .get("/api/user")
        .then((res) => {
          if (res.data.status) {
            let _users = res.data?.data?.filter((data) => data?._id !== userDetails?._id)
            setUsers(_users);
            setUserLoading(false);
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setUserLoading(false);
        });
    }
    getUsers();
  }, []);

  return (
    <div className="landing-main">
      <div className="landing-main-container">
        <div className="landing-main-left">
          <div className="landing-main-tabs">
            <div
              onClick={() => setTab(0)}
              className={`tab ${tab === 0 && "active"}`}
            >
              <span>FOLLOWING</span>
            </div>
            <div
              onClick={() => setTab(1)}
              className={`tab ${tab === 1 && "active"}`}
            >
              <span>RECOMMENDED FOR YOU</span>
            </div>
          </div>
          <div className="landing-write-story">
            <h6>Share your ideas with millions of readers.</h6>
            <Link to="/new-story">
              <button>Write on Medium</button>
            </Link>
          </div>
          {tab === 0 && (
            <>
              {/* <div className="follow"> */}
              {/* <h2>Who to follow</h2> */}
              {users?.map((data) => (
                <WhoToFollow key={data?._id} data={data} />
              ))}

              {/* <WhoToFollow />
              <WhoToFollow />
              <WhoToFollow />
              <WhoToFollow />
              <WhoToFollow /> */}
              {/* </div> */}
            </>
          )}
          {tab === 1 && (
            <div className="landing-recommended-posts">
              {[...Array(10)].map((_, index) => {
                return (
                  <>
                    {loading && (
                      <Skeleton.Button
                        key={index}
                        style={{
                          margin: "10px 0",
                        }}
                        active={true}
                        size={"lage"}
                        shape={"default"}
                        block={true}
                      />
                    )}
                  </>
                );
              })}

              {stories?.map((data) => (
                <LandingRecommendedPost userDetails = {userDetails} key={data?._id} data={data} />
              ))}

              {/* <LandingRecommendedPost />
              <LandingRecommendedPost />
              <LandingRecommendedPost />
              <LandingRecommendedPost />
              <LandingRecommendedPost /> */}
            </div>
          )}
        </div>
        <div className="landing-main-right">
          <div className="recommended-topics">
            <h2>Our story</h2>
            <div className="topic">
              <span>Once upon a time, 
                in a world where cloning was a reality
                , a brilliant scientist named 
                Dr. Morgan embarked on a groundbreaking project. 
                With unwavering determination, 
                she set out to create a perfect 
                clone of herself on the medium platform.
                 After months of tireless effort, 
                 her clone finally came to life. 
                 The clone, possessing Dr. Morgan's intelligence 
                 and creativity, continued her groundbreaking work, 
                 bringing forth a new era of scientific achievements 
                 and inspiring others with its remarkable abilities.</span>
              
            </div>
          </div>
          <div className="follow">
            <h2>Who to follow</h2>
            {users?.map((data) => (
              <WhoToFollow key={data?._id} data={data} />
            ))}
            {[...Array(5)].map((_, idx) => {
              return (
                <>
                  {userLoading && (
                    <Skeleton key={idx} active avatar paragraph={{ rows: 1 }} />
                  )}
                </>
              );
            })}

            
            {/* <WhoToFollow />
            <WhoToFollow />
            <WhoToFollow />
            <WhoToFollow />
            <WhoToFollow />
            <WhoToFollow /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingMainPage;
