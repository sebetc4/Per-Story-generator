import { requireAuthUser } from "@/apps/api/utils";
import { ChapterValidation } from "@/apps/front/components";
import { wrapper } from "@/store";

export default function ChapterValidationPage() {
    return <ChapterValidation />;
}


export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireAuthUser(store, context, () => ({ props: {} }));
});