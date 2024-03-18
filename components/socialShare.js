"use client";
import { FaShare } from "react-icons/fa";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const SocialShare = ({ url, quote }) => {
  return (
    <div className="grid grid-cols-4 gap-x-3 items-center">
      <FaShare className="text-3xl" />
      <FacebookShareButton
        url={url}
        quote={"Check out this amazing product," + quote}
        hashtag="Apneehatti"
        className=""
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        title={"Check out this amazing product, " + quote}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <EmailShareButton
        url={url}
        body={quote}
        subject={"Check out this amazing product"}
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  );
};

export default SocialShare;
