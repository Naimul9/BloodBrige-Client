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
        <div>
            hi
{blogDetail.title}


        </div>
    );
};

export default BlogDetail;