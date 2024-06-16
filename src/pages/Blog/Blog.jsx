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
      <section className="bg-white">
        <div className="container px-6 py-10 mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-semibold capitalize lg:text-3xl">
              From the blog
            </h1>
            <p className="max-w-lg mx-auto mt-4">
              Salami mustard spice tea fridge authentic Chinese food dish salt
              tasty liquor. Sweet savory foodtruck pie.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <div key={blog._id}>
                <div className="relative">
                  <img
                    className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                    src={blog.imageUrl} // Assuming each blog has an `imageUrl` field
                    alt={blog.title}
                  />
                  <div className="absolute bottom-0 flex p-3 bg-white">
                    <img
                      className="object-cover object-center w-10 h-10 rounded-full"
                      src={blog.authorImageUrl} // Assuming each blog has an `authorImageUrl` field
                      alt={blog.author}
                    />
                    <div className="mx-4">
                      <h1 className="text-sm">{blog.author}</h1>
                     
                    </div>
                  </div>
                </div>

                <h1 className="mt-6 text-xl font-semibold">{blog.title}</h1>
                <hr className="w-32 my-6 text-blue-500" />
                <p className="text-sm">{blog.content}</p>
                <a
                  href={`/blogs/${blog._id}`} // Link to the blog post page
                  className="inline-block mt-4 text-blue-500 underline hover:text-blue-400"
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
