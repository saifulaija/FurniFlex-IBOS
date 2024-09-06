

import assets from "@/assets";


const Footer = () => {
  const resources = [
    { title: "Blog", link: "/blog" },
    { title: "Help Center", link: "/help-center" },
    { title: "Release Notes", link: "/release-notes" },
    { title: "Status", link: "/status" },
  ];

  const community = [
    { title: "Twitter", link: "https://twitter.com" },
    { title: "LinkedIn", link: "https://linkedin.com" },
    { title: "Facebook", link: "https://facebook.com" },
    { title: "Dribbble", link: "https://dribbble.com" },
    { title: "Podcast", link: "/podcast" },
  ];

  const company = [
    { title: "About Us", link: "/about-us" },
    { title: "Careers", link: "/careers" },
    { title: "Legal", link: "/legal" },
  ];

  return (
    <footer className="bg-primary text-white py-8 mt-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-wrap justify-between">
          {/* Abstract Section */}
          <div className="w-full sm:w-1/5 mb-6">
            <h5 className="text-xl font-bold mb-4">Abstract</h5>
            <p>Branches</p>
          </div>

          {/* Resources Section */}
          <div className="w-full sm:w-1/5 mb-6">
            <h5 className="text-xl font-bold mb-4">Resources</h5>
            <ul>
              {resources.map((resource) => (
                <li key={resource.title}>
                  <a
                    href={resource.link}
                    className="hover:underline"
                    aria-label={resource.title}
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Section */}
          <div className="w-full sm:w-1/5 mb-6">
            <h5 className="text-xl font-bold mb-4">Community</h5>
            <ul>
              {community.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.link}
                    className="hover:underline"
                    aria-label={item.title}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="w-full sm:w-1/5 mb-6">
            <h5 className="text-xl font-bold mb-4">Company</h5>
            <ul>
              {company.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.link}
                    className="hover:underline"
                    aria-label={item.title}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p>Contact Us</p>
              <a href="mailto:info@abstract.com" className="hover:underline">
                info@abstract.com
              </a>
            </div>
          </div>

          {/* Logo and Copyright Section */}
          <div className="w-full sm:w-1/5 mb-6 mt-40">
            <img src={assets.images.logo} width={100} height={100} alt="logo" />
            <p className="text-sm mb-1">Copyright © 2022</p>
            <p className="text-sm mb-1">Abstract Studio Design, Inc.</p>
            <p className="text-sm">All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
