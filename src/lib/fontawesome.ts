import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faBug, faRss } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

// Tell Font Awesome to skip adding CSS automatically since it's being imported above
config.autoAddCss = false;

library.add(faGithub, faEnvelope, faBug, faRss);
