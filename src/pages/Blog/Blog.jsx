import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Blog = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch blogs using React Query
  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/blogs");
      console.log(data);
      return data;
    },
  });

  return (
    <div>
      <section className="bg-white py-20">
        <div className="container px-6 py-10 mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-rose-500 uppercase lg:text-4xl">
              ALL BLOGS about blood donation
            </h1>
            <p className="max-w-7xl font-medium mx-auto mt-4">
            Visitors to this page will find articles that cover a range of topics including the science behind blood donation, the benefits for both donors and recipients, and the detailed processes involved in donating blood. We also feature inspiring personal stories from donors and recipients, highlighting the profound impact that blood donations have on individuals lives.

Our blog also delves into the latest research and advancements in transfusion medicine, providing readers with up-to-date information about innovations and improvements in the field. Tips and advice on how to prepare for donation, as well as post-donation care, are also available to ensure donors have a safe and positive experience.

In addition, we address common myths and misconceptions about blood donation, providing factual and reassuring information to encourage more people to donate. Whether you are a first-time donor or a seasoned veteran, the All Blog page is designed to be an informative and inspiring resource that supports and encourages the lifesaving act of blood donation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3 ">
            {blogs.map((blog) => (
              <div className="border-2 border-black border-dotted  p-10 rounded-lg" key={blog._id}>
                <div className="relative ">
                  <img
                    className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                    src={blog.thumbnail} // Assuming each blog has an `imageUrl` field
                    alt={blog.title}
                  />
                 
                </div>

                <h1 className="mt-6 text-xl font-semibold">{blog.title}</h1>
                <hr className="w-32 my-6 text-blue-500" />
                <p className="text-sm">{blog.content.slice(0,100)}</p>
                <a
                  href={`/blog-detail/${blog._id}`} // Link to the blog post page
                  className="inline-block mt-4 text-red-500 underline hover:text-red-600"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
