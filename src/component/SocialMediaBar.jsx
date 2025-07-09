import {
  faFacebookF,
  faGithub,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialMediaBar = () => {
  return (
    <>
      <button type="button" className="btn btn-link btn-floating mx-1">
        <i className="fab fa-facebook-f">
          <FontAwesomeIcon icon={faFacebookF} />
        </i>
      </button>

      <button type="button" className="btn btn-link btn-floating mx-1">
        <FontAwesomeIcon icon={faGoogle} />

        {/* <i className="fab fa-google"></i> */}
      </button>

      <button type="button" className="btn btn-link btn-floating mx-1">
        {/* <i className="fab fa-twitter"></i> */}
        <FontAwesomeIcon icon={faTwitter} />
      </button>

      <button type="button" className="btn btn-link btn-floating mx-1">
        <FontAwesomeIcon icon={faGithub} />

        {/* <i className="fab fa-github"></i> */}
      </button>
    </>
  );
};
export default SocialMediaBar;
