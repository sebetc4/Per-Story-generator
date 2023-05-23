import { requireAuthUser } from "@/apps/api/utils";
import { ChapterModification } from "@/apps/front/components";
import { wrapper } from "@/store";

export default function ChapterValidationPage() {
    return <ChapterModification />;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireAuthUser(store, context, () => ({ props: {} }));
});