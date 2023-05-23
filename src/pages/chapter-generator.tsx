import { requireAuthUser } from "@/apps/api/utils";
import { ChapterGenerator } from "@/apps/front/components";
import { wrapper } from "@/store";

export default function ChapterGeneratorPage() {
    return <ChapterGenerator />;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireAuthUser(store, context, () => ({ props: {} }));
});