import assets from "@/assets";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const resources = [
    { title: "Master Plan", link: "/blog" },
    { title: "Jobs", link: "/help-center" },
    { title: "Invest", link: "/release-notes" },
    { title: "Pressroom", link: "/status" },
    { title: "Blog", link: "/status" },
    { title: "Contact", link: "/status" },
  ];

  const community = [
    { title: "Unlock my Robot Power", link: "https://twitter.com" },
    { title: "Starlight", link: "https://linkedin.com" },
    { title: "Robot Platform", link: "https://facebook.com" },
    { title: "EEVE Roadmap", link: "https://dribbble.com" },
  
  ];

  const company = [
    { title: "Williow X Community", link: "/about-us" },
    { title: "Developer & Maker Access", link: "/careers" },
    { title: "Special Cases", link: "/legal" },
  ];

  return (
    <footer className="bg-black text-white py-8 mt-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-wrap justify-between">
          {/* Abstract Section */}
          <div className="w-full sm:w-1/5 mb-6">
            <img src={assets.images.footer_logo} width={100} height={100} alt="logo" />
          </div>

          {/* Resources Section */}
          <div className="w-full sm:w-1/5 mb-6">
            <h5 className="text-xl font-bold mb-4">About Us</h5>
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
            <h5 className="text-xl font-bold mb-4">Explore EEVE</h5>
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
            <h5 className="text-xl font-bold mb-4">Community & Support</h5>
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
            
          </div>
        </div>
        <Separator/>
      </div>
    </footer>
  );
};

export default Footer;
