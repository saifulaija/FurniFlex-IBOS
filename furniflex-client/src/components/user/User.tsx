// import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
// import { DomainOption, GenderOption, TQueryParam } from "@/types/global.type";
// import { useState, useEffect } from "react";
// import UserCard from "./UserCard";
// import Loader from "../shared/Loader/Loader";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { Button } from "@/components/ui/button";
// import NoUserFound from "../shared/NoUserFound/NoUserFound";

// const User = () => {
//   const [params, setParams] = useState<TQueryParam[]>([]);
//   const [page, setPage] = useState(1);
//   const [domain, setDomain] = useState<string>("");
//   const [gender, setGender] = useState<string>("");
//   const [availability, setAvailability] = useState<string>("");
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Update params whenever search query or filters change
//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const searchQuery = searchParams.get("q");
//     const newParams: TQueryParam[] = [];

//     if (searchQuery) {
//       newParams.push({ name: "searchTerm", value: searchQuery });
//     }
//     if (domain) {
//       newParams.push({ name: "domain", value: domain });
//     }
//     if (gender) {
//       newParams.push({ name: "gender", value: gender });
//     }
//     if (availability) {
//       newParams.push({ name: "availability", value: availability });
//     }

//     setParams(newParams);
//   }, [location.search, domain, gender, availability]);

//   // Fetch users with the current params
//   const { data, isLoading, isError } = useGetAllUsersQuery([
//     { name: "page", value: page },
//     ...params,
//   ]);

//   const meta = data?.data.meta;

//   // Handle the domain change
//   const handleDomainChange = (value: string) => {
//     setDomain(value);
//     updateURLParams("domain", value);
//   };

//   // Handle the gender change
//   const handleGenderChange = (value: string) => {
//     setGender(value);
//     updateURLParams("gender", value);
//   };

//   // Handle the availability change
//   const handleAvailabilityChange = (value: string) => {
//     setAvailability(value);
//     updateURLParams("availability", value);
//   };

//   // Handle URL parameter updates
//   const updateURLParams = (key: string, value: string) => {
//     const searchParams = new URLSearchParams(location.search);
//     if (value) {
//       searchParams.set(key, value);
//     } else {
//       searchParams.delete(key);
//     }
//     navigate({ search: searchParams.toString() });
//   };

//   // Handle clearing all filters
//   const handleClearFilters = () => {
//     setDomain("");
//     setGender("");
//     setAvailability("");
//     setParams([]);
//     navigate("/");
//   };

//   // Handle page change
//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   // Handle potential errors and loading state
//   if (isLoading) {
//     return <Loader />;
//   }

//   if (isError) {
//     return <div>Failed to load users. Please try again later.</div>;
//   }

//   return (
//     <div className="w-full">
//       <div className="space-y-2 sm:space-y-0 md:flex items-center justify-between mb-4 w-full sm:w-[70%] mx-auto pt-10">
//         <div className="w-full md:w-auto">
//           <Select onValueChange={handleDomainChange} value={domain}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Filter by domain" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Domain</SelectLabel>
//                 {DomainOption.map((domain) => (
//                   <SelectItem key={domain} value={domain}>
//                     {domain}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="w-full md:w-auto">
//           <Select onValueChange={handleGenderChange} value={gender}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Filter by Gender" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Gender</SelectLabel>
//                 {GenderOption.map((gender) => (
//                   <SelectItem key={gender} value={gender}>
//                     {gender}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="w-full md:w-auto">
//           <Select onValueChange={handleAvailabilityChange} value={availability}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Filter by Availability" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Availability</SelectLabel>
//                 <SelectItem value="true">Available</SelectItem>
//                 <SelectItem value="false">Not Available</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>

//         <Button
//           onClick={handleClearFilters}
//           variant="outline"
//           className="w-full sm:w-[200px]"
//         >
//           Clear Filters
//         </Button>
//       </div>

//       <div className="container mx-auto pt-10">
//         {data?.data?.result?.length === 0 ? (
//           <div className="flex justify-center items-center py-20">
//             <NoUserFound />
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {data?.data?.result?.map((user) => (
//               <UserCard key={user._id} user={user} />
//             ))}
//           </div>
//         )}

//         {/* Dynamic Pagination */}
//         {meta && meta.totalPage > 1 && (
//           <Pagination>
//             <PaginationContent>
//               <PaginationPrevious
//                 href="#"
//                 disabled={page === 1}
//                 onClick={() => handlePageChange(page - 1)}
//               />

//               {/* Render page numbers dynamically */}
//               {Array.from({ length: meta.totalPage }, (_, i) => (
//                 <PaginationItem key={i}>
//                   <PaginationLink
//                     href="#"
//                     isActive={page === i + 1}
//                     onClick={() => handlePageChange(i + 1)}
//                   >
//                     {i + 1}
//                   </PaginationLink>
//                 </PaginationItem>
//               ))}

//               <PaginationNext
//                 href="#"
//                 disabled={page === meta.totalPage}
//                 onClick={() => handlePageChange(page + 1)}
//               />
//             </PaginationContent>
//           </Pagination>
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;

import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { DomainOption, GenderOption, TQueryParam } from "@/types/global.type";
import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import Loader from "../shared/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import NoUserFound from "../shared/NoUserFound/NoUserFound";

const User = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [domain, setDomain] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [availability, setAvailability] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("q");
    const newParams: TQueryParam[] = [];

    if (searchQuery) {
      newParams.push({ name: "searchTerm", value: searchQuery });
    }
    if (domain) {
      newParams.push({ name: "domain", value: domain });
    }
    if (gender) {
      newParams.push({ name: "gender", value: gender });
    }
    if (availability) {
      newParams.push({ name: "availability", value: availability });
    }

    setParams(newParams);
  }, [location.search, domain, gender, availability]);

  const { data, isLoading, isError } = useGetAllUsersQuery([
    { name: "page", value: page },
    ...params,
  ]);

  const meta = data?.data?.meta as any;


  const handleDomainChange = (value: string) => {
    setDomain(value);
    updateURLParams("domain", value);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
    updateURLParams("gender", value);
  };

  const handleAvailabilityChange = (value: string) => {
    setAvailability(value);
    updateURLParams("availability", value);
  };

  const updateURLParams = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    navigate({ search: searchParams.toString() });
  };

  const handleClearFilters = () => {
    setDomain("");
    setGender("");
    setAvailability("");
    setParams([]);
    navigate("/");
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (meta?.totalPage || 1)) {
      setPage(newPage);
      updateURLParams("page", newPage.toString());
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Failed to load users. Please try again later.</div>;
  }

  return (
    <div className="w-full">
      {/* Filter Section */}
      <div className="space-y-2 sm:space-y-0 md:flex items-center px-4 sm:px-0 justify-between mb-4 w-full sm:w-[70%] mx-auto pt-10">
        <Select onValueChange={handleDomainChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select Domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Domains</SelectLabel>
              {DomainOption.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={handleGenderChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Genders</SelectLabel>
              {GenderOption.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={handleAvailabilityChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Availability</SelectLabel>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Not Available</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={handleClearFilters}
          variant="outline"
          className="w-full sm:w-[200px]"
        >
          Clear Filters
        </Button>
      </div>

      {/* User List Section */}
      <div className="container mx-auto pt-10">
        {data?.data?.result?.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <NoUserFound />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.data?.result?.map((user:any) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {meta && meta.totalPage > 1 && (
          <Pagination className="flex justify-center mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(page - 1)}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {[...Array(meta.totalPage)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(index + 1)}
                    isActive={page === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(page + 1)}
                  className={
                    page === meta.totalPage
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default User;
