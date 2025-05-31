import {useQuery} from "@tanstack/react-query";
import {getMyStoriesAPI} from "@/app/api/story/story_api";
import {useAuth} from "@/app/store/hooks";

export default function useMyStories() {

    const { token } = useAuth()

    return useQuery({
        queryKey: ['my-stories', token],
        queryFn: () => getMyStoriesAPI(token),
        enabled: !!token,
    })
}