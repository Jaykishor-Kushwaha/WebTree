import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Text } from "@mantine/core";

interface SocialIconProps {
  platform: "github" | "linkedin" | "x";
}

const SocialIcon: React.FC<SocialIconProps> = ({ platform }) => {
  switch (platform) {
    case "github":
      return <FaGithub className="icon" />;
    case "linkedin":
      return <FaLinkedin className="icon" />;
    case "x":
      return <FaSquareXTwitter className="icon" />;
    default:
      return null;
  }
};

interface ProfileStats {
  issuesResolved?: number;
  moneyEarned?: number;
  challengesWon?: number;
  contributedRepos?: number;
}

export interface DevCardProps {
  name?: string;
  company?: string;
  role?: string;
  startDate?: string;
  avatarUrl?: string;
  stats?: ProfileStats;
  socialLinks: {
    platform: "github" | "linkedin" | "x";
    url: string;
  }[];
}

interface Name {
  title: string;
  first: string;
  last: string;
}

interface Location {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  phone: string;
  dob: {
    date: string;
    age: number;
  };
  picture: Picture;
}

const DevCard: React.FC = ({

}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        setUser(data.results[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  console.log(user);

  const handleMouseMove = (e: {
    currentTarget: any;
    clientX: number;
    clientY: number;
  }) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    card.style.transform = `perspective(1500px) rotateX(${
      deltaY * 10
    }deg) rotateY(${deltaX * 10}deg)`;
  };

  const handleMouseLeave = (e: { currentTarget: any }) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1500px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      className="card-container card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="glass-overlay"></div>

      <div className="card-content">
        <div className="profile-text">
          <Text size="lg" className="text-cyan-400 profile-header">
            <img
              src={user?.picture.medium}
              alt="avatar"
              className="profile-img"
            />
            <div className="name">
              <div>{user?.name.title}</div>
              <div>{user?.name.first}</div>
              <div>{user?.name.last}</div>
            </div>
          </Text>
         
          <div style={{ marginTop: "1.5rem" }}>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-2 pr-8">♀️ Gender:</td>
                  <td className="text-right">{user?.gender}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">📆 Age:</td>
                  <td className="text-right">{user?.dob.age} Years</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">☎️ Phone Number:</td>
                  <td className="text-right">{user?.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="socialwrapper">
          <div className="social-container link-style">
            {/* Use SocialIcon component */}
            <SocialIcon platform="github" />
            <SocialIcon platform="linkedin" />
            <SocialIcon platform="x" />
          </div>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="link-style"
          >
            <img
              src="https://internshala-uploads.internshala.com/logo/63e478bb5f3871675917499.jpg.webp"
              alt="avatar"
              className="logo"
            />
          </a>
        </div>
      </div>

      <div className="vertical-line"></div>
    </div>
  );
};

export default DevCard;
