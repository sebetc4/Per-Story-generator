import { requireUnauthUser } from "@/apps/api/utils";
import { SignIn } from "@/apps/front/components";
import { wrapper } from "@/store";

export default function ChapterValidationPage() {
    return <SignIn/>;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireUnauthUser(store, context, () => ({ props: {} }));
});