import { requireAuthUser } from "@/apps/api/utils";
import { StorySchema } from "@/apps/front/components";
import { wrapper } from "@/store";

export default function StorySchemaPage() {
    return  <StorySchema/>;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireAuthUser(store, context, () => ({ props: {} }));
});