import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const BlogDetail = () => {
  const axiosPublic = useAxiosPublic()
  const {id} = useParams()

    const { data: blogDetail = {}, isLoading } = useQuery({
        queryKey: ["blogDetail", id],
        queryFn: async () => {
          const { data } = await axiosPublic.get(`blogs/${id}`);
          console.log(data);
          return data;
        },
      });


    return (
        <div className="py-20 px-5 container mx-auto ">


       <div className="my-10  border-2 border-dotted  p-5 rounded-xl bg-rose-50 ">
       <h1 className="lg:w-[1000px] mx-auto font-bold lg:text-4xl text-2xl text-black uppercase lg:my-10  my-3  ">{blogDetail.title}........</h1>
            <img className="lg:w-[1000px]  mx-auto lg:h-[800px] h-[500px] rounded-xl" src={blogDetail.thumbnail} alt="" />
            <p className="lg:w-[1000px] font-medium  mx-auto text-xl mt-5  rounded-xl">{blogDetail.content}</p>

       </div>

        </div>
    );
};

export default BlogDetail;