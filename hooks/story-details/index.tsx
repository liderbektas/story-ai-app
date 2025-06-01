import {useQuery} from "@tanstack/react-query";
import {getMyStoryDetailsAPI} from "@/app/api/story/story_api";
import {useAuth} from "@/app/store/hooks";

type storyProps = {
    id: string | string[] | undefined;
}

export default function useStoryDetails({id}: storyProps){
    const {token} = useAuth()

    return useQuery({
        queryKey: ["story-id", id],
        queryFn: () => getMyStoryDetailsAPI(id as string, token),
        enabled: !!id && !!token,
    })
}